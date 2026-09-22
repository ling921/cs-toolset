import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import { encode as encodeHtml, decode as decodeHtml } from 'html-entities';
import type { Locale, ToolId, ToolInput, ToolResult } from '../types';
import {
  boundedText,
  checked,
  decodeUtf8,
  fail,
  fromBase64,
  integer,
  toBase64,
  utf8
} from './common';
function sorted(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, sorted(v)])
    );
  return value;
}
function json(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return fail(
      `Invalid JSON: ${e instanceof Error ? e.message : 'parse error'}`,
      'JSON 格式无效。'
    );
  }
}
function yaml(value: string) {
  try {
    return parseYaml(value, { schema: 'core', uniqueKeys: true, maxAliasCount: 20 });
  } catch (e) {
    return fail(
      `Invalid YAML: ${e instanceof Error ? e.message : 'parse error'}`,
      'YAML 格式无效。'
    );
  }
}
function tokenize(text: string): string[] {
  const normalized = text
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return normalized.match(/[\p{L}\p{N}]+/gu)?.map((word) => word.toLocaleLowerCase()) || [];
}
export function encode(
  id: Extract<ToolId, 'json' | 'yaml' | 'base64' | 'url' | 'html' | 'case'>,
  input: ToolInput,
  locale: Locale = 'en'
): ToolResult {
  const value = boundedText(input.input);
  if (id === 'json') {
    const parsed = json(value);
    if (input.mode === 'validate')
      return { text: locale === 'zh-CN' ? 'JSON 格式正确' : 'Valid JSON' };
    return {
      text: JSON.stringify(
        input.mode === 'sort' ? sorted(parsed) : parsed,
        null,
        input.mode === 'minify' ? undefined : integer(input.indent, 1, 8, 'Indent')
      ),
      structuredLanguage: 'json'
    };
  }
  if (id === 'yaml') {
    if (input.mode === 'toJson') {
      const result = yaml(value);
      return { text: JSON.stringify(result, null, 2), structuredLanguage: 'json' };
    }
    return { text: stringifyYaml(json(value), { simpleKeys: true }), structuredLanguage: 'yaml' };
  }
  if (id === 'base64') {
    const urlSafe = checked(input, 'urlSafe');
    return {
      text:
        input.mode === 'encode'
          ? toBase64(utf8(value), urlSafe)
          : decodeUtf8(fromBase64(value, urlSafe))
    };
  }
  if (id === 'url') {
    try {
      return {
        text:
          input.mode === 'encode'
            ? input.scope === 'uri'
              ? encodeURI(value)
              : encodeURIComponent(value)
            : input.scope === 'uri'
              ? decodeURI(value)
              : decodeURIComponent(value)
      };
    } catch {
      return fail('Invalid percent-encoded URL.', 'URL 百分号编码无效。');
    }
  }
  if (id === 'html')
    return {
      text:
        input.mode === 'encode'
          ? encodeHtml(value, { mode: 'extensive' })
          : decodeHtml(value, { level: 'html5' })
    };
  if (id === 'case') {
    const words = tokenize(value);
    const capitalize = (s: string) => s.slice(0, 1).toLocaleUpperCase() + s.slice(1);
    const camel = words.map((w, i) => (i ? capitalize(w) : w)).join('');
    const variants: Record<string, string> = {
      camel,
      pascal: words.map(capitalize).join(''),
      snake: words.join('_'),
      kebab: words.join('-'),
      constant: words.join('_').toLocaleUpperCase(),
      title: words.map(capitalize).join(' '),
      lower: value.toLocaleLowerCase(),
      upper: value.toLocaleUpperCase(),
      sentence: capitalize(words.join(' '))
    };
    if (!(input.mode in variants)) fail('Unknown case style.', '未知的命名格式。');
    return { text: variants[input.mode] };
  }
  return fail('Unknown tool.', '未知工具。');
}
