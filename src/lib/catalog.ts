import type { Category, Locale, Localized, ToolMeta } from './types';
import { baseToolTags } from './tags';
import { extraTools } from './extra-catalog';
import { locales } from './i18n';
export { locales } from './i18n';

const l = (en: string, zh: string): Localized => ({ en, 'zh-CN': zh });

export const categories: Record<Category, Localized> = {
  generate: l('Generators', '生成工具'),
  convert: l('Converters', '格式与转换'),
  security: l('Security & tokens', '安全与令牌'),
  text: l('Text & code', '文本与代码'),
  other: l('Everyday utilities', '实用工具')
};

const baseTools: Omit<ToolMeta, 'tags'>[] = [
  {
    id: 'string',
    path: 'gen/string',
    category: 'generate',
    icon: 'Shuffle',
    name: l('Random string', '随机字符串'),
    description: l(
      'Generate random strings with selected character groups, a custom alphabet and an option to exclude ambiguous characters.',
      '按字符类别或自定义字符集生成随机字符串，可排除易混淆字符，适合测试数据和临时标识。'
    ),
    intro: l(
      'Create test fixtures, sample identifiers and random text from the alphabet you choose. Each character is selected with browser cryptographic randomness. For credentials that must include every selected character group, use the password generator.',
      '根据所选字符集创建测试样本、临时标识和随机文本。每个字符均使用浏览器的加密安全随机源选择。若密码必须包含每一种所选字符类别，请使用密码生成器。'
    ),
    keywords: ['random', 'string', 'alphabet', '随机', '字符串', '字符集', '测试数据'],
    instructions: {
      en: [
        'Set the length and number of strings.',
        'Select character groups or enter a custom alphabet; enable the ambiguous-character filter when the result will be read or typed.',
        'Generate a fresh batch and copy the result.'
      ],
      'zh-CN': [
        '设置每条字符串的长度和生成数量。',
        '选择字符类别或输入自定义字符集；需要人工阅读或输入时，可排除易混淆字符。',
        '生成新的一批结果，并按需复制。'
      ]
    },
    example: l(
      'A custom alphabet of ABC123 and length 8 produces strings such as B3A21C1A; your result will differ.',
      '自定义字符集 ABC123、长度 8，可生成类似 B3A21C1A 的字符串；每次生成的结果不同。'
    ),
    related: ['password', 'hex', 'ids']
  },
  {
    id: 'hex',
    path: 'gen/hex',
    category: 'generate',
    icon: 'Binary',
    name: l('Random hexadecimal', '随机十六进制'),
    description: l(
      'Create random hexadecimal strings in uppercase or lowercase, with adjustable length and batch size.',
      '生成指定长度的随机十六进制字符串，支持大小写和批量输出，可用于字节样本与测试向量。'
    ),
    intro: l(
      'Hexadecimal represents each four-bit value using one character from 0–9 and a–f. Generate random hex data for parser tests, sample byte sequences or placeholders. Two hex characters represent one byte; these values are random data, not a hash of an input.',
      '十六进制使用 0–9 和 a–f 表示四位二进制数。这个工具适合生成解析器测试数据、字节样本和占位值。两个十六进制字符对应一个字节；输出是随机数据，并非对某段输入计算得到的哈希。'
    ),
    keywords: ['hex', 'hexadecimal', 'bytes', 'random', '十六进制', '随机', '字节'],
    instructions: {
      en: [
        'Enter the number of hexadecimal characters; use an even length for complete bytes.',
        'Choose uppercase or lowercase and the batch size.',
        'Generate and copy the values into your test or configuration.'
      ],
      'zh-CN': [
        '输入十六进制字符数量；表示完整字节时请使用偶数长度。',
        '选择字母大小写和批量生成数量。',
        '生成并复制结果，用于测试或配置。'
      ]
    },
    example: l(
      'Length 8 may yield 0fa3b712, representing the four bytes 0f a3 b7 12.',
      '长度 8 的输出可能是 0fa3b712，表示 0f a3 b7 12 四个字节。'
    ),
    related: ['string', 'hash', 'number']
  },
  {
    id: 'number',
    path: 'gen/number',
    category: 'generate',
    icon: 'Dices',
    name: l('Random number', '随机数字'),
    description: l(
      'Pick random integers or decimal numbers within a chosen range, with endpoint controls, precision and batch generation.',
      '在指定范围内生成随机整数或小数，控制端点是否包含、小数精度和数量，快速准备数值测试样本。'
    ),
    intro: l(
      'Generate numerical samples with a browser cryptographic random source. Integer bounds stay within JavaScript’s safe integer range. Decimal mode selects values at the chosen precision, so its possible results form a finite set rather than an infinitely precise continuum.',
      '使用浏览器加密安全随机源生成数值样本。整数上下界限制在 JavaScript 安全整数范围内。小数模式按指定精度选取数值，因此结果来自有限的可表示集合，并非无限精确的连续数值。'
    ),
    keywords: ['random', 'number', 'integer', 'decimal', '随机数', '整数', '小数', '范围'],
    instructions: {
      en: [
        'Choose integer or decimal mode and enter the lower and upper bounds.',
        'Set whether each endpoint is included; choose precision for decimal values.',
        'Set the quantity and generate. An empty or invalid range is reported before generation.'
      ],
      'zh-CN': [
        '选择整数或小数模式，输入下界和上界。',
        '设置是否包含各端点；小数模式还需选择精度。',
        '设置数量后生成；无效范围或范围内没有可用值时会显示错误。'
      ]
    },
    example: l(
      'Integers from 1 to 6 with both endpoints included model a six-sided die. Decimal precision 2 gives steps of 0.01.',
      '整数范围 1 到 6 且包含两端，可模拟六面骰子；小数精度 2 表示步长为 0.01。'
    ),
    related: ['string', 'hex', 'uuid']
  },
  {
    id: 'uuid',
    path: 'gen/uuid',
    category: 'generate',
    icon: 'Fingerprint',
    name: l('UUID generator', 'UUID 生成器'),
    description: l(
      'Generate cryptographically random UUID v4 identifiers in bulk, with uppercase and hyphen formatting options.',
      '批量生成基于加密安全随机数的 UUID v4，支持大写和连字符格式，用于数据库、请求追踪和测试标识。'
    ),
    intro: l(
      'UUID v4 is a 128-bit identifier with 122 random bits after the version and variant fields are set. It is useful when independent systems need to create identifiers without a central counter. Formatting changes do not change the underlying identifier.',
      'UUID v4 是 128 位标识符，设置版本和变体字段后包含 122 个随机位。它适合需要在不同系统中独立创建标识符、又不希望维护中央计数器的场景。大小写和连字符选项只影响显示格式。'
    ),
    keywords: ['uuid', 'guid', 'v4', 'identifier', '唯一标识', '随机', '主键'],
    instructions: {
      en: [
        'Set how many UUIDs to generate.',
        'Choose lowercase or uppercase and whether to keep the standard hyphens.',
        'Generate a new batch and copy the identifiers.'
      ],
      'zh-CN': [
        '设置需要生成的 UUID 数量。',
        '选择大小写，并决定是否保留标准连字符。',
        '生成新的一批标识符并复制结果。'
      ]
    },
    example: l(
      'Standard form: 550e8400-e29b-41d4-a716-446655440000. The first character of the third group is 4 for UUID v4.',
      '标准格式示例：550e8400-e29b-41d4-a716-446655440000。UUID v4 的第三组首字符为 4。'
    ),
    related: ['ids', 'string', 'hex']
  },
  {
    id: 'password',
    path: 'gen/password',
    category: 'security',
    icon: 'KeyRound',
    name: l('Password generator', '密码生成器'),
    description: l(
      'Generate passwords locally with cryptographic randomness, required character groups, exclusions and batch output.',
      '在本地生成加密安全随机密码，支持字符类别、排除字符和批量生成，并确保所选类别至少各出现一次。'
    ),
    intro: l(
      'Create passwords without sending them to a server. The generator includes at least one character from every selected group and fills the remaining positions using cryptographic randomness. Generated values remain on the page only; copy them into your own password manager when needed.',
      '密码生成全过程在浏览器内完成。生成器确保每一种所选字符类别至少出现一次，其余位置使用加密安全随机数填充。生成值只保留在当前页面，需要保存时请复制到自己的密码管理器。'
    ),
    keywords: ['password', 'secure', 'secret', 'credential', '密码', '口令', '安全', '随机'],
    instructions: {
      en: [
        'Choose a password length and the character groups required by the target service.',
        'Exclude unsupported or ambiguous characters. The length must accommodate all selected groups.',
        'Generate, then explicitly copy the password you want to use.'
      ],
      'zh-CN': [
        '设置密码长度，并选择目标服务要求的字符类别。',
        '排除不支持或易混淆的字符；密码长度必须足以容纳所有所选类别。',
        '生成后，手动复制需要使用的密码。'
      ]
    },
    example: l(
      'A 20-character password can include lowercase, uppercase, digits and symbols while excluding characters a service does not accept.',
      '例如生成 20 位密码，同时包含小写、大写、数字和符号，并排除目标服务不接受的字符。'
    ),
    related: ['string', 'hash', 'uuid']
  },
  {
    id: 'ids',
    path: 'gen/ids',
    category: 'generate',
    icon: 'ScanLine',
    name: l('ULID & NanoID', 'ULID / NanoID'),
    description: l(
      'Create time-sortable ULIDs or compact NanoIDs, including custom NanoID length and alphabet options.',
      '生成可按时间排序的 ULID 或紧凑的 NanoID，支持自定义 NanoID 长度、字母表和批量输出。'
    ),
    intro: l(
      'ULIDs combine a timestamp with randomness in a 26-character identifier, making their standard form lexically sortable by time. NanoIDs use a configurable alphabet and length for compact random identifiers. Shorter or smaller alphabets increase collision probability; neither format is a substitute for database uniqueness checks.',
      'ULID 将时间戳与随机数组合为 26 字符标识符，标准格式可以按字典序进行时间排序。NanoID 使用可配置的长度和字母表生成紧凑随机标识符。缩短长度或减少可用字符会提高碰撞概率；两者都不能代替数据库唯一性约束。'
    ),
    keywords: ['ulid', 'nanoid', 'id', 'sortable', '标识符', '时间排序', '短链接'],
    instructions: {
      en: [
        'Choose ULID for a timestamp-bearing identifier or NanoID for a compact random ID.',
        'For NanoID, set the length and optionally provide a custom alphabet.',
        'Choose the number of IDs and generate a batch.'
      ],
      'zh-CN': [
        '选择包含时间信息的 ULID，或紧凑随机标识 NanoID。',
        '使用 NanoID 时设置长度，并按需填写自定义字母表。',
        '设置数量并批量生成。'
      ]
    },
    example: l(
      'A ULID looks like 01ARZ3NDEKTSV4RRFFQ69G5FAV. A 12-character NanoID with alphabet abc123 uses only those six characters.',
      'ULID 格式示例：01ARZ3NDEKTSV4RRFFQ69G5FAV。使用 abc123 字母表生成的 12 位 NanoID 只会包含这六个字符。'
    ),
    related: ['uuid', 'string', 'timestamp']
  },
  {
    id: 'lorem',
    path: 'gen/lorem',
    category: 'generate',
    icon: 'AlignLeft',
    name: l('Lorem Ipsum', '占位文本生成器'),
    description: l(
      'Generate Lorem Ipsum placeholder text by word, sentence or paragraph for layout and typography testing.',
      '按单词、句子或段落生成 Lorem Ipsum 占位文本，方便测试页面布局、字体排版与内容长度。'
    ),
    intro: l(
      'Placeholder copy helps reveal line lengths, spacing and overflow before final content is available. Choose words for compact controls, sentences for cards or paragraphs for long-form layouts. Replace placeholder text before publishing content intended for readers or search engines.',
      '在正式文案尚未完成时，占位文本可帮助检查行长、间距和溢出情况。单词适合紧凑控件，句子适合卡片，段落适合长文排版。发布面向读者或搜索引擎的正式内容前，应替换占位文案。'
    ),
    keywords: ['lorem', 'ipsum', 'placeholder', 'paragraph', '占位', '文本', '排版', '段落'],
    instructions: {
      en: [
        'Choose words, sentences or paragraphs as the output unit.',
        'Enter the number of units to generate.',
        'Copy the text into your prototype and test its wrapping at multiple widths.'
      ],
      'zh-CN': [
        '选择按单词、句子或段落生成。',
        '输入需要的数量。',
        '将结果复制到原型中，检查不同宽度下的换行效果。'
      ]
    },
    example: l(
      'Use three paragraphs to check an article layout, or twelve words to stress-test a card description.',
      '例如生成 3 个段落检查文章布局，或生成 12 个单词测试卡片简介的长度。'
    ),
    related: ['case', 'diff', 'string']
  },
  {
    id: 'json',
    path: 'format/json',
    category: 'text',
    icon: 'Braces',
    name: l('JSON formatter', 'JSON 格式化'),
    description: l(
      'Validate, pretty-print or minify JSON, optionally sort object keys and locate syntax errors in pasted data.',
      '校验、格式化和压缩 JSON，可递归排序对象键，定位语法错误，便于检查接口响应和配置数据。'
    ),
    intro: l(
      'Turn compact API responses into readable JSON or remove unnecessary whitespace before sharing. Key sorting makes object-heavy data easier to compare, while array order stays meaningful and is preserved. Standard JSON does not support comments, trailing commas, undefined or non-finite numbers.',
      '将紧凑的接口响应整理为可读 JSON，或在分享前移除多余空白。对象键排序可方便比较数据，具有语义的数组顺序会保持不变。标准 JSON 不支持注释、尾随逗号、undefined 或非有限数值。'
    ),
    keywords: ['json', 'format', 'pretty', 'minify', 'validate', '格式化', '压缩', '校验', '排序'],
    instructions: {
      en: [
        'Paste a complete JSON object, array or scalar value.',
        'Choose formatted or compact output, indentation and optional key sorting.',
        'Run the formatter. If parsing fails, use the reported error location to repair the input.'
      ],
      'zh-CN': [
        '粘贴完整的 JSON 对象、数组或标量值。',
        '选择格式化或压缩、缩进，以及是否排序对象键。',
        '执行格式化；解析失败时，根据错误位置修正输入。'
      ]
    },
    example: l(
      'Input {"b":2,"a":1} becomes {"a":1,"b":2} when compact output and key sorting are selected.',
      '输入 {"b":2,"a":1}，选择压缩输出并排序键后得到 {"a":1,"b":2}。'
    ),
    related: ['yaml', 'diff', 'jwt']
  },
  {
    id: 'yaml',
    path: 'convert/yaml',
    category: 'convert',
    icon: 'FileCode2',
    name: l('YAML ↔ JSON', 'YAML ↔ JSON'),
    description: l(
      'Convert YAML configuration to JSON or JSON to readable YAML using safe parsing without executable custom tags.',
      '在 YAML 配置和 JSON 数据之间双向转换，采用安全解析，不执行自定义标签或代码。'
    ),
    intro: l(
      'Move structured data between JSON APIs and YAML-based configuration files. The converter handles data rather than source formatting, so comments and original spacing do not survive a round trip. YAML values without a JSON representation may be rejected instead of silently inventing a conversion.',
      '在 JSON 接口数据与 YAML 配置文件之间转换结构化内容。转换针对数据而非源码格式，因此注释和原有空白不会在往返转换后保留。无法用 JSON 表示的 YAML 值可能被拒绝，避免悄悄改变含义。'
    ),
    keywords: ['yaml', 'yml', 'json', 'config', '配置', '转换', '格式'],
    instructions: {
      en: [
        'Choose YAML to JSON or JSON to YAML.',
        'Paste one complete data document and check its nesting.',
        'Convert, inspect the result and copy it to your destination.'
      ],
      'zh-CN': [
        '选择 YAML 转 JSON 或 JSON 转 YAML。',
        '粘贴一份完整的数据文档，并检查嵌套关系。',
        '转换后检查结果，再复制到目标位置。'
      ]
    },
    example: l(
      'YAML name: Ling with a second line enabled: true converts to {"name":"Ling","enabled":true}.',
      'YAML 的 name: Ling 与下一行 enabled: true，可转换为 {"name":"Ling","enabled":true}。'
    ),
    related: ['json', 'diff', 'case']
  },
  {
    id: 'base64',
    path: 'encode/base64',
    category: 'convert',
    icon: 'CodeXml',
    name: l('Base64 / Base64URL', 'Base64 / Base64URL'),
    description: l(
      'Encode Unicode text as Base64 or decode it back to UTF-8, with a URL-safe alphabet for tokens and query values.',
      '将 Unicode 文本进行 Base64 编解码，支持 UTF-8 中文和 Base64URL，适合令牌、查询参数与数据交换。'
    ),
    intro: l(
      'Base64 represents binary bytes using printable characters; this tool converts text through UTF-8. Base64URL replaces + and / with - and _ for URL-friendly values. Encoding is reversible and provides no secrecy, so a Base64 value should never be treated as an encrypted secret.',
      'Base64 使用可打印字符表示二进制字节，本工具通过 UTF-8 处理文本。Base64URL 将 + 和 / 替换为 - 和 _，便于在 URL 中使用。编码可以直接还原，不提供保密性，因此不能将 Base64 值视为加密后的秘密。'
    ),
    keywords: ['base64', 'base64url', 'utf8', 'unicode', '编码', '解码', '中文'],
    instructions: {
      en: [
        'Choose encode or decode and standard Base64 or Base64URL.',
        'Paste text to encode, or an encoded UTF-8 value to decode.',
        'Run the conversion and inspect any malformed-input error.'
      ],
      'zh-CN': [
        '选择编码或解码，以及标准 Base64 或 Base64URL。',
        '粘贴待编码文本，或待解码的 UTF-8 编码值。',
        '执行转换；格式不正确时查看错误提示。'
      ]
    },
    example: l(
      'Hello encodes to SGVsbG8=. The Chinese text 你好 encodes to 5L2g5aW9.',
      'Hello 编码为 SGVsbG8=；中文“你好”编码为 5L2g5aW9。'
    ),
    related: ['url', 'jwt', 'hex']
  },
  {
    id: 'url',
    path: 'encode/url',
    category: 'convert',
    icon: 'Link',
    name: l('URL encoder', 'URL 编解码'),
    description: l(
      'Percent-encode or decode a complete URI or a single URL component, including Unicode and reserved characters.',
      '对完整 URI 或单个 URL 组件进行百分号编解码，正确处理 Unicode 与保留字符，检查查询参数和链接。'
    ),
    intro: l(
      'A full URI and a query parameter need different escaping rules. URI mode preserves structural separators such as : / ? and &, while component mode escapes characters that could change URL structure. Decoding malformed percent sequences reports an error rather than guessing the intended text.',
      '完整 URI 与单个查询参数需要不同的转义规则。URI 模式保留 : / ? 和 & 等结构分隔符，组件模式则会转义可能改变 URL 结构的字符。格式错误的百分号序列会显示解码错误，不会猜测原始文本。'
    ),
    keywords: ['url', 'uri', 'percent', 'encodeURIComponent', '编码', '解码', '参数', '链接'],
    instructions: {
      en: [
        'Select component mode for a single parameter value or URI mode for a complete address.',
        'Choose encode or decode and paste the input.',
        'Convert and copy the result; encode each parameter independently when constructing a query string.'
      ],
      'zh-CN': [
        '单个参数值选择组件模式，完整地址选择 URI 模式。',
        '选择编码或解码，并粘贴输入。',
        '转换并复制结果；构建查询字符串时，请分别编码每一个参数值。'
      ]
    },
    example: l(
      'In component mode, a&b=c becomes a%26b%3Dc, so the ampersand remains part of the value.',
      '组件模式下，a&b=c 变为 a%26b%3Dc，使 & 仍然属于参数值的一部分。'
    ),
    related: ['base64', 'html', 'qr']
  },
  {
    id: 'html',
    path: 'encode/html',
    category: 'convert',
    icon: 'Code',
    name: l('HTML entities', 'HTML 实体转换'),
    description: l(
      'Escape text as HTML entities or decode entity references, with decoded markup displayed safely as plain text.',
      '将文本转义为 HTML 实体或解码实体引用，解码后的标记只以纯文本显示，便于检查模板与转义结果。'
    ),
    intro: l(
      'Entity references let characters such as <, > and & appear as text in HTML. Use this tool to inspect escaped snippets and recover readable text. The result is never rendered as markup here; escaping rules in JavaScript, CSS and URL contexts are different from HTML text escaping.',
      '实体引用可让 <、> 和 & 等字符在 HTML 中作为文本出现。这个工具用于检查已转义片段或还原可读文本。结果不会作为 HTML 标记渲染；JavaScript、CSS 和 URL 上下文的转义规则与 HTML 文本不同。'
    ),
    keywords: ['html', 'entity', 'escape', 'unescape', '实体', '转义', '解码', '标签'],
    instructions: {
      en: [
        'Choose encode to escape text or decode to read entity references.',
        'Paste the text or snippet.',
        'Run the conversion and copy the plain-text result into the appropriate context.'
      ],
      'zh-CN': [
        '选择编码以转义文本，或选择解码以还原实体引用。',
        '粘贴文本或片段。',
        '执行转换，并将纯文本结果复制到适合的上下文。'
      ]
    },
    example: l(
      '<div>Hello & goodbye</div> can be represented as &lt;div&gt;Hello &amp; goodbye&lt;/div&gt;.',
      '<div>Hello & goodbye</div> 可表示为 &lt;div&gt;Hello &amp; goodbye&lt;/div&gt;。'
    ),
    related: ['url', 'base64', 'diff']
  },
  {
    id: 'hash',
    path: 'security/hash',
    category: 'security',
    icon: 'ShieldCheck',
    name: l('Hash, HMAC & PBKDF2', '哈希 / HMAC / PBKDF2'),
    description: l(
      'Calculate MD5 and SHA digests, keyed HMACs or PBKDF2-derived bytes locally, with hexadecimal or Base64 output.',
      '本地计算 MD5、SHA 摘要、HMAC 和 PBKDF2 派生字节，支持十六进制或 Base64 输出与参数设置。'
    ),
    intro: l(
      'A hash maps input bytes to a fixed-size digest; HMAC adds a shared secret to authenticate a message; PBKDF2 repeatedly derives bytes from a password and salt. These operations serve different purposes. MD5 and SHA-1 are included for legacy compatibility and must not be used where collision resistance is required.',
      '哈希把输入字节映射为固定长度摘要；HMAC 使用共享密钥校验消息；PBKDF2 通过密码、盐和迭代派生字节。这些操作用途不同。MD5 和 SHA-1 仅用于旧系统兼容，不适用于需要抗碰撞能力的场景。'
    ),
    keywords: ['hash', 'md5', 'sha', 'sha256', 'hmac', 'pbkdf2', '摘要', '哈希', '密钥', '盐'],
    instructions: {
      en: [
        'Choose hash, HMAC or PBKDF2 and the available digest algorithm.',
        'Enter the UTF-8 text and, when needed, a key or salt, iteration count and output length.',
        'Choose hexadecimal or Base64 output, calculate and compare the result byte-for-byte with your expected value.'
      ],
      'zh-CN': [
        '选择哈希、HMAC 或 PBKDF2，以及可用的摘要算法。',
        '输入 UTF-8 文本，并按需设置密钥或盐、迭代次数和输出长度。',
        '选择十六进制或 Base64 输出，计算后与期望值逐字节比较。'
      ]
    },
    example: l(
      'SHA-256 of abc is ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad.',
      'abc 的 SHA-256 为 ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad。'
    ),
    related: ['base64', 'password', 'jwt']
  },
  {
    id: 'timestamp',
    path: 'convert/timestamp',
    category: 'convert',
    icon: 'Clock3',
    name: l('Unix timestamp', 'Unix 时间戳'),
    description: l(
      'Convert Unix seconds or milliseconds to ISO 8601, UTC and local time, or turn a date back into a timestamp.',
      '将秒或毫秒 Unix 时间戳转换为 ISO 8601、UTC 和本地时间，也可将日期转换回时间戳。'
    ),
    intro: l(
      'Unix time counts elapsed time from 1970-01-01T00:00:00Z. APIs commonly use seconds while JavaScript dates use milliseconds. A timestamp identifies an instant; UTC and your browser’s local timezone are different representations of that same instant.',
      'Unix 时间从 1970-01-01T00:00:00Z 起计时。接口通常使用秒，而 JavaScript 日期使用毫秒。时间戳标识同一瞬间，UTC 与浏览器所在时区只是对这一瞬间的不同表示。'
    ),
    keywords: ['unix', 'timestamp', 'epoch', 'iso', 'utc', '时间戳', '日期', '毫秒', '时区'],
    instructions: {
      en: [
        'Choose timestamp-to-date or date-to-timestamp.',
        'For numeric input, explicitly select seconds or milliseconds. For dates, include a timezone offset when the instant must be unambiguous.',
        'Convert and compare the ISO, UTC and local representations.'
      ],
      'zh-CN': [
        '选择时间戳转日期或日期转时间戳。',
        '数字输入需明确选择秒或毫秒；日期需要确定唯一时刻时，请包含时区偏移。',
        '执行转换，并比较 ISO、UTC 和本地时间结果。'
      ]
    },
    example: l(
      '1704067200 seconds equals 2024-01-01T00:00:00.000Z; the millisecond form is 1704067200000.',
      '1704067200 秒对应 2024-01-01T00:00:00.000Z；毫秒形式为 1704067200000。'
    ),
    related: ['cron', 'ids', 'jwt']
  },
  {
    id: 'jwt',
    path: 'security/jwt',
    category: 'security',
    icon: 'ScanText',
    name: l('JWT encoder & decoder', 'JWT 编码与解码'),
    description: l(
      'Decode JWT claims, sign HS256/384/512 tokens, and verify HMAC signatures locally.',
      '本地解码 JWT 声明、签发 HS256/384/512 令牌并校验 HMAC 签名。'
    ),
    intro: l(
      'Decode header and payload without a key, or supply a secret to verify HS256/384/512 signatures. You can also sign a JSON payload with a sufficiently strong key. Signature validity alone does not establish issuer trust, audience or authorization.',
      '无需密钥即可解码 Header 与 Payload；提供密钥后可校验 HS256/384/512 签名，也可使用足够强的密钥签发 JSON 载荷。签名有效仍不代表签发者可信、受众正确或具有授权。'
    ),
    keywords: [
      'jwt',
      'token',
      'claims',
      'payload',
      'header',
      'hmac',
      'hs256',
      '令牌',
      '解码',
      '签名',
      '过期'
    ],
    instructions: {
      en: [
        'Choose decode/verify or sign/encode.',
        'For signing, enter header and payload JSON plus a strong secret. For verification, paste a compact JWT and provide its secret.',
        'Review signature and time claims; your application must still validate issuer, audience and authorization.'
      ],
      'zh-CN': [
        '选择解码/验签或签发/编码。',
        '签发时输入 Header、Payload JSON 与强密钥；验签时粘贴 JWT 并提供其密钥。',
        '检查签名与时间声明；应用仍须核对签发者、受众及权限。'
      ]
    },
    example: l(
      'A payload containing {"exp":1704067200} declares an expiry of 2024-01-01T00:00:00Z, regardless of whether the signature is valid.',
      'Payload 中的 {"exp":1704067200} 声明过期时间为 2024-01-01T00:00:00Z，但这并不说明签名有效。'
    ),
    related: ['base64', 'json', 'timestamp']
  },
  {
    id: 'color',
    path: 'convert/color',
    category: 'convert',
    icon: 'Palette',
    name: l('Color converter', '颜色转换与对比度'),
    description: l(
      'Convert HEX, RGB, HSL, HSV and CMYK colors, preview the result and compare text contrast against a background.',
      '转换 HEX、RGB、HSL、HSV 与 CMYK 颜色，实时预览色值，并检查文字与背景的对比度。'
    ),
    intro: l(
      'Translate color values between developer-friendly and design-oriented formats. HEX and RGB target screen color; HSL and HSV describe hue-based adjustments. CMYK here is a mathematical approximation without an ICC print profile, so it is not a press-proofing conversion. Contrast helps assess readable text on a chosen background.',
      '在开发常用色值和设计色彩表示之间转换。HEX 与 RGB 面向屏幕颜色，HSL 与 HSV 便于按色相调整。这里的 CMYK 是不使用 ICC 印刷配置的数学近似，不适合作为印刷打样依据。对比度可辅助检查文字在所选背景上的可读性。'
    ),
    keywords: ['color', 'hex', 'rgb', 'hsl', 'hsv', 'cmyk', 'contrast', '颜色', '色值', '对比度'],
    instructions: {
      en: [
        'Choose the input format and enter the color components.',
        'Set alpha where supported and a background color for contrast comparison.',
        'Convert, inspect the preview and copy the representation you need.'
      ],
      'zh-CN': [
        '选择输入格式并填写颜色分量。',
        '在支持时设置透明度，并选择用于对比度计算的背景色。',
        '执行转换，查看预览并复制需要的色值格式。'
      ]
    },
    example: l(
      'Pure red is #FF0000, rgb(255, 0, 0), hsl(0, 100%, 50%) and hsv(0, 100%, 100%).',
      '纯红色可表示为 #FF0000、rgb(255, 0, 0)、hsl(0, 100%, 50%) 和 hsv(0, 100%, 100%)。'
    ),
    related: ['qr', 'hex', 'number']
  },
  {
    id: 'regex',
    path: 'test/regex',
    category: 'text',
    icon: 'Regex',
    name: l('Regex tester', '正则表达式测试'),
    description: l(
      'Test JavaScript regular expressions, inspect matches and capture groups, and preview replacement text with timeout protection.',
      '测试 JavaScript 正则表达式，查看匹配、捕获组和替换预览，通过独立 Worker 与超时保护避免卡住页面。'
    ),
    intro: l(
      'Explore the JavaScript RegExp dialect against sample text before putting a pattern into application code. Flags control global matching, case sensitivity, multiline anchors and other behavior. Patterns run in a separate worker with a time limit because backtracking-heavy expressions can otherwise block interaction.',
      '在将表达式用于应用代码前，先用样本文本检查 JavaScript RegExp 方言。Flags 控制全局匹配、大小写、多行锚点等行为。表达式在带时间限制的独立 Worker 中运行，避免大量回溯影响页面操作。'
    ),
    keywords: [
      'regex',
      'regexp',
      'regular expression',
      'capture',
      'replace',
      '正则',
      '匹配',
      '捕获组',
      '替换'
    ],
    instructions: {
      en: [
        'Enter the pattern without surrounding slashes and select JavaScript flags.',
        'Paste sample text and optionally a replacement expression.',
        'Run the test to inspect matches, captured groups and replacement output; simplify the pattern if it exceeds the time limit.'
      ],
      'zh-CN': [
        '输入不带两侧斜杠的表达式，并填写 JavaScript flags。',
        '粘贴样本文本，并按需填写替换表达式。',
        '运行后检查匹配、捕获组和替换结果；若超时，请简化表达式。'
      ]
    },
    example: l(
      'Pattern (\\w+)@(\\w+\\.\\w+) with flag g captures the user and domain in hello@example.com.',
      '表达式 (\\w+)@(\\w+\\.\\w+) 配合 g 标志，可捕获 hello@example.com 中的用户名和域名。'
    ),
    related: ['diff', 'case', 'json']
  },
  {
    id: 'diff',
    path: 'text/diff',
    category: 'text',
    icon: 'GitCompareArrows',
    name: l('Text diff', '文本差异比较'),
    description: l(
      'Compare two texts by character, word or line, highlight additions and removals, and copy a unified diff.',
      '按字符、单词或行比较两段文本，高亮新增与删除内容，并复制统一差异格式，适合检查配置和文案变更。'
    ),
    intro: l(
      'Review edits without uploading either version. Character mode reveals small punctuation changes, word mode suits prose, and line mode is useful for code or configuration. A unified diff provides a portable textual summary, while visual highlighting makes additions and removals easier to scan.',
      '无需上传任一版本即可检查修改。字符模式适合标点等细微变化，单词模式适合英文文案，行模式适合代码和配置。统一差异格式便于以纯文本分享，高亮视图则便于快速识别新增和删除。'
    ),
    keywords: ['diff', 'compare', 'patch', 'text', '差异', '比较', '文本', '修改'],
    instructions: {
      en: [
        'Paste the original text and the modified text into their respective fields.',
        'Choose character, word or line comparison.',
        'Compare the highlighted changes and copy the unified diff when you need a text-only result.'
      ],
      'zh-CN': [
        '分别在输入框中粘贴原始文本和修改后的文本。',
        '选择按字符、单词或行比较。',
        '检查高亮变化，需要纯文本结果时复制统一差异。'
      ]
    },
    example: l(
      'Comparing const limit = 10; with const limit = 20; in character mode highlights the changed digit.',
      '以字符模式比较 const limit = 10; 与 const limit = 20;，可突出显示变化的数字。'
    ),
    related: ['json', 'yaml', 'case']
  },
  {
    id: 'qr',
    path: 'gen/qr',
    category: 'other',
    icon: 'QrCode',
    name: l('QR code generator', '二维码生成器'),
    description: l(
      'Turn text or a URL into a downloadable QR code with size, error correction and foreground/background color controls.',
      '将文本或 URL 转为二维码，自定义尺寸、纠错等级和前景背景色，支持下载 PNG 与 SVG。'
    ),
    intro: l(
      'Encode a link or short text as a QR symbol entirely in the browser. Higher error correction can recover more damaged modules but also increases symbol density for the same content. Keep strong foreground/background contrast and a clear quiet zone, then scan the exported image before distributing it.',
      '在浏览器内将链接或短文本编码为二维码。较高纠错等级可恢复更多受损模块，但相同内容也可能生成更密集的图案。保持清晰的前景与背景对比以及周围留白，分发前请实际扫描导出图片。'
    ),
    keywords: ['qr', 'qrcode', 'png', 'svg', '二维码', '扫码', '链接', '下载'],
    instructions: {
      en: [
        'Enter the complete URL or text to encode.',
        'Choose size, error correction and colors, keeping a readable contrast.',
        'Generate the code, verify it with a scanner and download PNG for pixels or SVG for scalable artwork.'
      ],
      'zh-CN': [
        '输入需要编码的完整 URL 或文本。',
        '选择尺寸、纠错等级与颜色，并保持足够对比度。',
        '生成后用扫码器验证，下载 PNG 位图或可缩放的 SVG。'
      ]
    },
    example: l(
      'Encode https://example.com/docs/ to let a phone open documentation from a printed card.',
      '将 https://example.com/docs/ 编码后，可让手机从印刷卡片直接打开文档。'
    ),
    related: ['url', 'color', 'base64']
  },
  {
    id: 'cron',
    path: 'parse/cron',
    category: 'other',
    icon: 'CalendarClock',
    name: l('Cron expression', 'Cron 表达式解析'),
    description: l(
      'Validate five- or six-field Cron expressions and inspect their next execution times in UTC or your browser timezone.',
      '校验常见的五字段或六字段 Cron 表达式，查看含义及在 UTC 或浏览器时区中的后续执行时间。'
    ),
    intro: l(
      'Cron describes recurring calendar schedules using fields for minutes, hours and date constraints; six-field expressions add seconds at the beginning. Preview upcoming runs before configuring a job. Timezones, daylight saving changes and Cron dialects can affect behavior, so compare the result with the scheduler that will actually execute it.',
      'Cron 用分钟、小时和日期条件描述周期计划；六字段表达式在开头增加秒。配置任务前可预览后续运行时刻。时区、夏令时与 Cron 方言会影响行为，请将结果与真正执行任务的调度器规则核对。'
    ),
    keywords: ['cron', 'schedule', 'crontab', 'timezone', '定时', '计划', '表达式', '执行时间'],
    instructions: {
      en: [
        'Enter a five-field expression, or a six-field expression with seconds first.',
        'Choose UTC or the browser timezone and the number of upcoming runs.',
        'Parse the schedule and inspect the description and execution times.'
      ],
      'zh-CN': [
        '输入五字段表达式，或以秒开头的六字段表达式。',
        '选择 UTC 或浏览器时区，以及需要预览的运行次数。',
        '解析计划并检查说明与后续执行时间。'
      ]
    },
    example: l(
      '0 9 * * 1-5 means 09:00 on Monday through Friday in the selected timezone. */15 * * * * runs every 15 minutes.',
      '0 9 * * 1-5 表示所选时区周一至周五 09:00；*/15 * * * * 表示每 15 分钟执行一次。'
    ),
    related: ['timestamp', 'regex', 'json']
  },
  {
    id: 'case',
    path: 'text/case',
    category: 'text',
    icon: 'CaseSensitive',
    name: l('Case converter', '大小写与命名转换'),
    description: l(
      'Convert names and text to camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, Title Case and more.',
      '将名称与文本转换为 camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE 和标题大小写等格式。'
    ),
    intro: l(
      'Translate naming conventions when moving between source code, API fields, environment variables and URLs. The converter detects common word boundaries from separators and case changes. Identifier conversion is mechanical; check acronyms and names whose capitalization carries a specific meaning.',
      '在源码、API 字段、环境变量和 URL 之间切换命名规范。转换器根据常见分隔符和大小写变化识别单词边界。标识符转换是机械处理，缩写及大小写具有特殊含义的名称仍需自行检查。'
    ),
    keywords: [
      'case',
      'camel',
      'pascal',
      'snake',
      'kebab',
      'title',
      '大小写',
      '驼峰',
      '命名',
      '转换'
    ],
    instructions: {
      en: [
        'Paste a name, identifier or short text.',
        'Choose the target naming or capitalization style.',
        'Convert and copy the result, checking acronyms before using it in public interfaces.'
      ],
      'zh-CN': [
        '粘贴名称、标识符或短文本。',
        '选择目标命名格式或大小写风格。',
        '转换并复制结果，用于公开接口前请检查缩写是否符合约定。'
      ]
    },
    example: l(
      'hello world becomes helloWorld, HelloWorld, hello_world, hello-world or HELLO_WORLD depending on the selected style.',
      'hello world 可按所选格式转为 helloWorld、HelloWorld、hello_world、hello-world 或 HELLO_WORLD。'
    ),
    related: ['string', 'diff', 'regex']
  }
];

export const tools: ToolMeta[] = [
  ...baseTools.map((tool) => ({
    ...tool,
    tags: baseToolTags[tool.id as keyof typeof baseToolTags]
  })),
  ...extraTools
];

export function findToolByPath(path: string): ToolMeta | undefined {
  const localePrefix = new RegExp(
    `^(?:${locales.map((locale) => locale.replace('-', '\\-')).join('|')})/`
  );
  const clean = path.replace(/^\/+|\/+$/g, '').replace(localePrefix, '');
  return tools.find((tool) => tool.path === clean);
}

export function toolUrl(tool: ToolMeta, locale: Locale): string {
  return `/${locale}/${tool.path}/`;
}
