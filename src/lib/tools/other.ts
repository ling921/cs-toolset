import { Cron } from 'croner';
import { diffChars, diffWords, diffLines, createTwoFilesPatch } from 'diff';
import QRCode from 'qrcode';
import type { DiffRowLine, Locale, ToolInput, ToolResult } from '../types';
import { boundedText, fail, integer } from './common';

export function timestampTool(input: ToolInput, locale: Locale = 'en'): ToolResult {
  const source = input.input.trim();
  let date: Date;
  if (!source) date = new Date();
  else if (input.mode === 'seconds' || input.mode === 'milliseconds') {
    const number = Number(source);
    if (!Number.isFinite(number)) fail('Enter a finite timestamp.', '请输入有限的时间戳。');
    date = new Date(number * (input.mode === 'seconds' ? 1000 : 1));
  } else {
    const hasZone = /Z$|[+-]\d\d:\d\d$/i.test(source);
    date = new Date(
      !hasZone && input.zone === 'utc' && /^\d{4}-\d\d-\d\d(?:T| )/.test(source)
        ? source.replace(' ', 'T') + 'Z'
        : source
    );
  }
  if (Number.isNaN(date.valueOf())) fail('Invalid date or timestamp.', '日期或时间戳无效。');
  return {
    text: `${locale === 'zh-CN' ? 'Unix 秒' : 'Unix seconds'}: ${Math.floor(date.getTime() / 1000)}\n${locale === 'zh-CN' ? 'Unix 毫秒' : 'Unix milliseconds'}: ${date.getTime()}\nISO 8601: ${date.toISOString()}\nUTC: ${date.toUTCString()}\n${locale === 'zh-CN' ? '本地时间' : 'Local'}: ${new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'long' }).format(date)}`
  };
}

