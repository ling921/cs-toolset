import { ulid } from 'ulid';
import { customAlphabet } from 'nanoid';
import type { Locale, ToolId, ToolInput, ToolResult } from '../types';
import { checked, fail, integer, pick, randomBelow } from './common';
const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = lower.toUpperCase();
const digits = '0123456789';
const symbols = '!@#$%^&*()-_=+[]{};:,.?/';
const ambiguous = new Set('0O1Il');
function groups(input: ToolInput) {
  const chosen = [
    checked(input, 'lower') ? lower : '',
    checked(input, 'upper') ? upper : '',
    checked(input, 'digits') ? digits : '',
    checked(input, 'symbols') ? symbols : ''
  ]
    .filter(Boolean)
    .map((x) => [...x].filter((c) => !checked(input, 'ambiguous') || !ambiguous.has(c)));
  return chosen.filter((x) => x.length > 0);
}
function ensureCount(input: ToolInput) {
  return integer(input.count, 1, 1000, 'Quantity');
}
const join = (values: string[]): ToolResult => ({ text: values.join('\n') });
function secureString(alphabet: string[], length: number) {
  return Array.from({ length }, () => pick(alphabet)).join('');
}
const wordList =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur'.split(
    ' '
  );
const chineseWords =
  '开发 工具 数据 设计 灵感 效率 代码 浏览器 本地 安全 清晰 简洁 灵活 可靠 体验 构建 测试 方案 功能 用户 项目 内容 页面 交互'.split(
    ' '
  );
const sentence = (locale: Locale) => {
  if (locale === 'zh-CN')
    return (
      Array.from({ length: 7 + Number(randomBelow(8n)) }, () => pick(chineseWords)).join('') + '。'
    );
  const words = Array.from({ length: integer(String(7 + Number(randomBelow(11n))), 7, 17) }, () =>
    pick(wordList)
  );
  return words.join(' ').replace(/^./, (c) => c.toUpperCase()) + '.';
};
export async function generate(
  id: Extract<ToolId, 'string' | 'hex' | 'number' | 'uuid' | 'password' | 'ids' | 'lorem'>,
  input: ToolInput,
  locale: Locale = 'en'
): Promise<ToolResult> {
  const quantity = ensureCount(input);
  if (id === 'string') {
    const length = integer(input.length, 1, 4096, 'Length');
    const alphabet = [
      ...new Set([
        ...groups(input).flat(),
        ...[...input.custom].filter((c) => !checked(input, 'ambiguous') || !ambiguous.has(c))
      ])
    ];
    if (!alphabet.length) fail('Choose at least one character.', '请至少选择一个字符。');
    return join(Array.from({ length: quantity }, () => secureString(alphabet, length)));
  }
  if (id === 'hex') {
    const length = integer(input.length, 1, 4096, 'Length');
    const chars = checked(input, 'uppercase') ? '0123456789ABCDEF' : '0123456789abcdef';
    return join(Array.from({ length: quantity }, () => secureString([...chars], length)));
  }
  if (id === 'uuid') {
    return join(
      Array.from({ length: quantity }, () => {
        let value: string = crypto.randomUUID();
        if (!checked(input, 'hyphens')) value = value.replaceAll('-', '');
        return checked(input, 'uppercase') ? value.toUpperCase() : value;
      })
    );
  }
  if (id === 'password') {
    const length = integer(input.length, 1, 256, 'Length');
    const excluded = new Set([...input.exclude]);
    const selected = groups(input)
      .map((group) => group.filter((c) => !excluded.has(c)))
      .filter((group) => group.length);
    if (!selected.length || selected.length !== groups(input).length)
      fail(
        'Select groups with at least one allowed character each.',
        '每个所选字符类别必须至少保留一个可用字符。'
      );
    if (length < selected.length)
      fail('Length must fit every selected group.', '长度必须足以容纳所有选定字符类别。');
    const alphabet = [...new Set(selected.flat())];
    return join(
      Array.from({ length: quantity }, () => {
        const result = [
          ...selected.map(pick),
          ...Array.from({ length: length - selected.length }, () => pick(alphabet))
        ];
        for (let i = result.length - 1; i > 0; i--) {
          const j = Number(randomBelow(BigInt(i + 1)));
          [result[i], result[j]] = [result[j], result[i]];
        }
        return result.join('');
      })
    );
  }
  if (id === 'number') {
    const isInteger = input.mode === 'integer';
    const precision = isInteger ? 0 : integer(input.precision, 0, 10, 'Precision');
    const factor = 10 ** precision;
    const min = Number(input.min),
      max = Number(input.max);
    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      (!isInteger &&
        (!Number.isSafeInteger(min * factor) || !Number.isSafeInteger(max * factor))) ||
      (isInteger && (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)))
    )
      fail(
        'Bounds must fit within JavaScript safe integers at the selected precision.',
        '上下界按所选精度换算后必须处于 JavaScript 安全整数范围。'
      );
    const scaledMin = min * factor,
      scaledMax = max * factor;
    const low = BigInt(
      Math.ceil(scaledMin) + (Number.isInteger(scaledMin) && !checked(input, 'includeMin') ? 1 : 0)
    );
    const high = BigInt(
      Math.floor(scaledMax) - (Number.isInteger(scaledMax) && !checked(input, 'includeMax') ? 1 : 0)
    );
    if (high < low) fail('No values are available in this range.', '此范围内没有可用数值。');
    return join(
      Array.from({ length: quantity }, () => {
        const n = Number(low + randomBelow(high - low + 1n)) / factor;
        return isInteger ? String(n) : n.toFixed(precision);
      })
    );
  }
  if (id === 'ids') {
    if (input.mode === 'ulid') {
      const prng = () => crypto.getRandomValues(new Uint8Array(1))[0] / 256;
      return join(Array.from({ length: quantity }, () => ulid(Date.now(), prng)));
    }
    const length = integer(input.length, 1, 256, 'Length');
    const alphabet = [...new Set([...input.alphabet])].join('');
    if (alphabet.length < 2 || alphabet.length > 256)
      fail(
        'NanoID alphabet needs 2–256 unique characters.',
        'NanoID 字母表需要 2–256 个不同字符。'
      );
    return join(Array.from({ length: quantity }, () => customAlphabet(alphabet, length)()));
  }
  if (id === 'lorem') {
    const quantity = integer(input.count, 1, 1000, 'Quantity');
    if (input.mode === 'words')
      return {
        text: Array.from({ length: quantity }, () =>
          pick(locale === 'zh-CN' ? chineseWords : wordList)
        ).join(locale === 'zh-CN' ? '' : ' ')
      };
    if (input.mode === 'sentences')
      return {
        text: Array.from({ length: quantity }, () => sentence(locale)).join(
          locale === 'zh-CN' ? '' : ' '
        )
      };
    if (quantity > 150) fail('Limit paragraphs to 150.', '段落数量不能超过 150。');
    return {
      text: Array.from({ length: quantity }, () =>
        Array.from({ length: 4 }, () => sentence(locale)).join(locale === 'zh-CN' ? '' : ' ')
      ).join('\n\n')
    };
  }
  return fail('Unknown generator.', '未知生成器。');
}
