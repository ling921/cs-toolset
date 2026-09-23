import type { Localized, ToolField, ToolId, ToolInput, ToolModeUi } from '../types';

const l = (en: string, zh: string): Localized => ({ en, 'zh-CN': zh });
const field = (
  key: string,
  en: string,
  zh: string,
  type: ToolField['type'],
  value: string,
  extra: Partial<ToolField> = {}
): ToolField => ({ key, label: l(en, zh), type, default: value, ...extra });
const num = (key: string, en: string, zh: string, value: string, min: number, max: number) =>
  field(key, en, zh, 'number', value, { min, max });
const select = (
  key: string,
  en: string,
  zh: string,
  value: string,
  values: [string, string, string][]
) =>
  field(key, en, zh, 'select', value, {
    options: values.map(([value, en, zh]) => ({ value, label: l(en, zh) }))
  });
const check = (key: string, en: string, zh: string, checked = true) =>
  field(key, en, zh, 'checkbox', String(checked));
const input = (value = '') => field('input', 'Input', '输入', 'textarea', value);
const count = () => num('count', 'Quantity', '数量', '1', 1, 1000);
const length = (value = '16', max = 4096) => num('length', 'Length', '长度', value, 1, max);
const charset = () => [
  check('lower', 'Lowercase a–z', '小写 a–z'),
  check('upper', 'Uppercase A–Z', '大写 A–Z'),
  check('digits', 'Digits 0–9', '数字 0–9'),
  check('symbols', 'Symbols', '符号', false)
];
const encoding = () =>
  select('encoding', 'Output encoding', '输出编码', 'hex', [
    ['hex', 'Hex', '十六进制'],
    ['base64', 'Base64', 'Base64']
  ]);
const direction = () =>
  select('mode', 'Operation', '操作', 'encode', [
    ['encode', 'Encode', '编码'],
    ['decode', 'Decode', '解码']
  ]);

const when = (visibleWhen: NonNullable<ToolField['visibleWhen']>) => ({
  visibleWhen
});

