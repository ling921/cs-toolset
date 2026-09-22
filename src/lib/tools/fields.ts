import type { Localized, ToolField, ToolId, ToolInput } from '../types';

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
    num('precision', 'Decimal places (decimal mode)', '小数位数（小数模式）', '2', 0, 10),
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
    length('21', 256),
    field(
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
    num('indent', 'Indent spaces', '缩进空格', '2', 1, 8)
  ],
  yaml: [
    input('name: CS Toolset\nfeatures:\n  - private\n  - offline'),
    select('mode', 'Direction', '转换方向', 'toJson', [
      ['toJson', 'YAML → JSON', 'YAML → JSON'],
      ['toYaml', 'JSON → YAML', 'JSON → YAML']
    ])
  ],
  base64: [
    input('Hello, 世界 👋'),
    direction(),
    check(
      'urlSafe',
      'Base64URL alphabet (omit padding on encode)',
      'Base64URL 字母表（编码时省略填充）',
      false
    )
  ],
  url: [
    input('Hello 世界 & tools'),
    direction(),
    select('scope', 'Encoding scope', '编码范围', 'component', [
      ['component', 'URI component', 'URI 组件'],
      ['uri', 'Complete URI', '完整 URI']
    ])
  ],
  html: [input('<div title="Hello">Tom & Jerry</div>'), direction()],
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
    field('key', 'HMAC secret key (UTF-8)', 'HMAC 密钥（UTF-8）', 'password', ''),
    field('salt', 'PBKDF2 salt (UTF-8)', 'PBKDF2 盐（UTF-8）', 'text', 'change-this-salt'),
    num('iterations', 'PBKDF2 iterations', 'PBKDF2 迭代次数', '600000', 1, 2000000),
    num('bytes', 'PBKDF2 output bytes', 'PBKDF2 输出字节数', '32', 1, 256),
    encoding()
  ],
  timestamp: [
    field(
      'input',
      'Timestamp or date (leave blank for now)',
      '时间戳或日期（留空使用当前时间）',
      'text',
      ''
    ),
    select('mode', 'Input type', '输入类型', 'seconds', [
      ['seconds', 'Unix seconds', 'Unix 秒'],
      ['milliseconds', 'Unix milliseconds', 'Unix 毫秒'],
      ['date', 'Date / ISO 8601', '日期 / ISO 8601']
    ]),
    select('zone', 'Interpret dates without an offset as', '无偏移日期的解析时区', 'utc', [
      ['utc', 'UTC', 'UTC'],
      ['local', 'Browser local time', '浏览器本地时间']
    ])
  ],
  jwt: [
    select('mode', 'Operation', '操作', 'decode', [
      ['decode', 'Decode / verify', '解码 / 验签'],
      ['encode', 'Sign / encode', '签发 / 编码']
    ]),
    input(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxpbmciLCJpYXQiOjE1MTYyMzkwMjJ9.signature'
    ),
    field(
      'header',
      'Extra header JSON (encode only)',
      '额外 Header JSON（仅编码）',
      'textarea',
      '{"typ":"JWT"}'
    ),
    field(
      'payload',
      'Payload JSON (encode only)',
      'Payload JSON（仅编码）',
      'textarea',
      '{"sub":"123","name":"Ling"}'
    ),
    select('algorithm', 'Signing algorithm (encode only)', '签名算法（仅编码）', 'HS256', [
      ['HS256', 'HS256', 'HS256'],
      ['HS384', 'HS384', 'HS384'],
      ['HS512', 'HS512', 'HS512']
    ]),
    field(
      'secret',
      'HMAC secret (at least 32/48/64 UTF-8 bytes)',
      'HMAC 密钥（至少 32/48/64 UTF-8 字节）',
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
    input('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
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
    field('input', 'Number to validate', '待校验号码', 'text', '11010519491231002X'),
    field('region', 'Six-digit region code', '六位地区代码', 'text', '110105'),
    field('birth', 'Birth date (YYYY-MM-DD)', '出生日期（YYYY-MM-DD）', 'text', '1990-01-01'),
    select('sex', 'Sequence parity', '顺序码性别', 'random', [
      ['random', 'Random', '随机'],
      ['male', 'Odd / male', '奇数 / 男'],
      ['female', 'Even / female', '偶数 / 女']
    ]),
    num('count', 'Quantity', '数量', '1', 1, 100)
  ],
  csv: [
    input('name,age\nAda,36'),
    select('mode', 'Direction', '转换方向', 'toJson', [
      ['toJson', 'CSV → JSON', 'CSV → JSON'],
      ['toCsv', 'JSON → CSV', 'JSON → CSV']
    ])
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
  base32: [input('foo'), direction(), check('padding', 'Include padding', '包含填充')],
  httpStatus: [
    field('input', 'HTTP status code', 'HTTP 状态码', 'number', '404', { min: 100, max: 599 })
  ],
  xml: [
    input('<root><item>Hi</item></root>'),
    select('mode', 'Operation', '操作', 'format', [
      ['format', 'Format XML', '格式化 XML'],
      ['validate', 'Validate XML', '校验 XML']
    ])
  ]
};

export function getDefaults(id: ToolId): ToolInput {
  return Object.fromEntries(toolFields[id].map((field) => [field.key, field.default]));
}
