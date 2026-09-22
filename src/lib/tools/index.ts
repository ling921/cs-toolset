import type { Locale, ToolId, ToolInput, ToolResult } from '../types';
import { toolFields, getDefaults } from './fields';
import { boundedText, fail, ToolError } from './common';
export { toolFields, getDefaults };
export async function runTool(
  id: ToolId,
  input: ToolInput,
  locale: Locale = 'en'
): Promise<ToolResult> {
  if (
    [
      'imageBase64',
      'radix',
      'cnId',
      'csv',
      'unicode',
      'urlInspect',
      'textStats',
      'lines',
      'slug',
      'base32',
      'httpStatus',
      'xml'
    ].includes(id)
  )
    return (await import('./extras')).runExtra(id as 'imageBase64', input, locale);
  if (['string', 'hex', 'number', 'uuid', 'password', 'ids', 'lorem'].includes(id))
    return (await import('./generators')).generate(id as 'string', input, locale);
  if (['json', 'yaml', 'base64', 'url', 'html', 'case'].includes(id))
    return (await import('./encoding')).encode(id as 'json', input, locale);
  if (id === 'hash') return (await import('./security')).hashTool(input);
  if (id === 'jwt') return (await import('./security')).jwtTool(input, locale);
  if (id === 'timestamp') return (await import('./other')).timestampTool(input, locale);
  if (id === 'color') return (await import('./other')).colorTool(input, locale);
  if (id === 'diff') return (await import('./other')).diffTool(input);
  if (id === 'qr') return (await import('./other')).qrTool(input);
  if (id === 'cron') return (await import('./other')).cronTool(input, locale);
  if (id === 'regex') {
    const pattern = boundedText(input.pattern, 5000),
      flags = boundedText(input.flags, 16),
      source = boundedText(input.input, 100_000),
      replacement = boundedText(input.replacement, 5000);
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./regex.worker.ts', import.meta.url), { type: 'module' });
      const timer = setTimeout(() => {
        worker.terminate();
        reject(new ToolError('Regex exceeded the 2-second limit.', '正则执行超过 2 秒限制。'));
      }, 2000);
      worker.onmessage = (event: MessageEvent<ToolResult & { error?: Record<Locale, string> }>) => {
        clearTimeout(timer);
        worker.terminate();
        event.data.error
          ? reject(new ToolError(event.data.error.en, event.data.error['zh-CN']))
          : resolve({ text: event.data.text });
      };
      worker.onerror = () => {
        clearTimeout(timer);
        worker.terminate();
        reject(new ToolError('Regex worker failed.', '正则工作线程失败。'));
      };
      worker.postMessage({ pattern, flags, input: source, replacement, locale });
    });
  }
  return fail('Unknown tool.', '未知工具。');
}