export const toolFields: Record<ToolId, ToolField[]> = {
  string: [
    length(),
    count(),
    ...charset(),
    field('custom', 'Additional characters', '追加自定义字符', 'text', ''),
    check(
      'ambiguous',
      'Exclude visually similar characters (0O1Il)',
      '排除易混淆字符（0O1Il）',
      false
    )
  ],
  hex: [length('32'), count(), check('uppercase', 'Uppercase', '大写', false)],
  number: [
    select('mode', 'Number type', '数字类型', 'integer', [
      ['integer', 'Integer', '整数'],
      ['decimal', 'Decimal', '小数']
    ]),
    field('min', 'Minimum', '最小值', 'number', '0', { step: 'any' }),
    field('max', 'Maximum', '最大值', 'number', '100', { step: 'any' }),
    check('includeMin', 'Include minimum', '包含最小值'),
    check('includeMax', 'Include maximum', '包含最大值'),
    {
      ...num('precision', 'Decimal places', '小数位数', '2', 0, 10),
      ...when({ mode: 'decimal' })
    },
    count()
  ],
  uuid: [
    count(),
    check('uppercase', 'Uppercase', '大写', false),
    check('hyphens', 'Include hyphens', '保留连字符')
  ],
  password: [
    length('24', 256),
    count(),
    ...charset(),
    field('exclude', 'Exclude characters', '排除字符', 'text', ''),
    check(
      'ambiguous',
      'Exclude visually similar characters (0O1Il)',
      '排除易混淆字符（0O1Il）',
      true
    )
  ],
  ids: [
    select('mode', 'Identifier type', '标识符类型', 'ulid', [
      ['ulid', 'ULID', 'ULID'],
      ['nanoid', 'NanoID', 'NanoID']
    ]),
    { ...length('21', 256), ...when({ mode: 'nanoid' }) },
    {
      ...field(
        'alphabet',
        'NanoID alphabet',
        'NanoID 字母表',
        'text',
        '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        {
          hint: l(
            'Used only for NanoID; ULIDs always contain 26 characters.',
            '仅用于 NanoID；ULID 固定为 26 个字符。'
          )
        }
      ),
      ...when({ mode: 'nanoid' })
    },
    count()
  ],
  lorem: [
    select('mode', 'Generate', '生成单位', 'paragraphs', [
      ['words', 'Words', '单词'],
      ['sentences', 'Sentences', '句子'],
      ['paragraphs', 'Paragraphs', '段落']
    ]),
    num('count', 'Quantity', '数量', '3', 1, 1000)
  ],
  json: [
    input('{"name":"CS Toolset","features":["private","offline"],"ready":true}'),
    select('mode', 'Operation', '操作', 'pretty', [
      ['pretty', 'Format', '格式化'],
      ['minify', 'Minify', '压缩'],
      ['sort', 'Sort keys recursively', '递归排序键'],
      ['validate', 'Validate', '校验']
    ]),
    {
      ...num('indent', 'Indent spaces', '缩进空格', '2', 1, 8),
      ...when({ mode: ['pretty', 'sort'] })
    }
  ],
  yaml: [
    select('mode', 'Direction', '转换方向', 'toJson', [
      ['toJson', 'YAML → JSON', 'YAML → JSON'],
      ['toYaml', 'JSON → YAML', 'JSON → YAML']
    ]),
    input('name: Ada\nage: 36')
  ],
  base64: [
    direction(),
    input('Hello, 世界 👋'),
    check(
      'urlSafe',
      'Base64URL alphabet (omit padding on encode)',
      'Base64URL 字母表（编码时省略填充）',
      false
    )
  ],
  url: [
    direction(),
    input('Hello 世界 & tools'),
    select('scope', 'Encoding scope', '编码范围', 'component', [
      ['component', 'URI component', 'URI 组件'],
      ['uri', 'Complete URI', '完整 URI']
    ])
  ],
  html: [direction(), input('<div title="Hello">Tom & Jerry</div>')],
  hash: [
    input('Hello, world!'),
    select('mode', 'Operation', '操作', 'hash', [
      ['hash', 'Hash', '哈希'],
      ['hmac', 'HMAC', 'HMAC'],
      ['pbkdf2', 'PBKDF2', 'PBKDF2']
    ]),
    select('algorithm', 'Algorithm', '算法', 'sha256', [
      ['md5', 'MD5 — compatibility only', 'MD5 — 仅兼容用途'],
      ['sha1', 'SHA-1 — compatibility only', 'SHA-1 — 仅兼容用途'],
      ['sha256', 'SHA-256', 'SHA-256'],
      ['sha384', 'SHA-384', 'SHA-384'],
      ['sha512', 'SHA-512', 'SHA-512']
    ]),
    {
      ...field('key', 'HMAC secret key (UTF-8)', 'HMAC 密钥（UTF-8）', 'password', ''),
      ...when({ mode: 'hmac' })
    },
    {
      ...field('salt', 'PBKDF2 salt (UTF-8)', 'PBKDF2 盐（UTF-8）', 'text', 'change-this-salt'),
      ...when({ mode: 'pbkdf2' })
    },
    {
      ...num('iterations', 'PBKDF2 iterations', 'PBKDF2 迭代次数', '600000', 1, 2000000),
      ...when({ mode: 'pbkdf2' })
    },
    {
      ...num('bytes', 'PBKDF2 output bytes', 'PBKDF2 输出字节数', '32', 1, 256),
      ...when({ mode: 'pbkdf2' })
    },
    encoding()
  ],
  timestamp: [
    select('mode', 'Input type', '输入类型', 'seconds', [
      ['seconds', 'Unix seconds', 'Unix 秒'],
      ['milliseconds', 'Unix milliseconds', 'Unix 毫秒'],
      ['date', 'Date / ISO 8601', '日期 / ISO 8601']
    ]),
    field('input', 'Timestamp or date', '时间戳或日期', 'text', '1704067200'),
    {
      ...select('zone', 'Interpret dates without an offset as', '无偏移日期的解析时区', 'utc', [
        ['utc', 'UTC', 'UTC'],
        ['local', 'Browser local time', '浏览器本地时间']
      ]),
      ...when({ mode: 'date' })
    }
  ],
  jwt: [
    select('mode', 'Operation', '操作', 'decode', [
      ['decode', 'Decode / verify', '解码 / 验签'],
      ['encode', 'Sign / encode', '签发 / 编码']
    ]),
    {
      ...input(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxpbmciLCJpYXQiOjE1MTYyMzkwMjJ9.signature'
      ),
      ...when({ mode: 'decode' })
    },
    {
      ...field('header', 'Extra header JSON', '额外 Header JSON', 'textarea', '{"typ":"JWT"}'),
      ...when({ mode: 'encode' })
    },
    {
      ...field(
        'payload',
        'Payload JSON',
        'Payload JSON',
        'textarea',
        '{"sub":"123","name":"Ling"}'
      ),
      ...when({ mode: 'encode' })
    },
    {
      ...select('algorithm', 'Signing algorithm', '签名算法', 'HS256', [
        ['HS256', 'HS256', 'HS256'],
        ['HS384', 'HS384', 'HS384'],
        ['HS512', 'HS512', 'HS512']
      ]),
      ...when({ mode: 'encode' })
    },
    field(
      'secret',
      'HMAC secret (optional for verification)',
      'HMAC 密钥（验签时可选）',
      'password',
      ''
    )
  ],
  color: [
    field('input', 'Color', '颜色', 'text', '#6366f1', {
      hint: l(
        'HEX, rgb(), hsl(), hsv(), or cmyk(). HSV/CMYK components use percentages.',
        '支持 HEX、rgb()、hsl()、hsv()、cmyk()；HSV/CMYK 分量使用百分比。'
      )
    }),
    field('background', 'Contrast background', '对比度背景颜色', 'color', '#ffffff')
  ],
  regex: [
    field(
      'pattern',
      'Regular expression (without / delimiters)',
      '正则表达式（不含 / 分隔符）',
      'text',
      '(?<word>\\w+)'
    ),
    field('flags', 'Flags', '标志', 'text', 'g'),
    input('Hello world 123'),
    field('replacement', 'Replacement pattern', '替换模式', 'text', '[$&]', {
      hint: l(
        'JavaScript replacement syntax supports $&, $1, and $<name>.',
        '支持 JavaScript 替换语法 $&、$1、$<name>。'
      )
    })
  ],
  diff: [
    field('before', 'Original text', '原始文本', 'textarea', 'Hello world\nA developer toolkit.'),
    field(
      'after',
      'Changed text',
      '修改后文本',
      'textarea',
      'Hello Ling\nA private developer toolkit.'
    ),
    select('mode', 'Compare by', '比较粒度', 'lines', [
      ['chars', 'Characters', '字符'],
      ['words', 'Words', '单词'],
      ['lines', 'Lines', '行']
    ]),
    select('language', 'Code language', '代码语言', 'plain', [
      ['plain', 'Plain text', '纯文本'],
      ['javascript', 'JavaScript', 'JavaScript'],
      ['typescript', 'TypeScript', 'TypeScript'],
      ['json', 'JSON', 'JSON'],
      ['yaml', 'YAML', 'YAML'],
      ['xml', 'HTML / XML', 'HTML / XML'],
      ['css', 'CSS', 'CSS'],
      ['sql', 'SQL', 'SQL']
    ])
  ],
  qr: [
    input('https://example.com'),
    num('size', 'Image width (px)', '图像宽度（px）', '320', 128, 2048),
    select('level', 'Error correction', '纠错等级', 'M', [
      ['L', 'L — 7%', 'L — 7%'],
      ['M', 'M — 15%', 'M — 15%'],
      ['Q', 'Q — 25%', 'Q — 25%'],
      ['H', 'H — 30%', 'H — 30%']
    ]),
    field('foreground', 'Foreground', '前景色', 'color', '#111827'),
    field('background', 'Background', '背景色', 'color', '#ffffff')
  ],
  cron: [
    field(
      'input',
      'Cron expression (5 or 6 fields)',
      'Cron 表达式（5 或 6 个字段）',
      'text',
      '*/15 * * * *'
    ),
    select('zone', 'Schedule timezone', '计划时区', 'local', [
      ['local', 'Browser local timezone', '浏览器本地时区'],
      ['utc', 'UTC', 'UTC']
    ]),
    field(
      'start',
      'Start from (ISO 8601, blank for now)',
      '起算时间（ISO 8601，留空使用当前时间）',
      'text',
      ''
    ),
    num('count', 'Upcoming executions', '后续执行次数', '10', 1, 100)
  ],
  case: [
    input('hello world developer tools'),
    select('mode', 'Output case', '转换格式', 'camel', [
      ['camel', 'camelCase', 'camelCase'],
      ['pascal', 'PascalCase', 'PascalCase'],
      ['snake', 'snake_case', 'snake_case'],
      ['kebab', 'kebab-case', 'kebab-case'],
      ['constant', 'CONSTANT_CASE', 'CONSTANT_CASE'],
      ['title', 'Title Case', 'Title Case'],
      ['lower', 'lowercase', '小写'],
      ['upper', 'UPPERCASE', '大写'],
      ['sentence', 'Sentence case', '句首大写']
    ])
  ],
  imageBase64: [
    select('mode', 'Operation', '操作', 'decode', [
      ['encode', 'Image → Base64', '图片 → Base64'],
      ['decode', 'Base64 → image', 'Base64 → 图片']
    ]),
    {
      ...input('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='),
      ...when({ mode: 'decode' })
    }
  ],
  radix: [
    input('FF'),
    num('from', 'Source base', '原始进制', '16', 2, 36),
    num('to', 'Target base', '目标进制', '10', 2, 36)
  ],
  cnId: [
    select('mode', 'Operation', '操作', 'generate', [
      ['generate', 'Generate test numbers', '生成测试号码'],
      ['validate', 'Validate a number', '校验号码']
    ]),
    {
      ...field('input', 'Number to validate', '待校验号码', 'text', '11010519491231002X'),
      ...when({ mode: 'validate' })
    },
    {
      ...field('region', 'Six-digit region code', '六位地区代码', 'text', '110105'),
      ...when({ mode: 'generate' })
    },
    {
      ...field('birth', 'Birth date (YYYY-MM-DD)', '出生日期（YYYY-MM-DD）', 'text', '1990-01-01'),
      ...when({ mode: 'generate' })
    },
    {
      ...select('sex', 'Sequence parity', '顺序码性别', 'random', [
        ['random', 'Random', '随机'],
        ['male', 'Odd / male', '奇数 / 男'],
        ['female', 'Even / female', '偶数 / 女']
      ]),
      ...when({ mode: 'generate' })
    },
    {
      ...num('count', 'Quantity', '数量', '1', 1, 100),
      ...when({ mode: 'generate' })
    }
  ],
  csv: [
    select('mode', 'Direction', '转换方向', 'toJson', [
      ['toJson', 'CSV → JSON', 'CSV → JSON'],
      ['toCsv', 'JSON → CSV', 'JSON → CSV']
    ]),
    input('name,age\nAda,36')
  ],
  unicode: [input('Hello, 世界 👋')],
  urlInspect: [input('https://example.com/path?q=hello&q=world#top')],
  textStats: [input('Hello world!\n你好，世界。')],
  lines: [
    input('pear\napple\npear'),
    select('mode', 'Operation', '操作', 'unique', [
      ['unique', 'Remove duplicates', '去重'],
      ['sort', 'Sort A–Z', '升序排序'],
      ['reverseSort', 'Sort Z–A', '降序排序'],
      ['reverse', 'Reverse lines', '反转行顺序']
    ]),
    check('ignoreCase', 'Ignore case', '忽略大小写'),
    check('removeEmpty', 'Remove empty lines', '移除空行', false)
  ],
  slug: [
    input('Hello, World!'),
    select('separator', 'Separator', '分隔符', '-', [
      ['-', 'Hyphen (-)', '连字符 (-)'],
      ['_', 'Underscore (_)', '下划线 (_)']
    ]),
    check('unicode', 'Keep non-Latin letters', '保留非拉丁文字')
  ],
  base32: [direction(), input('foo'), check('padding', 'Include padding', '包含填充')],
  httpStatus: [
    field('input', 'HTTP status code', 'HTTP 状态码', 'number', '404', {
      min: 100,
      max: 599
    })
  ],
  xml: [
    input('<root><item>Hi</item></root>'),
    select('mode', 'Operation', '操作', 'format', [
      ['format', 'Format XML', '格式化 XML'],
      ['validate', 'Validate XML', '校验 XML']
    ])
  ]
};

