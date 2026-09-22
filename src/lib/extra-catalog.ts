import type { Category, Localized, ToolId, ToolMeta } from './types';

const l = (en: string, zh: string): Localized => ({ en, 'zh-CN': zh });
type Details = {
  id: ToolId;
  path: string;
  category: Category;
  icon: string;
  name: Localized;
  description: Localized;
  intro: Localized;
  example: Localized;
  tags: string[];
  related: ToolId[];
  steps: { en: string[]; 'zh-CN': string[] };
};
const meta = ({ steps, ...details }: Details): ToolMeta => ({
  ...details,
  keywords: [...details.tags, ...Object.values(details.name)],
  instructions: steps
});

export const extraTools: ToolMeta[] = [
  meta({
    id: 'imageBase64',
    path: 'convert/image-base64',
    category: 'convert',
    icon: 'Image',
    name: l('Image ↔ Base64', '图片与 Base64 转换'),
    description: l(
      'Encode a local image as a Base64 data URL or decode a data URL into a preview and downloadable image.',
      '将本地图片编码为 Base64 Data URL，或解码为可预览、可下载的图片。'
    ),
    intro: l(
      'Images are read locally, with a size limit to avoid freezing the browser. Only PNG, JPEG, GIF and WebP image data are accepted. Decoding a data URL does not upload it anywhere.',
      '图片在浏览器本地读取，并限制大小，避免浏览器卡顿。仅接受 PNG、JPEG、GIF 和 WebP 图片；解码不会上传数据。'
    ),
    example: l(
      'Upload a PNG to obtain data:image/png;base64,... or paste that URL to restore the image.',
      '上传 PNG 可得到 data:image/png;base64,...；粘贴该地址可还原图片。'
    ),
    steps: {
      en: [
        'Choose encode and upload an image, or choose decode and paste a Base64 data URL.',
        'Run the tool to preview, copy or download the image.'
      ],
      'zh-CN': [
        '选择编码并上传图片，或选择解码并粘贴 Base64 Data URL。',
        '运行后可预览、复制或下载图片。'
      ]
    },
    tags: ['image', 'base64', 'encode', 'convert'],
    related: ['base64', 'qr', 'url']
  }),
  meta({
    id: 'radix',
    path: 'convert/radix',
    category: 'convert',
    icon: 'Binary',
    name: l('Base / radix converter', '进制转换'),
    description: l(
      'Convert arbitrarily large integers among bases 2–36, including binary, octal, decimal and hexadecimal.',
      '在 2–36 进制之间转换任意长度整数，包括二进制、八进制、十进制与十六进制。'
    ),
    intro: l(
      'Uses BigInt to avoid precision loss with integers larger than JavaScript’s safe-number range. Supports negative numbers but not fractional values.',
      '使用 BigInt 避免大整数精度丢失。支持负数，不支持小数。'
    ),
    example: l(
      'FF in base 16 becomes 255 in base 10 or 11111111 in base 2.',
      '十六进制 FF 可转换为十进制 255 或二进制 11111111。'
    ),
    steps: {
      en: ['Enter an integer and select its source base.', 'Select the target base and convert.'],
      'zh-CN': ['输入整数并选择原始进制。', '选择目标进制后转换。']
    },
    tags: ['radix', 'binary', 'hex', 'number', 'convert'],
    related: ['number', 'hex', 'unicode']
  }),
  meta({
    id: 'cnId',
    path: 'gen/china-id',
    category: 'generate',
    icon: 'IdCard',
    name: l('Chinese ID test data', '中国身份证号测试数据'),
    description: l(
      'Generate or check syntactically valid 18-character mainland China resident ID numbers for testing.',
      '生成或校验符合 18 位格式与校验位规则的大陆居民身份证号测试数据。'
    ),
    intro: l(
      'Applies the GB 11643-1999 date, sequence and check-digit rules. A matching checksum does not prove a number was issued or belongs to a real person. Generated values are for tests only.',
      '按 GB 11643-1999 的日期、顺序码和校验位规则处理。校验位正确不代表号码已签发或属于真实个人，生成结果仅供测试。'
    ),
    example: l(
      'The published standard example 11010519491231002X has a valid checksum.',
      '标准示例 11010519491231002X 的校验位有效。'
    ),
    steps: {
      en: [
        'Choose generation or validation; for generation set a region, birth date and sex.',
        'Copy test-only numbers or inspect the validation result.'
      ],
      'zh-CN': ['选择生成或校验；生成时设置地区、出生日期和性别。', '复制测试号码或查看校验结果。']
    },
    tags: ['chinese', 'identity', 'id', 'generator'],
    related: ['uuid', 'ids', 'number']
  }),
  meta({
    id: 'csv',
    path: 'convert/csv-json',
    category: 'convert',
    icon: 'Table',
    name: l('CSV ↔ JSON', 'CSV 与 JSON 转换'),
    description: l(
      'Convert quoted, multiline CSV data to JSON records and JSON arrays back to CSV.',
      '将支持引号与多行字段的 CSV 转成 JSON 记录，也可将 JSON 数组转回 CSV。'
    ),
    intro: l(
      'Supports RFC-style double-quote escaping and CRLF line endings. The first CSV row is treated as column names.',
      '支持双引号转义和 CRLF 换行；CSV 首行作为列名。'
    ),
    example: l(
      'name,age followed by Ada,36 becomes [{"name":"Ada","age":"36"}].',
      'name,age 与 Ada,36 可转为 [{"name":"Ada","age":"36"}]。'
    ),
    steps: {
      en: [
        'Choose CSV to JSON or JSON to CSV.',
        'Paste the data and convert; review types because CSV values are strings.'
      ],
      'zh-CN': [
        '选择 CSV 转 JSON 或 JSON 转 CSV。',
        '粘贴数据并转换；CSV 值默认是字符串，请检查类型。'
      ]
    },
    tags: ['csv', 'json', 'convert', 'text'],
    related: ['json', 'yaml', 'lines']
  }),
  meta({
    id: 'unicode',
    path: 'text/unicode',
    category: 'text',
    icon: 'Languages',
    name: l('Unicode inspector', 'Unicode 字符检查'),
    description: l(
      'Inspect code points, UTF-8 bytes and escaped forms for each character.',
      '查看每个字符的码位、UTF-8 字节和转义形式。'
    ),
    intro: l(
      'Useful for debugging invisible characters, emoji, multilingual text and encoding issues. Iterates Unicode code points rather than UTF-16 code units.',
      '适合排查不可见字符、Emoji、多语言文本和编码问题；按 Unicode 码位而非 UTF-16 码元遍历。'
    ),
    example: l('中 is U+4E2D and UTF-8 E4 B8 AD.', '“中”的码位是 U+4E2D，UTF-8 字节为 E4 B8 AD。'),
    steps: {
      en: ['Enter a short text.', 'Inspect its code points and UTF-8 bytes.'],
      'zh-CN': ['输入一段短文本。', '查看对应的码位和 UTF-8 字节。']
    },
    tags: ['unicode', 'text', 'encode', 'inspect'],
    related: ['base64', 'html', 'radix']
  }),
  meta({
    id: 'urlInspect',
    path: 'inspect/url',
    category: 'other',
    icon: 'Link',
    name: l('URL inspector', 'URL 解析器'),
    description: l(
      'Break a URL into origin, path, query parameters and fragment.',
      '拆解网址的来源、路径、查询参数与锚点。'
    ),
    intro: l(
      'Uses the browser URL parser. Repeated query keys remain visible in the output; credentials are never sent to a server.',
      '使用浏览器内置 URL 解析器，重复的查询参数不会丢失；输入不会发送到服务器。'
    ),
    example: l(
      'https://example.com/a?q=1#top exposes hostname, path, q=1 and fragment top.',
      'https://example.com/a?q=1#top 可拆出主机名、路径、q=1 和锚点 top。'
    ),
    steps: {
      en: ['Paste an absolute URL.', 'Run to inspect components and query parameters.'],
      'zh-CN': ['粘贴完整网址。', '运行后查看各组成部分和查询参数。']
    },
    tags: ['url', 'inspect', 'text'],
    related: ['url', 'qr', 'slug']
  }),
  meta({
    id: 'textStats',
    path: 'text/statistics',
    category: 'text',
    icon: 'ChartNoAxesColumn',
    name: l('Text statistics', '文本统计'),
    description: l(
      'Count characters, Unicode code points, words, lines and UTF-8 bytes.',
      '统计字符、Unicode 码位、单词、行数和 UTF-8 字节数。'
    ),
    intro: l(
      'Grapheme counts treat many emoji sequences as one visible character. Word segmentation follows the browser locale when supported.',
      '字素统计会将许多 Emoji 组合视为一个可见字符；浏览器支持时会按语言环境分词。'
    ),
    example: l(
      'A short multilingual string may have different UTF-16, grapheme and byte counts.',
      '多语言文本的 UTF-16 长度、可见字符数和字节数可能不同。'
    ),
    steps: {
      en: ['Paste text.', 'Inspect the counts and estimated reading time.'],
      'zh-CN': ['粘贴文本。', '查看各项统计和预计阅读时间。']
    },
    tags: ['text', 'statistics', 'unicode'],
    related: ['unicode', 'lines', 'case']
  }),
  meta({
    id: 'lines',
    path: 'text/lines',
    category: 'text',
    icon: 'ListFilter',
    name: l('Line sorter & deduplicator', '文本行排序与去重'),
    description: l(
      'Sort, reverse or deduplicate lines, with optional case-insensitive comparison.',
      '排序、反转或去重文本行，并可忽略大小写比较。'
    ),
    intro: l(
      'Keeps processing entirely local. Deduplication preserves the first occurrence; sorting uses locale-aware comparison.',
      '完全在本地处理。去重时保留首次出现的行；排序使用适合语言环境的比较方式。'
    ),
    example: l(
      'b, a, b on separate lines becomes b, a when deduplicated.',
      '三行 b、a、b 去重后为 b、a。'
    ),
    steps: {
      en: ['Paste one item per line.', 'Choose sort, reverse or deduplicate, then run.'],
      'zh-CN': ['每行输入一项。', '选择排序、反转或去重并运行。']
    },
    tags: ['lines', 'text', 'format'],
    related: ['diff', 'textStats', 'csv']
  }),
  meta({
    id: 'slug',
    path: 'text/slug',
    category: 'text',
    icon: 'Link2',
    name: l('URL slug generator', 'URL Slug 生成器'),
    description: l(
      'Turn a title into a tidy URL segment with configurable separators and Unicode handling.',
      '将标题转换为整洁的网址路径片段，支持分隔符和 Unicode 字符。'
    ),
    intro: l(
      'Strips punctuation, normalizes Latin diacritics and keeps non-Latin letters when Unicode mode is enabled. It does not claim to transliterate Chinese into pinyin.',
      '移除标点、规范拉丁变音字符；启用 Unicode 模式时保留非拉丁文字。不会声称将中文自动转换成拼音。'
    ),
    example: l('Hello, World! becomes hello-world.', 'Hello, World! 会变为 hello-world。'),
    steps: {
      en: [
        'Enter a title and choose a separator.',
        'Generate and review the resulting URL segment.'
      ],
      'zh-CN': ['输入标题并选择分隔符。', '生成并检查网址路径片段。']
    },
    tags: ['slug', 'url', 'text', 'convert'],
    related: ['case', 'url', 'urlInspect']
  }),
  meta({
    id: 'base32',
    path: 'convert/base32',
    category: 'convert',
    icon: 'Binary',
    name: l('Base32 encoder / decoder', 'Base32 编码与解码'),
    description: l(
      'Encode UTF-8 text to RFC 4648 Base32 and decode it back.',
      '按 RFC 4648 将 UTF-8 文本编码为 Base32，或解码还原。'
    ),
    intro: l(
      'Uses the standard A–Z and 2–7 alphabet with optional padding. This is an encoding, not encryption.',
      '使用标准 A–Z、2–7 字母表，可选填充；编码不等于加密。'
    ),
    example: l('foo becomes MZXW6===.', 'foo 编码后为 MZXW6===。'),
    steps: {
      en: ['Choose encode or decode.', 'Paste text or Base32 and run.'],
      'zh-CN': ['选择编码或解码。', '粘贴文本或 Base32 并运行。']
    },
    tags: ['base32', 'encode', 'convert'],
    related: ['base64', 'radix', 'unicode']
  }),
  meta({
    id: 'httpStatus',
    path: 'inspect/http-status',
    category: 'other',
    icon: 'Globe',
    name: l('HTTP status lookup', 'HTTP 状态码速查'),
    description: l(
      'Look up common HTTP response codes and their meanings.',
      '查询常见 HTTP 响应状态码及含义。'
    ),
    intro: l(
      'Quickly distinguish success, redirects, client errors and server errors while debugging web requests.',
      '调试 Web 请求时快速区分成功、重定向、客户端错误和服务端错误。'
    ),
    example: l(
      '404 means Not Found; 429 means Too Many Requests.',
      '404 表示未找到，429 表示请求过多。'
    ),
    steps: {
      en: ['Enter a three-digit HTTP status code.', 'Read the short explanation and category.'],
      'zh-CN': ['输入三位 HTTP 状态码。', '查看简要说明及类别。']
    },
    tags: ['http', 'status', 'inspect'],
    related: ['urlInspect', 'url', 'json']
  }),
  meta({
    id: 'xml',
    path: 'format/xml',
    category: 'text',
    icon: 'FileCode2',
    name: l('XML validator & formatter', 'XML 校验与格式化'),
    description: l(
      'Validate XML syntax and optionally format documents without fetching external resources.',
      '校验 XML 语法并可格式化文档，不获取外部资源。'
    ),
    intro: l(
      'Parsing is local. External DTD and entity declarations are rejected to avoid loading or expanding untrusted content. Formatting may change insignificant whitespace.',
      '本地解析；拒绝外部 DTD 与实体声明，避免加载或展开不可信内容。格式化可能改变非关键空白。'
    ),
    example: l(
      '<root><item>Hi</item></root> can be validated or indented.',
      '<root><item>Hi</item></root> 可校验或缩进。'
    ),
    steps: {
      en: [
        'Paste XML and choose validate or format.',
        'Run and review parser errors or formatted output.'
      ],
      'zh-CN': ['粘贴 XML 并选择校验或格式化。', '运行后查看错误或格式化结果。']
    },
    tags: ['xml', 'format', 'text'],
    related: ['json', 'html', 'yaml']
  })
];
