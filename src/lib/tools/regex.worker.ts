/// <reference lib="webworker" />
const scope = self as DedicatedWorkerGlobalScope;
scope.onmessage = (
  event: MessageEvent<{
    pattern: string;
    flags: string;
    input: string;
    replacement: string;
    locale: 'en' | 'zh-CN';
  }>
) => {
  try {
    const { pattern, flags, input, replacement, locale } = event.data;
    if (
      !/^[dgimsuvy]*$/.test(flags) ||
      new Set(flags).size !== flags.length ||
      (flags.includes('u') && flags.includes('v'))
    ) {
      scope.postMessage({
        error: { en: 'Regex flags are invalid or repeated.', 'zh-CN': '正则标志无效或重复。' }
      });
      return;
    }
    const regex = new RegExp(pattern, flags);
    const search = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    const matches: unknown[] = [];
    for (const match of input.matchAll(search)) {
      matches.push({
        value: match[0],
        index: match.index,
        groups: match.groups ?? {},
        captures: match.slice(1)
      });
      if (matches.length >= 500) break;
    }
    const replaced = input.replace(regex, replacement);
    scope.postMessage({
      text: `${locale === 'zh-CN' ? '匹配结果' : 'MATCHES'} (${matches.length}${matches.length === 500 ? '+' : ''})\n${JSON.stringify(matches, null, 2)}\n\n${locale === 'zh-CN' ? '替换预览' : 'REPLACEMENT PREVIEW'}\n${replaced}`
    });
  } catch {
    scope.postMessage({
      error: { en: 'Regex pattern is invalid.', 'zh-CN': '正则表达式无效。' }
    });
  }
};
