import type { Locale, ToolInput } from '../types';

/** A user-facing failure carries each translation separately until the UI knows the active locale. */
export class ToolError extends Error {
  readonly messages: Record<Locale, string>;

  constructor(en: string, zh: string) {
    super(en);
    this.name = 'ToolError';
    this.messages = { en, 'zh-CN': zh };
  }
}

export function fail(en: string, zh: string): never {
  throw new ToolError(en, zh);
}

export function toolErrorMessage(error: unknown, locale: Locale): string {
  if (error instanceof ToolError) return error.messages[locale];
  return {
    en: 'Something went wrong. Check your input and try again.',
    'zh-CN': '处理失败，请检查输入后重试。'
  }[locale];
}
export const checked = (input: ToolInput, key: string) => input[key] === 'true';
export function integer(value: string, min: number, max: number, label = 'Value'): number {
  const n = Number(value);
  if (value.trim() === '' || !Number.isSafeInteger(n) || n < min || n > max)
    fail(
      `${label} must be an integer from ${min} to ${max}.`,
      `数值必须为 ${min} 到 ${max} 之间的整数。`
    );
  return n;
}
export function boundedText(value: string, max = 1_000_000): string {
  if (value.length > max) fail(`Input exceeds ${max} characters.`, `输入超过 ${max} 个字符。`);
  return value;
}
export const utf8 = (value: string) => new TextEncoder().encode(value);
export function toBase64(bytes: Uint8Array, urlSafe = false): string {
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 8192)
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
  const result = btoa(binary);
  return urlSafe ? result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : result;
}
export function fromBase64(value: string, urlSafe = false): Uint8Array {
  const compact = value.replace(/\s/g, '');
  const alphabet = urlSafe ? /^[A-Za-z0-9_-]*={0,2}$/ : /^[A-Za-z0-9+/]*={0,2}$/;
  if (
    !alphabet.test(compact) ||
    compact.replace(/=+$/, '').length % 4 === 1 ||
    (compact.includes('=') && compact.length % 4 !== 0)
  )
    fail('Invalid Base64 input.', 'Base64 输入无效。');
  const normalized = compact.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  if (toBase64(bytes).replace(/=+$/, '') !== normalized.replace(/=+$/, ''))
    fail('Non-canonical Base64 padding bits.', 'Base64 填充位无效。');
  return bytes;
}
export function decodeUtf8(bytes: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return fail('Decoded bytes are not valid UTF-8 text.', '解码后的字节不是有效 UTF-8 文本。');
  }
}
export const hex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

/** Rejection sampling avoids modulo bias, including across the complete safe-integer range. */
export function randomBelow(limit: bigint): bigint {
  if (limit <= 0n) fail('The random range is empty.', '随机范围为空。');
  if (limit === 1n) return 0n;
  const bits = (limit - 1n).toString(2).length;
  const bytes = new Uint8Array(Math.ceil(bits / 8));
  const mask = (1 << (((bits - 1) % 8) + 1)) - 1;
  for (;;) {
    crypto.getRandomValues(bytes);
    bytes[0] &= mask;
    let candidate = 0n;
    for (const byte of bytes) candidate = (candidate << 8n) | BigInt(byte);
    if (candidate < limit) return candidate;
  }
}
export const pick = <T>(values: T[]): T => values[Number(randomBelow(BigInt(values.length)))];
