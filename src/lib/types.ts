export type Locale = 'en' | 'zh-CN';
export type Localized = Record<Locale, string>;
export type ToolId =
  | 'string'
  | 'hex'
  | 'number'
  | 'uuid'
  | 'password'
  | 'ids'
  | 'lorem'
  | 'json'
  | 'yaml'
  | 'base64'
  | 'url'
  | 'html'
  | 'hash'
  | 'timestamp'
  | 'jwt'
  | 'color'
  | 'regex'
  | 'diff'
  | 'qr'
  | 'cron'
  | 'case'
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
  | 'xml';
export type Category = 'generate' | 'convert' | 'security' | 'text' | 'other';
export interface ToolMeta {
  id: ToolId;
  path: string;
  category: Category;
  icon: string;
  name: Localized;
  description: Localized;
  intro: Localized;
  keywords: string[];
  tags: string[];
  instructions: Record<Locale, string[]>;
  example: Localized;
  related: ToolId[];
}
export type ToolInput = Record<string, string>;
export interface ToolField {
  key: string;
  label: Localized;
  type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'password' | 'color';
  default: string;
  options?: { value: string; label: Localized }[];
  min?: number;
  max?: number;
  step?: string;
  hint?: Localized;
}
export interface ToolResult {
  text: string;
  /**
   * The syntax of a structured result.  This is supplied by the tool that
   * produced the value, rather than inferred from the page or its input.
   */
  structuredLanguage?: 'json' | 'yaml' | 'xml';
  media?: { svg: string; filename: string };
  image?: { dataUrl: string; filename: string; mime: string; bytes: number };
  swatch?: string;
  contrast?: number;
  diff?: { value: string; added?: boolean; removed?: boolean }[];
  diffRows?: { before?: DiffRowLine; after?: DiffRowLine }[];
}

export interface DiffRowLine {
  text: string;
  kind: 'context' | 'added' | 'removed';
  line: number;
}
