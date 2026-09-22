import type { Locale, Localized, ToolId } from './types';

const l = (en: string, zh: string): Localized => ({ en, 'zh-CN': zh });

export const tagLabels: Record<string, Localized> = {
  random: l('random', '随机'),
  generator: l('generator', '生成'),
  string: l('string', '字符串'),
  hex: l('hex', '十六进制'),
  number: l('number', '数字'),
  uuid: l('uuid', 'UUID'),
  password: l('password', '密码'),
  security: l('security', '安全'),
  id: l('id', '标识符'),
  text: l('text', '文本'),
  json: l('json', 'JSON'),
  format: l('format', '格式化'),
  yaml: l('yaml', 'YAML'),
  convert: l('convert', '转换'),
  base64: l('base64', 'Base64'),
  image: l('image', '图片'),
  url: l('url', '网址'),
  encode: l('encode', '编码'),
  html: l('html', 'HTML'),
  hash: l('hash', '哈希'),
  md5: l('md5', 'MD5'),
  sha: l('sha', 'SHA'),
  hmac: l('hmac', 'HMAC'),
  time: l('time', '时间'),
  jwt: l('jwt', 'JWT'),
  token: l('token', '令牌'),
  color: l('color', '颜色'),
  css: l('css', 'CSS'),
  regex: l('regex', '正则'),
  diff: l('diff', '差异'),
  qr: l('qr', '二维码'),
  cron: l('cron', '计划任务'),
  case: l('case', '大小写'),
  radix: l('radix', '进制'),
  binary: l('binary', '二进制'),
  chinese: l('chinese', '中国'),
  identity: l('identity', '证件号'),
  csv: l('csv', 'CSV'),
  unicode: l('unicode', 'Unicode'),
  inspect: l('inspect', '解析'),
  statistics: l('statistics', '统计'),
  lines: l('lines', '行处理'),
  slug: l('slug', '短链名'),
  base32: l('base32', 'Base32'),
  http: l('http', 'HTTP'),
  status: l('status', '状态码'),
  xml: l('xml', 'XML')
};

export const baseToolTags: Record<
  Exclude<
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
  string[]
> = {
  string: ['random', 'generator', 'string'],
  hex: ['random', 'hex', 'generator'],
  number: ['random', 'number', 'generator'],
  uuid: ['uuid', 'random', 'id'],
  password: ['password', 'security', 'random', 'generator'],
  ids: ['id', 'uuid', 'random', 'generator'],
  lorem: ['text', 'generator', 'random'],
  json: ['json', 'format', 'text'],
  yaml: ['yaml', 'json', 'convert'],
  base64: ['base64', 'encode', 'convert'],
  url: ['url', 'encode', 'convert'],
  html: ['html', 'encode', 'text'],
  hash: ['hash', 'md5', 'sha', 'hmac', 'security'],
  timestamp: ['time', 'convert', 'number'],
  jwt: ['jwt', 'token', 'security', 'encode'],
  color: ['color', 'css', 'convert'],
  regex: ['regex', 'text', 'inspect'],
  diff: ['diff', 'text', 'inspect'],
  qr: ['qr', 'image', 'generator'],
  cron: ['cron', 'time', 'inspect'],
  case: ['case', 'text', 'convert']
};

export function tagLabel(tag: string, locale: Locale): string {
  return tagLabels[tag]?.[locale] ?? tag;
}

export function matchesTag(tag: string, needle: string): boolean {
  const value = needle.toLocaleLowerCase().replace(/^#/, '');
  return (
    tag.toLocaleLowerCase().includes(value) ||
    Object.values(tagLabels[tag] ?? {}).some((label) => label.toLocaleLowerCase().includes(value))
  );
}