type Rgba = { r: number; g: number; b: number; a: number };
const clamp = (n: number) => Math.min(255, Math.max(0, n));
const round = (n: number) => Math.round(n * 100) / 100;
function parseColor(source: string): Rgba {
  const input = source.trim().toLowerCase();
  if (/^#[\da-f]{3,4}$/i.test(input)) {
    const v = [...input.slice(1)].map((c) => parseInt(c + c, 16));
    return { r: v[0], g: v[1], b: v[2], a: v[3] === undefined ? 1 : v[3] / 255 };
  }
  if (/^#[\da-f]{6}([\da-f]{2})?$/i.test(input)) {
    const v = input
      .slice(1)
      .match(/../g)!
      .map((s) => parseInt(s, 16));
    return { r: v[0], g: v[1], b: v[2], a: v[3] === undefined ? 1 : v[3] / 255 };
  }
  const match = /^(rgba?|hsla?|hsv|cmyk)\((.*)\)$/.exec(input);
  if (!match)
    fail('Use HEX, rgb(), hsl(), hsv(), or cmyk().', '请使用 HEX、rgb()、hsl()、hsv() 或 cmyk()。');
  const v = match[2]
    .split(/[,\s/]+/)
    .filter(Boolean)
    .map((x) => parseFloat(x));
  if (v.some((x) => !Number.isFinite(x))) fail('Invalid color components.', '颜色分量无效。');
  const a = match[1].endsWith('a') ? v[3] : 1;
  if (a < 0 || a > 1) fail('Alpha must be between 0 and 1.', '透明度必须处于 0 到 1。');
  if (match[1].startsWith('rgb')) {
    if (v.length < (a === 1 ? 3 : 4) || v.slice(0, 3).some((x) => x < 0 || x > 255))
      fail('RGB values must be 0–255.', 'RGB 分量必须处于 0–255。');
    return { r: v[0], g: v[1], b: v[2], a };
  }
  if (match[1] === 'cmyk') {
    if (v.length !== 4 || v.some((x) => x < 0 || x > 100))
      fail('CMYK values must be percentages from 0–100.', 'CMYK 分量必须为 0–100 的百分数。');
    const [c, m, y, k] = v.map((x) => x / 100);
    return {
      r: 255 * (1 - c) * (1 - k),
      g: 255 * (1 - m) * (1 - k),
      b: 255 * (1 - y) * (1 - k),
      a: 1
    };
  }
  if (v.length < (a === 1 ? 3 : 4) || v[1] < 0 || v[1] > 100 || v[2] < 0 || v[2] > 100)
    fail(
      'HSL/HSV saturation and lightness/value must be 0–100%.',
      'HSL/HSV 饱和度和亮度必须为 0–100%。'
    );
  const h = ((v[0] % 360) + 360) % 360,
    s = v[1] / 100,
    x = v[2] / 100;
  let c = 0,
    m = 0;
  if (match[1].startsWith('hsl')) {
    c = (1 - Math.abs(2 * x - 1)) * s;
    m = x - c / 2;
  } else {
    c = x * s;
    m = x - c;
  }
  const segment = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const [r, g, b] =
    h < 60
      ? [c, segment, 0]
      : h < 120
        ? [segment, c, 0]
        : h < 180
          ? [0, c, segment]
          : h < 240
            ? [0, segment, c]
            : h < 300
              ? [segment, 0, c]
              : [c, 0, segment];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255, a };
}
function luminance(color: Rgba) {
  const [r, g, b] = [color.r, color.g, color.b].map((x) => {
    const n = x / 255;
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function colorTool(input: ToolInput, locale: Locale = 'en'): ToolResult {
  const color = parseColor(input.input),
    background = parseColor(input.background);
  const { r, g, b, a } = color;
  const max = Math.max(r, g, b) / 255,
    min = Math.min(r, g, b) / 255,
    d = max - min;
  let hue = 0;
  if (d) {
    switch (max * 255) {
      case r:
        hue = ((g - b) / 255 / d) % 6;
        break;
      case g:
        hue = (b - r) / 255 / d + 2;
        break;
      default:
        hue = (r - g) / 255 / d + 4;
    }
    hue = (hue * 60 + 360) % 360;
  }
  const light = (max + min) / 2,
    saturationHsl = d === 0 ? 0 : d / (1 - Math.abs(2 * light - 1));
  const satHsv = max === 0 ? 0 : d / max;
  const k = 1 - max,
    c = max === 0 ? 0 : (max - r / 255) / max,
    m = max === 0 ? 0 : (max - g / 255) / max,
    y = max === 0 ? 0 : (max - b / 255) / max;
  const blended = {
    r: r * a + background.r * (1 - a),
    g: g * a + background.g * (1 - a),
    b: b * a + background.b * (1 - a),
    a: 1
  };
  const l1 = luminance(blended),
    l2 = luminance(background),
    contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  const byte = (n: number) => Math.round(clamp(n)).toString(16).padStart(2, '0');
  const rgb = `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
  const hex = '#' + byte(r) + byte(g) + byte(b) + (a < 1 ? byte(a * 255) : '');
  return {
    text: `HEX: ${hex.toUpperCase()}\nRGB(A): rgba(${rgb}, ${round(a)})\nHSL(A): hsla(${round(hue)}, ${round(saturationHsl * 100)}%, ${round(light * 100)}%, ${round(a)})\nHSV: hsv(${round(hue)}, ${round(satHsv * 100)}%, ${round(max * 100)}%)\nCMYK: cmyk(${round(c * 100)}%, ${round(m * 100)}%, ${round(y * 100)}%, ${round(k * 100)}%)\n${locale === 'zh-CN' ? '相对于' : 'Contrast against'} ${input.background}: ${round(contrast)}:1`,
    swatch: hex,
    contrast
  };
}
export function diffTool(input: ToolInput): ToolResult {
  const before = boundedText(input.before, 200_000),
    after = boundedText(input.after, 200_000);
  const mode = input.mode;
  const options = { maxEditLength: 10000 };
  const segments =
    mode === 'chars'
      ? diffChars(before, after, options)
      : mode === 'words'
        ? diffWords(before, after, options)
        : diffLines(before, after, options);
  if (!segments) fail('Diff is too complex; use shorter input.', '差异过于复杂，请缩短输入。');
  const lineSegments = diffLines(before, after, options);
  if (!lineSegments) fail('Diff is too complex; use shorter input.', '差异过于复杂，请缩短输入。');
  return {
    text: createTwoFilesPatch('before', 'after', before, after),
    diff: segments,
    diffRows: buildDiffRows(lineSegments)
  };
}

function changedLines(value: string): string[] {
  const normalized = value.replace(/\r\n/g, '\n');
  if (!normalized) return [];
  return normalized.endsWith('\n') ? normalized.slice(0, -1).split('\n') : normalized.split('\n');
}

function buildDiffRows(segments: NonNullable<ReturnType<typeof diffLines>>) {
  const rows: { before?: DiffRowLine; after?: DiffRowLine }[] = [];
  let beforeLine = 1;
  let afterLine = 1;
  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index];
    if (!segment.added && !segment.removed) {
      for (const text of changedLines(segment.value)) {
        rows.push({
          before: { text, kind: 'context', line: beforeLine++ },
          after: { text, kind: 'context', line: afterLine++ }
        });
      }
      continue;
    }
    if (segment.removed && segments[index + 1]?.added) {
      const removed = changedLines(segment.value);
      const added = changedLines(segments[index + 1].value);
      const length = Math.max(removed.length, added.length);
      for (let line = 0; line < length; line += 1) {
        rows.push({
          before: removed[line]
            ? { text: removed[line], kind: 'removed', line: beforeLine++ }
            : undefined,
          after: added[line] ? { text: added[line], kind: 'added', line: afterLine++ } : undefined
        });
      }
      index += 1;
      continue;
    }
    for (const text of changedLines(segment.value)) {
      if (segment.removed) rows.push({ before: { text, kind: 'removed', line: beforeLine++ } });
      else rows.push({ after: { text, kind: 'added', line: afterLine++ } });
    }
  }
  return rows;
}
export async function qrTool(input: ToolInput): Promise<ToolResult> {
  const value = boundedText(input.input, 4000);
  if (!value) fail('Enter text or a URL.', '请输入文本或网址。');
  const width = integer(input.size, 128, 2048, 'Size');
  if (!/^#[\da-fA-F]{6}$/.test(input.foreground) || !/^#[\da-fA-F]{6}$/.test(input.background))
    fail('QR colors must use six-digit HEX.', '二维码颜色必须是六位十六进制。');
  const svg = await QRCode.toString(value, {
    type: 'svg',
    width,
    errorCorrectionLevel: input.level as 'L' | 'M' | 'Q' | 'H',
    color: { dark: input.foreground, light: input.background },
    margin: 2
  });
  return { text: value, media: { svg, filename: 'cs-toolset-qr.svg' } };
}
export function cronTool(input: ToolInput, locale: Locale = 'en'): ToolResult {
  const expression = boundedText(input.input, 200).trim();
  const parts = expression.split(/\s+/);
  if (parts.length !== 5 && parts.length !== 6)
    fail('Cron requires five or six fields.', 'Cron 表达式需要 5 或 6 个字段。');
  const count = integer(input.count, 1, 100, 'Executions');
  const zone = input.zone === 'utc' ? 'UTC' : Intl.DateTimeFormat().resolvedOptions().timeZone;
  const start = input.start ? new Date(input.start) : new Date();
  if (Number.isNaN(start.valueOf())) fail('Invalid start date.', '起算时间无效。');
  try {
    const cron = new Cron(expression, { timezone: zone });
    const runs = cron.nextRuns(count, start);
    const labels =
      locale === 'zh-CN'
        ? parts.length === 6
          ? ['秒', '分钟', '小时', '月中日', '月份', '星期']
          : ['分钟', '小时', '月中日', '月份', '星期']
        : parts.length === 6
          ? ['second', 'minute', 'hour', 'day of month', 'month', 'day of week']
          : ['minute', 'hour', 'day of month', 'month', 'day of week'];
    const explanation = parts.map((part, i) => `${labels[i]}: ${part}`).join(' · ');
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: zone,
      dateStyle: 'full',
      timeStyle: 'long'
    });
    return {
      text: `${explanation}\n${locale === 'zh-CN' ? '时区' : 'Timezone'}: ${zone}\n\n${runs.map((date, i) => `${i + 1}. ${formatter.format(date)}  |  ${date.toISOString()}`).join('\n')}`
    };
  } catch (e) {
    return fail(
      `Invalid Cron expression: ${e instanceof Error ? e.message : 'parse error'}`,
      'Cron 表达式无效。'
    );
  }
}
