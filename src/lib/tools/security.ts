import { md5, sha1 } from '@noble/hashes/legacy.js';
import { sha256, sha384, sha512 } from '@noble/hashes/sha2.js';
import { hmac } from '@noble/hashes/hmac.js';
import { pbkdf2Async } from '@noble/hashes/pbkdf2.js';
import type { Locale, ToolInput, ToolResult } from '../types';
import { boundedText, decodeUtf8, fail, fromBase64, hex, integer, toBase64, utf8 } from './common';
const functions = { md5, sha1, sha256, sha384, sha512 };
type Algorithm = keyof typeof functions;
export async function hashTool(input: ToolInput): Promise<ToolResult> {
  const message = utf8(boundedText(input.input));
  const algorithm = input.algorithm as Algorithm;
  if (!(algorithm in functions)) fail('Unknown hash algorithm.', '未知哈希算法。');
  const hash = functions[algorithm];
  let result: Uint8Array;
  if (input.mode === 'hash') result = hash(message);
  else if (input.mode === 'hmac') result = hmac(hash, utf8(boundedText(input.key, 4096)), message);
  else if (input.mode === 'pbkdf2') {
    const iterations = integer(input.iterations, 1, 2_000_000, 'Iterations');
    const bytes = integer(input.bytes, 1, 256, 'Output bytes');
    result = await pbkdf2Async(hash, message, utf8(boundedText(input.salt, 4096)), {
      c: iterations,
      dkLen: bytes,
      asyncTick: 15
    });
  } else return fail('Unknown operation.', '未知操作。');
  return { text: input.encoding === 'base64' ? toBase64(result) : hex(result) };
}
type JwtAlgorithm = 'HS256' | 'HS384' | 'HS512';
const jwtAlgorithms: Record<JwtAlgorithm, { hash: string; minimum: number }> = {
  HS256: { hash: 'SHA-256', minimum: 32 },
  HS384: { hash: 'SHA-384', minimum: 48 },
  HS512: { hash: 'SHA-512', minimum: 64 }
};
const plainObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
function parseObject(value: string, label: Record<Locale, string>): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return fail(`${label.en} must be valid JSON.`, `${label['zh-CN']} 必须是有效 JSON。`);
  }
  if (!plainObject(parsed))
    fail(`${label.en} must be a JSON object.`, `${label['zh-CN']} 必须是 JSON 对象。`);
  return parsed;
}
async function keyFor(
  secret: string,
  algorithm: JwtAlgorithm,
  usage: KeyUsage
): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    utf8(secret),
    { name: 'HMAC', hash: jwtAlgorithms[algorithm].hash },
    false,
    [usage]
  );
}
export async function jwtTool(input: ToolInput, locale: Locale = 'en'): Promise<ToolResult> {
  if (input.mode === 'encode') {
    const algorithm = input.algorithm as JwtAlgorithm;
    if (!(algorithm in jwtAlgorithms)) fail('Unsupported signing algorithm.', '不支持该签名算法。');
    const secret = boundedText(input.secret, 4096);
    if (utf8(secret).length < jwtAlgorithms[algorithm].minimum)
      fail(
        `Use at least ${jwtAlgorithms[algorithm].minimum} UTF-8 bytes of secret key.`,
        `密钥至少需要 ${jwtAlgorithms[algorithm].minimum} 个 UTF-8 字节。`
      );
    const extra = parseObject(boundedText(input.header, 20_000), {
      en: 'Header',
      'zh-CN': '请求头'
    });
    if ('crit' in extra || 'b64' in extra)
      fail(
        'Critical or unencoded-payload headers are not supported.',
        '不支持 crit 或未编码载荷 Header。'
      );
    const payload = parseObject(boundedText(input.payload, 100_000), {
      en: 'Payload',
      'zh-CN': '载荷'
    });
    const header = { ...extra, typ: 'JWT', alg: algorithm };
    const signingInput = `${toBase64(utf8(JSON.stringify(header)), true)}.${toBase64(utf8(JSON.stringify(payload)), true)}`;
    const key = await keyFor(secret, algorithm, 'sign');
    const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, utf8(signingInput)));
    return { text: `${signingInput}.${toBase64(signature, true)}` };
  }
  if (input.mode !== 'decode') fail('Unknown JWT operation.', '未知 JWT 操作。');
  const value = boundedText(input.input, 100_000).trim();
  const sections = value.split('.');
  if (sections.length !== 3 || !sections[0] || !sections[1])
    fail('JWT must contain three sections.', 'JWT 必须包含三段。');
  let header: Record<string, unknown>, payload: Record<string, unknown>;
  try {
    header = parseObject(decodeUtf8(fromBase64(sections[0], true)), {
      en: 'Header',
      'zh-CN': '请求头'
    });
    payload = parseObject(decodeUtf8(fromBase64(sections[1], true)), {
      en: 'Payload',
      'zh-CN': '载荷'
    });
  } catch {
    return fail(
      'JWT header or payload is invalid Base64URL/JSON.',
      'JWT Header 或 Payload 不是有效 Base64URL/JSON。'
    );
  }
  const algorithm = header.alg;
  let verification =
    locale === 'zh-CN'
      ? '未验签；提供 HMAC 密钥后可校验。'
      : 'Not verified; provide an HMAC secret to check the signature.';
  if (input.secret) {
    if (typeof algorithm !== 'string' || !(algorithm in jwtAlgorithms))
      verification =
        locale === 'zh-CN'
          ? '不支持此算法，签名未验证。'
          : 'Unsupported algorithm; signature was not verified.';
    else if (!sections[2])
      verification = locale === 'zh-CN' ? '缺少签名。' : 'Signature is missing.';
    else {
      const key = await keyFor(
        boundedText(input.secret, 4096),
        algorithm as JwtAlgorithm,
        'verify'
      );
      let valid = false;
      try {
        valid = await crypto.subtle.verify(
          'HMAC',
          key,
          Uint8Array.from(fromBase64(sections[2], true)),
          utf8(`${sections[0]}.${sections[1]}`)
        );
      } catch {
        /* invalid signature encoding */
      }
      verification = valid
        ? locale === 'zh-CN'
          ? '签名有效；仍需自行核对签发者、受众及声明。'
          : 'Signature valid; still check issuer, audience and claims.'
        : locale === 'zh-CN'
          ? '签名无效。'
          : 'Signature invalid.';
    }
  }
  const now = Math.floor(Date.now() / 1000);
  const claim = (name: 'exp' | 'nbf' | 'iat') => {
    const value = payload[name];
    if (typeof value !== 'number' || !Number.isFinite(value)) return null;
    const date = new Date(value * 1000);
    if (Number.isNaN(date.valueOf())) return `${name}: ${value}`;
    const state =
      name === 'exp'
        ? value <= now
          ? locale === 'zh-CN'
            ? '已过期'
            : 'expired'
          : locale === 'zh-CN'
            ? '未过期'
            : 'not expired'
        : name === 'nbf'
          ? value > now
            ? locale === 'zh-CN'
              ? '尚未生效'
              : 'not yet valid'
            : locale === 'zh-CN'
              ? '已生效'
              : 'effective'
          : '';
    return `${name}: ${date.toISOString()}${state ? ` (${state})` : ''}`;
  };
  return {
    text: `${locale === 'zh-CN' ? '头部' : 'HEADER'}\n${JSON.stringify(header, null, 2)}\n\n${locale === 'zh-CN' ? '载荷' : 'PAYLOAD'}\n${JSON.stringify(payload, null, 2)}\n\n${[
      'iat',
      'nbf',
      'exp'
    ]
      .map((name) => claim(name as 'iat' | 'nbf' | 'exp'))
      .filter(Boolean)
      .join('\n')}\n${locale === 'zh-CN' ? '签名状态' : 'Signature'}: ${verification}`
  };
}
