import type { Locale, ToolId, ToolInput, ToolResult } from '../types';
import { t } from '../i18n';
import {
  boundedText,
  checked,
  decodeUtf8,
  fail,
  fromBase64,
  hex,
  integer,
  randomBelow,
  toBase64,
  utf8
} from './common';

const say = (locale: Locale, en: string, zh: string) => t(locale, { en, 'zh-CN': zh });
const supportedImages: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp'
};
function imageMime(bytes: Uint8Array): string | undefined {
  if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => bytes[i] === byte))
    return 'image/png';
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return 'image/jpeg';
  if (bytes.length >= 6 && ['GIF87a', 'GIF89a'].includes(String.fromCharCode(...bytes.slice(0, 6))))
    return 'image/gif';
  if (
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' &&
    String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP'
  )
    return 'image/webp';
}
export function imageBase64Tool(input: ToolInput): ToolResult {
  const source = boundedText(input.input, 2_900_000).trim();
  const match = /^data:([^;,]+);base64,([\s\S]*)$/i.exec(source);
  const encoded = match ? match[2] : source;
  const bytes = fromBase64(encoded);
  if (!bytes.length || bytes.length > 2 * 1024 * 1024)
    fail('Image must be between 1 byte and 2 MiB.', '图片大小必须处于 1 字节至 2 MiB。');
  const mime = imageMime(bytes);
  if (!mime)
    fail(
      'Only PNG, JPEG, GIF and WebP images are supported.',
      '仅支持 PNG、JPEG、GIF 与 WebP 图片。'
    );
  if (match && match[1].toLowerCase() !== mime)
    fail('Declared image type does not match its bytes.', '声明的图片类型与实际字节不一致。');
  const dataUrl = `data:${mime};base64,${toBase64(bytes)}`;
  return {
    text: dataUrl,
    image: {
      dataUrl,
      filename: `cs-toolset-image.${supportedImages[mime]}`,
      mime,
      bytes: bytes.length
    }
  };
}
export function radixTool(input: ToolInput): ToolResult {
  const from = integer(input.from, 2, 36, 'Source base'),
    to = integer(input.to, 2, 36, 'Target base');
  const raw = boundedText(input.input, 4096).trim().replace(/_/g, '');
  const negative = raw.startsWith('-');
  const digits = (negative || raw.startsWith('+') ? raw.slice(1) : raw).toUpperCase();
  if (!digits) fail('Enter an integer.', '请输入整数。');
  let value = 0n;
  for (const character of digits) {
    const digit = parseInt(character, 36);
    if (!/[0-9A-Z]/.test(character) || digit >= from)
      fail(
        `Digit ${character} is invalid in base ${from}.`,
        `字符 ${character} 不属于 ${from} 进制。`
      );
    value = value * BigInt(from) + BigInt(digit);
  }
  if (negative) value = -value;
  return { text: value.toString(to).toUpperCase() };
}
const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const checkDigits = '10X98765432';
export function chinaIdCheckDigit(body: string): string {
  if (!/^\d{17}$/.test(body))
    fail('ID body must contain 17 digits.', '身份证号码本体码必须是 17 位数字。');
  const sum = [...body].reduce((total, digit, i) => total + Number(digit) * weights[i], 0);
  return checkDigits[sum % 11];
}
function validBirth(value: string): boolean {
  if (!/^\d{4}-?\d{2}-?\d{2}$/.test(value)) return false;
  const compact = value.replaceAll('-', '');
  const year = Number(compact.slice(0, 4)),
    month = Number(compact.slice(4, 6)),
    day = Number(compact.slice(6));
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    year >= 1800 &&
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day &&
    date.getTime() <= Date.now()
  );
}
export function chinaIdTool(input: ToolInput, locale: Locale): ToolResult {
  if (input.mode === 'validate') {
    const number = boundedText(input.input, 100).trim().toUpperCase();
    if (!/^[1-9]\d{16}[\dX]$/.test(number))
      fail('Expected an 18-character resident ID number.', '请输入 18 位居民身份证号码。');
    const birth = number.slice(6, 14);
    if (!validBirth(birth)) fail('The encoded birth date is invalid.', '号码中的出生日期无效。');
    if (chinaIdCheckDigit(number.slice(0, 17)) !== number[17])
      fail('Check digit does not match.', '校验位不匹配。');
    const sex =
      Number(number[16]) % 2 === 1
        ? say(locale, 'male (odd sequence)', '男（奇数顺序码）')
        : say(locale, 'female (even sequence)', '女（偶数顺序码）');
    return {
      text: say(
        locale,
        `Format and check digit: valid\nRegion code: ${number.slice(0, 6)}\nBirth date: ${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6)}\nSequence parity: ${sex}\nThis does not prove issuance or identity.`,
        `格式与校验位：有效\n地区代码：${number.slice(0, 6)}\n出生日期：${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6)}\n顺序码性别：${sex}\n这不代表号码已签发或身份真实。`
      )
    };
  }
  const region = input.region.trim(),
    birth = input.birth.trim();
  if (!/^[1-9]\d{5}$/.test(region))
    fail(
      'Region code must be six digits and not start with zero.',
      '地区代码须为非零开头的六位数字。'
    );
  if (!validBirth(birth))
    fail('Enter a real birth date in YYYY-MM-DD format.', '请输入真实存在的 YYYY-MM-DD 日期。');
  const count = integer(input.count, 1, 100, 'Quantity');
  const results = new Set<string>();
  while (results.size < count) {
    const parity =
      input.sex === 'random'
        ? Number(randomBelow(2n))
        : input.sex === 'male'
          ? 1
          : input.sex === 'female'
            ? 0
            : -1;
    if (parity < 0) fail('Unknown sex selection.', '未知的性别选项。');
    const sequence = parity ? 1 + 2 * Number(randomBelow(500n)) : 2 + 2 * Number(randomBelow(499n));
    const body = region + birth.replaceAll('-', '') + String(sequence).padStart(3, '0');
    results.add(body + chinaIdCheckDigit(body));
  }
  return {
    text: [
      say(
        locale,
        'TEST DATA ONLY — format-valid does not mean issued.',
        '仅供测试——格式有效不代表已签发。'
      ),
      ...results
    ].join('\n')
  };
}
function csvRows(source: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [],
    field = '',
    quoted = false,
    closed = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"' && source[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
        closed = true;
      } else field += char;
      continue;
    }
    if (char === '"') {
      if (field || closed) fail('Unexpected quote in CSV.', 'CSV 中的引号位置无效。');
      quoted = true;
      continue;
    }
    if (char === ',') {
      row.push(field);
      field = '';
      closed = false;
      continue;
    }
    if (char === '\r' || char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      closed = false;
      if (char === '\r' && source[i + 1] === '\n') i++;
      continue;
    }
    if (closed) fail('Unexpected text after closing CSV quote.', 'CSV 结束引号后出现多余文本。');
    field += char;
  }
  if (quoted) fail('Unclosed quoted CSV field.', 'CSV 引号字段未闭合。');
  if (field || row.length || closed) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}
