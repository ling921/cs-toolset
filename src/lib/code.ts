import hljs from 'highlight.js/lib/core';

export const codeLanguages = [
  'plain',
  'javascript',
  'typescript',
  'json',
  'yaml',
  'xml',
  'css',
  'sql'
] as const;
export type CodeLanguage = (typeof codeLanguages)[number];

export function codeLanguageFrom(value: string): CodeLanguage {
  return (codeLanguages as readonly string[]).includes(value) ? (value as CodeLanguage) : 'plain';
}

type LanguageModule = { default: Parameters<typeof hljs.registerLanguage>[1] };
const languageLoaders: Record<Exclude<CodeLanguage, 'plain'>, () => Promise<LanguageModule>> = {
  javascript: () => import('highlight.js/lib/languages/javascript'),
  typescript: () => import('highlight.js/lib/languages/typescript'),
  json: () => import('highlight.js/lib/languages/json'),
  yaml: () => import('highlight.js/lib/languages/yaml'),
  xml: () => import('highlight.js/lib/languages/xml'),
  css: () => import('highlight.js/lib/languages/css'),
  sql: () => import('highlight.js/lib/languages/sql')
};
const registeredLanguages = new Set<CodeLanguage>();

export async function ensureCodeLanguage(language: CodeLanguage) {
  if (language === 'plain' || registeredLanguages.has(language)) return;
  const module = await languageLoaders[language]();
  hljs.registerLanguage(language, module.default);
  registeredLanguages.add(language);
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

/** The highlighter returns escaped HTML; callers can safely render it with {@html}. */
export function highlightCode(value: string, language: CodeLanguage): string {
  if (!value || language === 'plain') return escapeHtml(value);
  try {
    return hljs.highlight(value, { language }).value;
  } catch {
    return escapeHtml(value);
  }
}