const presentation = (
  sourceEn: string,
  sourceZh: string,
  targetEn: string,
  targetZh: string,
  example: string | undefined,
  reverse?: string
): ToolModeUi => ({
  sourceLabel: l(sourceEn, sourceZh),
  targetLabel: l(targetEn, targetZh),
  example,
  reverse
});

/** Direction-specific labels and safe examples. Input is never overwritten once the user edits it. */
export const toolModeUi: Partial<Record<ToolId, Record<string, ToolModeUi>>> = {
  yaml: {
    toJson: presentation(
      'YAML input',
      'YAML 输入',
      'JSON output',
      'JSON 输出',
      'name: Ada\nage: 36',
      'toYaml'
    ),
    toYaml: presentation(
      'JSON input',
      'JSON 输入',
      'YAML output',
      'YAML 输出',
      '{"name":"Ada","age":36}',
      'toJson'
    )
  },
  csv: {
    toJson: presentation(
      'CSV input',
      'CSV 输入',
      'JSON output',
      'JSON 输出',
      'name,age\nAda,36',
      'toCsv'
    ),
    toCsv: presentation(
      'JSON input',
      'JSON 输入',
      'CSV output',
      'CSV 输出',
      '[{"name":"Ada","age":36}]',
      'toJson'
    )
  },
  base64: {
    encode: presentation(
      'Plain text',
      '原始文本',
      'Base64 output',
      'Base64 输出',
      'Hello, 世界 👋',
      'decode'
    ),
    decode: presentation(
      'Base64 input',
      'Base64 输入',
      'Plain-text output',
      '原始文本输出',
      'SGVsbG8sIOS4lueVjCDwn5GL',
      'encode'
    )
  },
  base32: {
    encode: presentation('Plain text', '原始文本', 'Base32 output', 'Base32 输出', 'foo', 'decode'),
    decode: presentation(
      'Base32 input',
      'Base32 输入',
      'Plain-text output',
      '原始文本输出',
      'MZXW6',
      'encode'
    )
  },
  url: {
    encode: presentation(
      'Text or URL input',
      '文本或 URL 输入',
      'Percent-encoded output',
      '百分号编码输出',
      'Hello 世界 & tools',
      'decode'
    ),
    decode: presentation(
      'Percent-encoded input',
      '百分号编码输入',
      'Decoded text',
      '解码文本',
      'Hello%20%E4%B8%96%E7%95%8C%20%26%20tools',
      'encode'
    )
  },
  html: {
    encode: presentation(
      'HTML or text input',
      'HTML 或文本输入',
      'Escaped HTML output',
      'HTML 转义输出',
      '<div title="Hello">Tom & Jerry</div>',
      'decode'
    ),
    decode: presentation(
      'HTML entities input',
      'HTML 实体输入',
      'Decoded HTML/text',
      '解码后的 HTML/文本',
      '&lt;div title=&quot;Hello&quot;&gt;Tom &amp; Jerry&lt;/div&gt;',
      'encode'
    )
  },
  imageBase64: {
    encode: presentation(
      'Image file',
      '图片文件',
      'Base64 data URL',
      'Base64 Data URL',
      undefined,
      'decode'
    ),
    decode: presentation(
      'Base64 data URL',
      'Base64 Data URL',
      'Image preview',
      '图片预览',
      'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
      'encode'
    )
  },
  jwt: {
    decode: presentation('JWT', 'JWT', 'Decoded claims', '解码后的声明', undefined),
    encode: presentation(
      'Header and payload JSON',
      'Header 与载荷 JSON',
      'Signed JWT',
      '签名 JWT',
      undefined
    )
  },
  timestamp: {
    seconds: presentation(
      'Unix seconds',
      'Unix 秒',
      'Date representations',
      '日期表示',
      '1704067200'
    ),
    milliseconds: presentation(
      'Unix milliseconds',
      'Unix 毫秒',
      'Date representations',
      '日期表示',
      '1704067200000'
    ),
    date: presentation(
      'Date / ISO 8601',
      '日期 / ISO 8601',
      'Unix timestamps',
      'Unix 时间戳',
      '2024-01-01T00:00:00Z'
    )
  }
};

export function getDefaults(id: ToolId): ToolInput {
  return Object.fromEntries(toolFields[id].map((field) => [field.key, field.default]));
}
