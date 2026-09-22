import { describe, expect, it } from 'vitest';
import { tools } from '../catalog';
import { getDefaults, runTool } from './index';
import { fromBase64, randomBelow, toolErrorMessage } from './common';
import { searchTools } from '../search';

describe('catalog and tool engines', () => {
  it('marks structured converter outputs with their actual syntax', async () => {
    expect(
      (await runTool('yaml', { ...getDefaults('yaml'), mode: 'toJson' })).structuredLanguage
    ).toBe('json');
    expect(
      (
        await runTool('yaml', {
          ...getDefaults('yaml'),
          input: '{"name":"Ling"}',
          mode: 'toYaml'
        })
      ).structuredLanguage
    ).toBe('yaml');
    expect(
      (await runTool('csv', { ...getDefaults('csv'), mode: 'toJson' })).structuredLanguage
    ).toBe('json');
  });

  it('has 33 unique working tool definitions with tags', () => {
    expect(tools).toHaveLength(33);
    expect(new Set(tools.map((tool) => tool.path)).size).toBe(33);
    for (const tool of tools) {
      expect(getDefaults(tool.id)).toBeTruthy();
      expect(tool.intro.en.length).toBeGreaterThan(30);
      expect(tool.intro['zh-CN'].length).toBeGreaterThan(20);
      expect(tool.tags.length).toBeGreaterThan(0);
    }
  });

  it.each(tools.filter((tool) => tool.id !== 'regex' && tool.id !== 'xml'))(
    '%s produces output with default input',
    async (tool) => {
      const result = await runTool(tool.id, getDefaults(tool.id));
      expect(result.text.length).toBeGreaterThan(0);
      if (tool.id === 'qr') expect(result.media?.svg).toContain('<svg');
    }
  );

  it('respects exclusive integer bounds and decimal precision', async () => {
    const defaults = getDefaults('number');
    const result = await runTool('number', {
      ...defaults,
      min: '0',
      max: '2',
      includeMin: 'false',
      includeMax: 'false',
      count: '25'
    });
    expect(result.text.split('\n')).toEqual(Array(25).fill('1'));
    const decimal = await runTool('number', {
      ...defaults,
      mode: 'decimal',
      min: '0.1',
      max: '0.3',
      precision: '1',
      includeMin: 'false',
      includeMax: 'false'
    });
    expect(decimal.text).toBe('0.2');
  });

  it('guarantees all selected password groups', async () => {
    const result = await runTool('password', {
      ...getDefaults('password'),
      length: '4',
      count: '30',
      symbols: 'true'
    });
    for (const password of result.text.split('\n')) {
      expect(password).toHaveLength(4);
      expect(password).toMatch(/[a-z]/);
      expect(password).toMatch(/[A-Z]/);
      expect(password).toMatch(/[0-9]/);
      expect(
        [...password].some((character) => '!@#$%^&*()-_=+[]{};:,.?/'.includes(character))
      ).toBe(true);
    }
  });

  it('round-trips UTF-8 Base64URL and rejects malformed padding', async () => {
    const original = '你好 👋 / ?';
    const encoded = await runTool('base64', {
      ...getDefaults('base64'),
      input: original,
      urlSafe: 'true'
    });
    const decoded = await runTool('base64', {
      ...getDefaults('base64'),
      input: encoded.text,
      urlSafe: 'true',
      mode: 'decode'
    });
    expect(decoded.text).toBe(original);
    expect(() => fromBase64('YR==')).toThrow();
  });

  it('keeps validation errors in the selected locale instead of joining translations', () => {
    try {
      fromBase64('YR==');
      throw new Error('Expected malformed Base64 to fail.');
    } catch (error) {
      expect(toolErrorMessage(error, 'en')).toBe('Non-canonical Base64 padding bits.');
      expect(toolErrorMessage(error, 'zh-CN')).toBe('Base64 填充位无效。');
      expect(toolErrorMessage(error, 'zh-CN')).not.toContain('/');
    }
  });

  it('never returns a number outside the requested range', () => {
    for (let i = 0; i < 100; i++) expect(randomBelow(3n)).toBeLessThan(3n);
  });

  it('rejects invalid YAML, JWT, Cron and oversized QR input', async () => {
    await expect(
      runTool('yaml', { ...getDefaults('yaml'), input: 'a: [broken' })
    ).rejects.toThrow();
    await expect(runTool('jwt', { input: 'not-a-jwt' })).rejects.toThrow();
    await expect(runTool('cron', { ...getDefaults('cron'), input: '* *' })).rejects.toThrow();
    await expect(
      runTool('qr', { ...getDefaults('qr'), input: 'x'.repeat(4001) })
    ).rejects.toThrow();
  });

  it('marks JWT signatures as unverified without a key', async () => {
    const result = await runTool('jwt', getDefaults('jwt'));
    expect(result.text).toContain('Not verified');
  });

  it('signs and verifies JWTs and rejects tampering', async () => {
    const secret = 'a sufficiently long HMAC secret key for testing';
    const signed = await runTool('jwt', {
      ...getDefaults('jwt'),
      mode: 'encode',
      secret,
      payload: '{"sub":"alice","exp":4102444800}'
    });
    const verified = await runTool(
      'jwt',
      { ...getDefaults('jwt'), input: signed.text, secret },
      'zh-CN'
    );
    expect(verified.text).toContain('签名有效');
    const segments = signed.text.split('.');
    segments[2] = segments[2].replace(/^./, segments[2][0] === 'a' ? 'b' : 'a');
    const tampered = await runTool(
      'jwt',
      { ...getDefaults('jwt'), input: segments.join('.'), secret },
      'zh-CN'
    );
    expect(tampered.text).toContain('签名无效');
    await expect(
      runTool('jwt', { ...getDefaults('jwt'), mode: 'encode', secret: 'short' })
    ).rejects.toThrow();
  });

  it('supports tag filters, exclusions, aliases and combined terms', () => {
    expect(searchTools(tools, 'MD5 tag:hash', 'en').map((tool) => tool.id)).toEqual(['hash']);
    expect(searchTools(tools, 'tag:哈希', 'zh-CN').map((tool) => tool.id)).toContain('hash');
    expect(searchTools(tools, 'tag:hash -tag:security', 'en')).toHaveLength(0);
    expect(searchTools(tools, 'tag:image tag:base64', 'en').map((tool) => tool.id)).toContain(
      'imageBase64'
    );
  });

  it('handles image Base64 and rejects non-image bytes', async () => {
    const image = await runTool('imageBase64', getDefaults('imageBase64'));
    expect(image.image?.mime).toBe('image/gif');
    expect(image.text).toMatch(/^data:image\/gif;base64,/);
    await expect(
      runTool('imageBase64', { ...getDefaults('imageBase64'), input: 'SGVsbG8=' })
    ).rejects.toThrow();
  });

  it('converts large and negative numbers across radices', async () => {
    const input = '123456789012345678901234567890';
    const converted = await runTool('radix', { input, from: '10', to: '36' });
    const back = await runTool('radix', { input: converted.text, from: '36', to: '10' });
    expect(back.text).toBe(input);
    expect((await runTool('radix', { input: '-FF', from: '16', to: '10' })).text).toBe('-255');
    await expect(runTool('radix', { input: '2', from: '2', to: '10' })).rejects.toThrow();
  });

  it('generates format-valid Chinese test IDs and validates checksum', async () => {
    const generated = await runTool('cnId', { ...getDefaults('cnId'), count: '20' }, 'zh-CN');
    const numbers = generated.text.split('\n').slice(1);
    expect(numbers).toHaveLength(20);
    for (const number of numbers) {
      expect(number).toMatch(/^11010519900101\d{3}[\dX]$/);
      expect(
        (
          await runTool(
            'cnId',
            { ...getDefaults('cnId'), mode: 'validate', input: number },
            'zh-CN'
          )
        ).text
      ).toContain('有效');
    }
  });

  it('round-trips CSV escaping and Base32 text', async () => {
    const csv = 'name,note\r\nAda,"line one\nline ""two"""';
    const json = await runTool('csv', { input: csv, mode: 'toJson' });
    expect(json.structuredLanguage).toBe('json');
    expect(JSON.parse(json.text)).toEqual([{ name: 'Ada', note: 'line one\nline "two"' }]);
    const restored = await runTool('csv', { input: json.text, mode: 'toCsv' });
    expect(
      JSON.parse((await runTool('csv', { input: restored.text, mode: 'toJson' })).text)
    ).toEqual(JSON.parse(json.text));
    const encoded = await runTool('base32', { input: '你好 foo', mode: 'encode', padding: 'true' });
    expect(
      (await runTool('base32', { input: encoded.text, mode: 'decode', padding: 'true' })).text
    ).toBe('你好 foo');
  });

  it('localizes generated labels on Chinese pages', async () => {
    expect(
      (await runTool('json', { ...getDefaults('json'), mode: 'validate' }, 'zh-CN')).text
    ).toBe('JSON 格式正确');
    expect((await runTool('textStats', getDefaults('textStats'), 'zh-CN')).text).toContain(
      '可见字符'
    );
    expect((await runTool('lorem', getDefaults('lorem'), 'zh-CN')).text).toMatch(/[\u4e00-\u9fff]/);
  });

  it('builds line-aligned rows for side-by-side diffs without changing the patch text', async () => {
    const result = await runTool('diff', {
      before: 'const limit = 10;\nkeep this;',
      after: 'const limit = 20;\nkeep this;',
      mode: 'chars',
      language: 'javascript'
    });
    expect(result.text).toContain('--- before');
    expect(result.text).toContain('+++ after');
    expect(result.diffRows).toEqual([
      {
        before: { text: 'const limit = 10;', kind: 'removed', line: 1 },
        after: { text: 'const limit = 20;', kind: 'added', line: 1 }
      },
      {
        before: { text: 'keep this;', kind: 'context', line: 2 },
        after: { text: 'keep this;', kind: 'context', line: 2 }
      }
    ]);
  });
});