export function csvTool(input: ToolInput): ToolResult {
  const source = boundedText(input.input, 200_000).replace(/^\uFEFF/, '');
  if (input.mode === 'toJson') {
    const rows = csvRows(source);
    if (!rows.length) return { text: '[]', structuredLanguage: 'json' };
    const headers = rows.shift()!;
    if (headers.some((header) => !header) || new Set(headers).size !== headers.length)
      fail('CSV headers must be unique and nonempty.', 'CSV 列名必须唯一且不能为空。');
    const objects = rows
      .filter((row) => row.some(Boolean))
      .map((row) => {
        if (row.length !== headers.length)
          fail('CSV row length does not match the header.', 'CSV 数据行与表头列数不一致。');
        return Object.fromEntries(headers.map((header, i) => [header, row[i]]));
      });
    return { text: JSON.stringify(objects, null, 2), structuredLanguage: 'json' };
  }
  if (input.mode === 'toCsv') {
    let value: unknown;
    try {
      value = JSON.parse(source);
    } catch {
      return fail('Invalid JSON input.', 'JSON 输入无效。');
    }
    if (
      !Array.isArray(value) ||
      value.some((item) => !item || typeof item !== 'object' || Array.isArray(item))
    )
      fail('Expected a JSON array of objects.', '需要 JSON 对象数组。');
    if (!value.length) return { text: '' };
    const rows = value as Record<string, unknown>[];
    const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
    const cell = (value: unknown) => {
      const text =
        value === null || value === undefined
          ? ''
          : typeof value === 'object'
            ? JSON.stringify(value)
            : String(value);
      return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
    };
    return {
      text: [
        headers.map(cell).join(','),
        ...rows.map((row) => headers.map((key) => cell(row[key])).join(','))
      ].join('\r\n')
    };
  }
  return fail('Unknown CSV operation.', '未知 CSV 操作。');
}
export function unicodeTool(input: ToolInput, locale: Locale): ToolResult {
  const characters = [...boundedText(input.input, 1000)];
  if (!characters.length) fail('Enter text to inspect.', '请输入要检查的文本。');
  if (characters.length > 100)
    fail('Inspect at most 100 code points at once.', '每次最多检查 100 个码位。');
  const label = say(
    locale,
    'Character | Code point | Decimal | UTF-8 | JS escape',
    '字符 | 码位 | 十进制 | UTF-8 | JS 转义'
  );
  return {
    text: [
      label,
      ...characters.map((char) => {
        const point = char.codePointAt(0)!;
        const visible =
          char === ' '
            ? say(locale, '[space]', '[空格]')
            : char === '\n'
              ? say(locale, '[newline]', '[换行]')
              : char === '\t'
                ? say(locale, '[tab]', '[制表符]')
                : char;
        return `${visible} | U+${point.toString(16).toUpperCase().padStart(4, '0')} | ${point} | ${hex(utf8(char)).toUpperCase().match(/../g)?.join(' ')} | ${point <= 0xffff ? '\\u' + point.toString(16).toUpperCase().padStart(4, '0') : '\\u{' + point.toString(16).toUpperCase() + '}'}`;
      })
    ].join('\n')
  };
}
export function urlInspectTool(input: ToolInput, locale: Locale): ToolResult {
  const source = boundedText(input.input, 4096).trim();
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return fail('Enter an absolute URL including its scheme.', '请输入包含协议的完整网址。');
  }
  const lines = [
    [say(locale, 'Scheme', '协议'), url.protocol],
    [say(locale, 'Origin', '来源'), url.origin],
    [say(locale, 'Hostname', '主机名'), url.hostname],
    [say(locale, 'Port', '端口'), url.port || '—'],
    [say(locale, 'Path', '路径'), url.pathname],
    [say(locale, 'Fragment', '锚点'), url.hash || '—'],
    [say(locale, 'Username', '用户名'), url.username || '—'],
    [
      say(locale, 'Password present', '包含密码'),
      url.password ? say(locale, 'yes', '是') : say(locale, 'no', '否')
    ]
  ];
  return {
    text: [
      ...lines.map(([label, value]) => `${label}: ${value}`),
      '',
      say(locale, 'Query parameters', '查询参数'),
      ...([...url.searchParams].length
        ? [...url.searchParams].map(([key, value]) => `${key} = ${value}`)
        : ['—'])
    ].join('\n')
  };
}
export function textStatsTool(input: ToolInput, locale: Locale): ToolResult {
  const source = boundedText(input.input);
  const segmenter = Intl.Segmenter;
  const graphemes = [...new segmenter(locale, { granularity: 'grapheme' }).segment(source)].length;
  const words = [...new segmenter(locale, { granularity: 'word' }).segment(source)].filter(
    (item) => item.isWordLike
  ).length;
  const lines = source ? source.split(/\r\n|\r|\n/).length : 0;
  const bytes = utf8(source).length;
  const seconds = Math.ceil((words / 200) * 60);
  return {
    text: say(
      locale,
      `Visible characters: ${graphemes}\nUnicode code points: ${[...source].length}\nUTF-16 code units: ${source.length}\nWords: ${words}\nLines: ${lines}\nUTF-8 bytes: ${bytes}\nEstimated reading time: ${seconds} seconds`,
      `可见字符：${graphemes}\nUnicode 码位：${[...source].length}\nUTF-16 码元：${source.length}\n词语：${words}\n行数：${lines}\nUTF-8 字节：${bytes}\n预计阅读时间：${seconds} 秒`
    )
  };
}
export function linesTool(input: ToolInput, locale: Locale): ToolResult {
  let lines = boundedText(input.input).split(/\r\n|\r|\n/);
  if (checked(input, 'removeEmpty')) lines = lines.filter((line) => line.trim());
  if (input.mode === 'unique') {
    const seen = new Set<string>();
    lines = lines.filter((line) => {
      const key = checked(input, 'ignoreCase') ? line.toLocaleLowerCase(locale) : line;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } else if (input.mode === 'sort' || input.mode === 'reverseSort') {
    const collator = new Intl.Collator(locale, {
      sensitivity: checked(input, 'ignoreCase') ? 'base' : 'variant',
      numeric: true
    });
    lines.sort(collator.compare);
    if (input.mode === 'reverseSort') lines.reverse();
  } else if (input.mode === 'reverse') lines.reverse();
  else fail('Unknown line operation.', '未知行处理操作。');
  return { text: lines.join('\n') };
}
export function slugTool(input: ToolInput): ToolResult {
  const source = boundedText(input.input, 10_000)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
  const separator = input.separator === '_' ? '_' : '-';
  const filtered = checked(input, 'unicode')
    ? source.replace(/[^\p{L}\p{N}]+/gu, separator)
    : source.replace(/[^a-z0-9]+/g, separator);
  const result = filtered.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');
  if (!result)
    fail(
      'No slug characters remain; try Unicode mode.',
      '没有可用的路径字符，请尝试启用 Unicode 模式。'
    );
  return { text: result };
}
const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export function base32Tool(input: ToolInput): ToolResult {
  if (input.mode === 'encode') {
    const bytes = utf8(boundedText(input.input));
    let bits = 0,
      value = 0,
      output = '';
    for (const byte of bytes) {
      value = (value << 8) | byte;
      bits += 8;
      while (bits >= 5) {
        bits -= 5;
        output += base32Alphabet[(value >>> bits) & 31];
      }
    }
    if (bits) output += base32Alphabet[(value << (5 - bits)) & 31];
    return {
      text: checked(input, 'padding')
        ? output.padEnd(Math.ceil(output.length / 8) * 8, '=')
        : output
    };
  }
  if (input.mode === 'decode') {
    const raw = boundedText(input.input).trim().toUpperCase().replace(/\s/g, '');
    if (
      !/^[A-Z2-7]*={0,6}$/.test(raw) ||
      raw.length % 8 === 1 ||
      raw.length % 8 === 3 ||
      raw.length % 8 === 6
    )
      fail('Invalid Base32 input.', 'Base32 输入无效。');
    const unpadded = raw.replace(/=+$/, '');
    if (raw.includes('=') && raw.length % 8 !== 0)
      fail('Invalid Base32 padding.', 'Base32 填充无效。');
    let bits = 0,
      value = 0;
    const bytes: number[] = [];
    for (const char of unpadded) {
      value = (value << 5) | base32Alphabet.indexOf(char);
      bits += 5;
      if (bits >= 8) {
        bits -= 8;
        bytes.push((value >>> bits) & 255);
      }
    }
    if (bits && (value & ((1 << bits) - 1)) !== 0)
      fail('Non-canonical Base32 padding bits.', 'Base32 填充位无效。');
    return { text: decodeUtf8(Uint8Array.from(bytes)) };
  }
  return fail('Unknown Base32 operation.', '未知 Base32 操作。');
}
const statuses: Record<number, LocalizedStatus> = {
  200: ['OK', '成功'],
  201: ['Created', '已创建'],
  202: ['Accepted', '已接受'],
  204: ['No Content', '无内容'],
  301: ['Moved Permanently', '永久重定向'],
  302: ['Found', '临时重定向'],
  304: ['Not Modified', '未修改'],
  307: ['Temporary Redirect', '临时重定向'],
  308: ['Permanent Redirect', '永久重定向'],
  400: ['Bad Request', '请求错误'],
  401: ['Unauthorized', '未认证'],
  403: ['Forbidden', '禁止访问'],
  404: ['Not Found', '未找到'],
  405: ['Method Not Allowed', '方法不允许'],
  408: ['Request Timeout', '请求超时'],
  409: ['Conflict', '冲突'],
  410: ['Gone', '资源已移除'],
  413: ['Content Too Large', '内容过大'],
  415: ['Unsupported Media Type', '媒体类型不支持'],
  418: ["I'm a teapot", '我是茶壶'],
  422: ['Unprocessable Content', '内容无法处理'],
  429: ['Too Many Requests', '请求过多'],
  500: ['Internal Server Error', '服务器内部错误'],
  501: ['Not Implemented', '未实现'],
  502: ['Bad Gateway', '网关错误'],
  503: ['Service Unavailable', '服务不可用'],
  504: ['Gateway Timeout', '网关超时']
};
type LocalizedStatus = [string, string];
export function httpStatusTool(input: ToolInput, locale: Locale): ToolResult {
  const code = integer(input.input, 100, 599, 'HTTP status');
  const category = Math.floor(code / 100);
  const names = [
    null,
    say(locale, 'Informational', '信息响应'),
    say(locale, 'Success', '成功'),
    say(locale, 'Redirection', '重定向'),
    say(locale, 'Client error', '客户端错误'),
    say(locale, 'Server error', '服务端错误')
  ];
  const name =
    statuses[code]?.[locale === 'zh-CN' ? 1 : 0] ??
    say(locale, 'Unknown / uncommon status', '未知或不常见状态码');
  return { text: `${code} ${name}\n${say(locale, 'Category', '类别')}: ${names[category]}` };
}
export function xmlTool(input: ToolInput, locale: Locale): ToolResult {
  const source = boundedText(input.input, 200_000).trim();
  if (!source) fail('Enter XML.', '请输入 XML。');
  if (/<!\s*(DOCTYPE|ENTITY)/i.test(source))
    fail('DTD and entity declarations are not supported.', '不支持 DTD 与实体声明。');
  const document = new DOMParser().parseFromString(source, 'application/xml');
  const issue = document.querySelector('parsererror');
  if (issue)
    fail(`Invalid XML: ${issue.textContent?.slice(0, 250) ?? 'parse error'}`, 'XML 格式无效。');
  if (input.mode === 'validate') return { text: say(locale, 'Valid XML', 'XML 格式正确') };
  const serializer = new XMLSerializer();
  function pretty(node: Element, depth: number): string {
    const children = [...node.childNodes];
    const elements = children.filter((child) => child.nodeType === 1) as Element[];
    const meaningfulText = children.some(
      (child) => child.nodeType === 3 && Boolean(child.textContent?.trim())
    );
    const otherContent = children.some((child) => child.nodeType !== 1 && child.nodeType !== 3);
    if (!elements.length || meaningfulText || otherContent)
      return `${'  '.repeat(depth)}${serializer.serializeToString(node)}`;
    const whole = serializer.serializeToString(node);
    const start = whole.slice(0, whole.indexOf('>') + 1);
    return `${'  '.repeat(depth)}${start}\n${elements.map((child) => pretty(child, depth + 1)).join('\n')}\n${'  '.repeat(depth)}</${node.tagName}>`;
  }
  const declaration = /^<\?xml[^>]*\?>/.exec(source)?.[0];
  return {
    text: (declaration ? declaration + '\n' : '') + pretty(document.documentElement, 0),
    structuredLanguage: 'xml'
  };
}
export function runExtra(
  id: Extract<
    ToolId,
    | 'imageBase64'
    | 'radix'
    | 'cnId'
    | 'csv'
    | 'unicode'
    | 'urlInspect'
    | 'textStats'
    | 'lines'
    | 'slug'
    | 'base32'
    | 'httpStatus'
    | 'xml'
  >,
  input: ToolInput,
  locale: Locale
): ToolResult {
  switch (id) {
    case 'imageBase64':
      return imageBase64Tool(input);
    case 'radix':
      return radixTool(input);
    case 'cnId':
      return chinaIdTool(input, locale);
    case 'csv':
      return csvTool(input);
    case 'unicode':
      return unicodeTool(input, locale);
    case 'urlInspect':
      return urlInspectTool(input, locale);
    case 'textStats':
      return textStatsTool(input, locale);
    case 'lines':
      return linesTool(input, locale);
    case 'slug':
      return slugTool(input);
    case 'base32':
      return base32Tool(input);
    case 'httpStatus':
      return httpStatusTool(input, locale);
    case 'xml':
      return xmlTool(input, locale);
  }
}
