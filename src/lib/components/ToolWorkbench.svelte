<script lang="ts">
  import { untrack } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import {
    AlertTriangle,
    Columns2,
    Copy,
    ChevronDown,
    Download,
    Eye,
    EyeOff,
    Image as ImageIcon,
    LoaderCircle,
    Maximize2,
    Play,
    RotateCcw,
    ShieldCheck,
    SlidersHorizontal,
    Terminal,
    Rows3,
    X
  } from '@lucide/svelte';
  import { codeLanguageFrom, ensureCodeLanguage, highlightCode } from '$lib/code';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import { t } from '$lib/i18n';
  import { getDefaults, runTool, toolFields, toolModeUi } from '$lib/tools';
  import { fromBase64, toBase64, toolErrorMessage } from '$lib/tools/common';
  import type { Locale, ToolInput, ToolMeta, ToolResult } from '$lib/types';

  const copyMessages = {
    updated: { en: 'Your result is ready.', 'zh-CN': '结果已更新。' },
    defaultsRestored: {
      en: 'Defaults restored and result cleared.',
      'zh-CN': '已恢复默认设置并清除结果。'
    },
    copied: { en: 'Result copied to your clipboard.', 'zh-CN': '结果已复制到剪贴板。' },
    imageTooLarge: { en: 'Image must be 2 MiB or smaller.', 'zh-CN': '图片不能超过 2 MiB。' },
    imageDownloaded: { en: 'Image download started.', 'zh-CN': '图片下载已开始。' },
    downloadStarted: { en: 'Download started.', 'zh-CN': '下载已开始。' },
    svgDownloaded: { en: 'SVG download started.', 'zh-CN': 'SVG 下载已开始。' },
    pngDownloaded: { en: 'PNG download started.', 'zh-CN': 'PNG 下载已开始。' },
    diffView: { en: 'Diff view', 'zh-CN': '差异视图' },
    inline: { en: 'Inline', 'zh-CN': '内联' },
    sideBySide: { en: 'Side by side', 'zh-CN': '并排' },
    viewFullscreen: { en: 'View diff full screen', 'zh-CN': '全屏查看差异' },
    added: { en: 'Added', 'zh-CN': '新增' },
    removed: { en: 'Removed', 'zh-CN': '删除' },
    diffResult: { en: 'Difference comparison', 'zh-CN': '差异比较结果' },
    splitDiffResult: { en: 'Side-by-side difference comparison', 'zh-CN': '并排差异比较结果' },
    original: { en: 'Original', 'zh-CN': '原始文本' },
    changed: { en: 'Changed', 'zh-CN': '修改后文本' },
    emptyResult: { en: '(Empty result)', 'zh-CN': '（空结果）' },
    structuredResult: {
      en: 'Structured result, select to copy',
      'zh-CN': '结构化结果，可选中复制'
    },
    fullscreenDiff: { en: 'Full-screen difference comparison', 'zh-CN': '全屏差异比较' },
    differenceComparison: { en: 'Difference comparison', 'zh-CN': '差异比较' },
    close: { en: 'Close', 'zh-CN': '关闭' },
    workspace: { en: 'Tool workspace', 'zh-CN': '工具工作区' },
    inputSettings: { en: 'Input & settings', 'zh-CN': '输入与设置' },
    configureInput: { en: 'Configure tool input', 'zh-CN': '配置工具输入' },
    hideValue: { en: 'Hide value', 'zh-CN': '隐藏内容' },
    showValue: { en: 'Show value', 'zh-CN': '显示内容' },
    chooseImage: {
      en: 'Choose a local image (up to 2 MiB)',
      'zh-CN': '选择本地图片（最大 2 MiB）'
    },
    jwtNotice: {
      en: 'Without a secret, decoding does not verify the signature. A valid signature alone does not establish trust. Secrets stay on this device.',
      'zh-CN': '未填写密钥时仅解码；验签成功也不代表签发者可信。密钥只在本机使用，不会保存。'
    },
    hashNotice: {
      en: 'MD5 and SHA-1 are for legacy compatibility only. Do not use them for security or password storage.',
      'zh-CN': 'MD5 和 SHA-1 仅适用于旧系统兼容，不适合安全保护或密码存储。'
    },
    working: { en: 'Working…', 'zh-CN': '处理中…' },
    runTool: { en: 'Run tool', 'zh-CN': '运行工具' },
    reset: { en: 'Reset', 'zh-CN': '重置' },
    localPrivacy: {
      en: 'Processed in your browser. Your input is never uploaded or saved.',
      'zh-CN': '在你的浏览器本地处理，输入不会被上传或保存。'
    },
    result: { en: 'Result', 'zh-CN': '结果' },
    characters: { en: 'characters', 'zh-CN': '字符' },
    line: { en: 'line', 'zh-CN': '行' },
    lines: { en: 'lines', 'zh-CN': '行' },
    downloadResult: { en: 'Download result', 'zh-CN': '下载结果' },
    colorPreview: { en: 'Color preview', 'zh-CN': '颜色预览' },
    contrast: { en: 'Contrast', 'zh-CN': '对比度' },
    aaLarge: { en: 'AA large text', 'zh-CN': '大字 AA' },
    belowAa: { en: 'Below AA', 'zh-CN': '未达标' },
    convertedImage: { en: 'Converted image preview', 'zh-CN': '转换后的图片预览' },
    bytes: { en: 'bytes', 'zh-CN': '字节' },
    downloadImage: { en: 'Download image', 'zh-CN': '下载图片' },
    qrImage: { en: 'Generated QR code', 'zh-CN': '生成的二维码' },
    downloadPng: { en: 'Download PNG', 'zh-CN': '下载 PNG' },
    downloadSvg: { en: 'Download SVG', 'zh-CN': '下载 SVG' },
    toolResult: { en: 'Tool result, select to copy', 'zh-CN': '工具结果，可选中复制' },
    ready: { en: 'Ready to use', 'zh-CN': '准备就绪' },
    copiedButton: { en: 'Copied!', 'zh-CN': '已复制' },
    copyAll: { en: 'Copy all', 'zh-CN': '复制全部' },
    readyHeading: { en: 'Ready when you are', 'zh-CN': '让灵感开始运行' },
    emptyHint: {
      en: 'Set up your input and run the tool. Your result will appear right here.',
      'zh-CN': '调整左侧的输入与设置，点击「运行工具」，结果就会显示在这里。'
    },
    localTag: { en: 'Private · Instant · Local', 'zh-CN': '私密 · 即时 · 本地' },
    pngFailure: {
      en: 'Could not create a PNG. Try downloading the SVG instead.',
      'zh-CN': '无法生成 PNG，请尝试下载 SVG。'
    },
    processingFailure: {
      en: 'Something went wrong. Check your input and try again.',
      'zh-CN': '处理失败，请检查输入后重试。'
    },
    clipboardUnavailable: {
      en: 'Clipboard access is unavailable. Select the result and copy it manually.',
      'zh-CN': '无法访问剪贴板，请选中结果并手动复制。'
    },
    unsupportedImage: {
      en: 'Only PNG, JPEG, GIF and WebP are supported.',
      'zh-CN': '仅支持 PNG、JPEG、GIF 与 WebP。'
    },
    useOutput: { en: 'Use output as input & switch', 'zh-CN': '将结果用作输入并切换方向' },
    switchDirection: { en: 'Switch direction', 'zh-CN': '切换方向' }
  } satisfies Record<string, Record<Locale, string>>;

  let { tool, locale }: { tool: ToolMeta; locale: Locale } = $props();
  let input = $state<ToolInput>(untrack(() => initialInput(tool.id)));
  let result = $state<ToolResult | null>(null);
  let error = $state('');
  let status = $state('');
  let busy = $state(false);
  let copied = $state(false);
  let revealPasswords = $state<Record<string, boolean>>({});
  let diffView = $state<'inline' | 'split'>('inline');
  let diffDialog: HTMLDialogElement;
  let diffSyntaxVersion = $state(0);
  let mediaUrl = $state('');
  let downloadingPng = $state(false);
  let operation = 0;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;
  type DiffPart = NonNullable<ToolResult['diff']>[number];
  type InlineDiffRow = { parts: DiffPart[]; kind: 'added' | 'removed' | 'context' };
  const fields = $derived(toolFields[tool.id]);
  const modeUi = $derived(toolModeUi[tool.id]?.[input.mode]);
  const visibleFields = $derived(fields.filter((field) => isFieldVisible(field)));
  const message = (key: keyof typeof copyMessages) => t(locale, copyMessages[key]);
  const lineCount = $derived(result ? result.text.split('\n').length : 0);
  const charCount = $derived(result ? Array.from(result.text).length : 0);
  const structuredLanguage = $derived(result?.structuredLanguage ?? 'plain');
  const diffLanguage = $derived(codeLanguageFrom(input.language ?? 'plain'));
  const inlineDiffRows = $derived(
    result?.diff ? buildInlineDiffRows(result.diff, input.mode === 'lines') : []
  );

  function buildInlineDiffRows(parts: DiffPart[], splitChangedLines: boolean): InlineDiffRow[] {
    const rows: InlineDiffRow[] = [];
    let current: DiffPart[] = [];
    let previousKind: InlineDiffRow['kind'] | undefined;
    const kindOf = (part: DiffPart): InlineDiffRow['kind'] =>
      part.added ? 'added' : part.removed ? 'removed' : 'context';
    const push = () => {
      if (!current.length) return;
      const kinds = new Set(current.map(kindOf));
      rows.push({
        parts: current,
        kind: kinds.size === 1 ? kindOf(current[0]) : 'context'
      });
      current = [];
      previousKind = undefined;
    };

    for (const part of parts) {
      const kind = kindOf(part);
      if (splitChangedLines && current.length && previousKind && previousKind !== kind) push();
      for (const fragment of part.value.replaceAll('\r\n', '\n').split(/(\n)/)) {
        if (fragment === '\n') {
          push();
        } else if (fragment) {
          current.push({ ...part, value: fragment });
          previousKind = kind;
        }
      }
    }
    push();
    return rows;
  }

  function highlightedDiffLine(value: string | undefined, _version: number) {
    return value ? highlightCode(value, diffLanguage) || ' ' : ' ';
  }

  $effect(() => {
    const id = tool.id;
    input = untrack(() => initialInput(id));
    if (browser) untrack(applyModeFromUrl);
    result = null;
    error = '';
    status = '';
    busy = false;
    copied = false;
    revealPasswords = {};
    diffView = 'inline';
    operation += 1;
  });

  $effect(() => {
    if (!result?.diff) return;
    let active = true;
    ensureCodeLanguage(diffLanguage).then(() => {
      if (active) diffSyntaxVersion += 1;
    });
    return () => {
      active = false;
    };
  });

  $effect(() => {
    const svg = result?.media?.svg;
    if (!svg) {
      mediaUrl = '';
      return;
    }
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    mediaUrl = url;
    return () => URL.revokeObjectURL(url);
  });

  $effect(() => () => {
    if (copyTimer) clearTimeout(copyTimer);
    operation += 1;
  });

  async function execute(event: SubmitEvent) {
    event.preventDefault();
    if (busy) return;
    const currentOperation = ++operation;
    busy = true;
    error = '';
    status = '';
    copied = false;
    try {
      const next = await runTool(tool.id, { ...input }, locale);
      if (currentOperation !== operation) return;
      result = next;
      status = message('updated');
    } catch (cause) {
      if (currentOperation !== operation) return;
      error = toolErrorMessage(cause, locale);
    } finally {
      if (currentOperation === operation) busy = false;
    }
  }

  function reset() {
    operation += 1;
    input = untrack(() => initialInput(tool.id));
    result = null;
    error = '';
    status = message('defaultsRestored');
    busy = false;
    copied = false;
    revealPasswords = {};
  }

  function isFieldVisible(field: (typeof fields)[number]) {
    return Object.entries(field.visibleWhen ?? {}).every(([key, expected]) => {
      const values = Array.isArray(expected) ? expected : [expected];
      return values.includes(input[key]);
    });
  }

  function fieldLabel(field: (typeof fields)[number]) {
    return field.key === 'input' && modeUi ? modeUi.sourceLabel[locale] : field.label[locale];
  }

  function updateField(key: string, value: string) {
    const previous = key === 'mode' ? toolModeUi[tool.id]?.[input.mode] : undefined;
    input[key] = value;
    if (key !== 'mode') return;
    const next = toolModeUi[tool.id]?.[value];
    if (next?.example && (!input.input || input.input === previous?.example))
      input.input = next.example;
    if (next) {
      const query = [
        ...[...page.url.searchParams].filter(([name]) => name !== 'mode'),
        ['mode', value]
      ]
        .map(([name, entry]) => `${encodeURIComponent(name)}=${encodeURIComponent(entry)}`)
        .join('&');
      void goto(`${page.url.pathname}?${query}`, {
        keepFocus: true,
        noScroll: true,
        replaceState: true
      });
    }
    result = null;
    error = '';
    status = '';
  }

  function initialInput(id: ToolMeta['id']) {
    return getDefaults(id);
  }

  function applyModeFromUrl() {
    const selected = page.url.searchParams.get('mode');
    const presentation = selected ? toolModeUi[tool.id]?.[selected] : undefined;
    if (!selected || !presentation) return;

    input.mode = selected;
    if (presentation.example) input.input = presentation.example;
  }

  function useOutputAsInput() {
    if (!result || !modeUi?.reverse) return;
    input.input = result.text;
    updateField('mode', modeUi.reverse);
    input.input = result.text;
    result = null;
    status = message('switchDirection');
  }

  function swapRadix() {
    const source = input.from;
    input.from = input.to;
    input.to = source;
    if (result) input.input = result.text;
    result = null;
    status = message('switchDirection');
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.text);
      copied = true;
      status = message('copied');
      if (copyTimer) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => {
        copied = false;
      }, 2200);
    } catch {
      status = message('clipboardUnavailable');
    }
  }

  function openDiffFullscreen() {
    diffDialog?.showModal();
  }

  function saveBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function loadImage(event: Event) {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      error = message('imageTooLarge');
      return;
    }
    if (!['image/png', 'image/jpeg', 'image/gif', 'image/webp'].includes(file.type)) {
      error = message('unsupportedImage');
      return;
    }
    const encoded = toBase64(new Uint8Array(await file.arrayBuffer()));
    input.input = `data:${file.type};base64,${encoded}`;
    updateField('mode', 'encode');
    error = '';
  }

  function downloadImage() {
    if (!result?.image) return;
    const bytes = fromBase64(result.image.dataUrl.split(',')[1]);
    saveBlob(
      new Blob([Uint8Array.from(bytes)], { type: result.image.mime }),
      result.image.filename
    );
    status = message('imageDownloaded');
  }

  function downloadText() {
    if (!result) return;
    let extension = tool.id === 'json' ? 'json' : 'txt';
    if (tool.id === 'yaml') {
      try {
        JSON.parse(result.text);
        extension = 'json';
      } catch {
        extension = 'yaml';
      }
    }
    saveBlob(
      new Blob([result.text], { type: 'text/plain;charset=utf-8' }),
      `cs-toolset-${tool.id}.${extension}`
    );
    status = message('downloadStarted');
  }

  function downloadSvg() {
    if (!result?.media) return;
    saveBlob(
      new Blob([result.media.svg], { type: 'image/svg+xml;charset=utf-8' }),
      result.media.filename.replace(/\.[^.]+$/, '') + '.svg'
    );
    status = message('svgDownloaded');
  }

  async function downloadPng() {
    if (!result?.media || !mediaUrl || downloadingPng) return;
    const source = mediaUrl;
    const filename = result.media.filename.replace(/\.[^.]+$/, '') + '.png';
    downloadingPng = true;
    try {
      const image = new window.Image();
      image.src = source;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth || 512;
      canvas.height = image.naturalHeight || 512;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      context.drawImage(image, 0, 0);
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (value) => (value ? resolve(value) : reject(new Error('PNG unavailable'))),
          'image/png'
        );
      });
      saveBlob(blob, filename);
      status = message('pngDownloaded');
    } catch {
      status = message('pngFailure');
    } finally {
      downloadingPng = false;
    }
  }
</script>

<div class="workbench" aria-label={message('workspace')}>
  <form class="panel input-panel" onsubmit={execute}>
    <div class="panel-heading">
      <div class="heading-label">
        <SlidersHorizontal size={17} strokeWidth={1.8} />
        <h2>{message('inputSettings')}</h2>
      </div>
      <span class="step-label">01</span>
    </div>
    {#if modeUi}<p class="mode-summary" aria-live="polite">
        {modeUi.sourceLabel[locale]} <span aria-hidden="true">→</span>
        {modeUi.targetLabel[locale]}
      </p>{/if}

    <fieldset disabled={busy}>
      <legend class="sr-only">{message('configureInput')}</legend>
      <div class="fields">
        {#each visibleFields as field (field.key)}
          {#if field.type === 'checkbox'}
            <div class="field checkbox-field">
              <label class="checkbox-label" for={`input-${tool.id}-${field.key}`}>
                <input
                  id={`input-${tool.id}-${field.key}`}
                  type="checkbox"
                  checked={input[field.key] === 'true'}
                  onchange={(event) => {
                    input[field.key] = String(event.currentTarget.checked);
                  }}
                  aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                />
                <span>{field.label[locale]}</span>
              </label>
              {#if field.hint}<p class="field-hint" id={`hint-${tool.id}-${field.key}`}>
                  {field.hint[locale]}
                </p>{/if}
            </div>
          {:else}
            <div class="field" class:wide={field.type === 'textarea'}>
              <label class="field-label" for={`input-${tool.id}-${field.key}`}
                >{fieldLabel(field)}</label
              >
              {#if field.type === 'textarea'}
                <textarea
                  id={`input-${tool.id}-${field.key}`}
                  bind:value={input[field.key]}
                  rows={tool.id === 'diff' ? 7 : 9}
                  spellcheck="false"
                  autocomplete="off"
                  autocapitalize="off"
                  aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                ></textarea>
              {:else if field.type === 'select'}
                <div class="select-control">
                  <select
                    id={`input-${tool.id}-${field.key}`}
                    value={input[field.key]}
                    onchange={(event) => updateField(field.key, event.currentTarget.value)}
                    aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                  >
                    {#each field.options ?? [] as option (option.value)}<option value={option.value}
                        >{option.label[locale]}</option
                      >{/each}
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              {:else if field.type === 'password'}
                <div class="password-wrap">
                  <input
                    id={`input-${tool.id}-${field.key}`}
                    name={`tool-${tool.id}-${field.key}`}
                    type={revealPasswords[field.key] ? 'text' : 'password'}
                    bind:value={input[field.key]}
                    autocomplete="new-password"
                    spellcheck="false"
                    autocapitalize="off"
                    data-1p-ignore="true"
                    data-bwignore="true"
                    data-lpignore="true"
                    aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                  />
                  <button
                    class="reveal-button"
                    type="button"
                    aria-label={message(revealPasswords[field.key] ? 'hideValue' : 'showValue')}
                    aria-pressed={!!revealPasswords[field.key]}
                    onclick={() => {
                      revealPasswords[field.key] = !revealPasswords[field.key];
                    }}
                  >
                    {#if revealPasswords[field.key]}<EyeOff size={17} />{:else}<Eye
                        size={17}
                      />{/if}
                  </button>
                </div>
              {:else if field.type === 'number'}
                <input
                  id={`input-${tool.id}-${field.key}`}
                  type="number"
                  value={input[field.key]}
                  oninput={(event) => {
                    input[field.key] = event.currentTarget.value;
                  }}
                  min={field.min}
                  max={field.max}
                  step={field.step ?? 'any'}
                  aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                />
              {:else if field.type === 'color'}
                <div class="color-input">
                  <input
                    id={`input-${tool.id}-${field.key}`}
                    type="color"
                    bind:value={input[field.key]}
                    aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                  />
                  <span>{input[field.key]}</span>
                </div>
              {:else}
                <input
                  id={`input-${tool.id}-${field.key}`}
                  type="text"
                  bind:value={input[field.key]}
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="false"
                  aria-describedby={field.hint ? `hint-${tool.id}-${field.key}` : undefined}
                />
              {/if}
              {#if field.hint}<p class="field-hint" id={`hint-${tool.id}-${field.key}`}>
                  {field.hint[locale]}
                </p>{/if}
            </div>
          {/if}
        {/each}
      </div>
    </fieldset>

    {#if tool.id === 'imageBase64' && input.mode === 'encode'}<div class="upload-field">
        <label for="image-upload">{message('chooseImage')}</label>
        <input
          id="image-upload"
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          onchange={loadImage}
        />
      </div>{/if}

    {#if tool.id === 'jwt'}
      <div class="notice">
        <AlertTriangle size={17} />
        <p>
          {message('jwtNotice')}
        </p>
      </div>
    {:else if tool.id === 'hash'}
      <div class="notice">
        <AlertTriangle size={17} />
        <p>
          {message('hashNotice')}
        </p>
      </div>
    {/if}

    <div class="input-actions">
      <button class="button primary" type="submit" disabled={busy}>
        {#if busy}<LoaderCircle size={17} class="spinner" />{:else}<Play
            size={16}
            fill="currentColor"
          />{/if}
        {message(busy ? 'working' : 'runTool')}
      </button>
      <button class="button secondary" type="button" onclick={reset}
        ><RotateCcw size={16} />{message('reset')}</button
      >
      {#if tool.id === 'radix'}<button
          class="button secondary"
          type="button"
          onclick={swapRadix}
          disabled={!result}><RotateCcw size={16} />{message('switchDirection')}</button
        >{/if}
    </div>
    {#if error}<div class="error-box" role="alert">
        <AlertTriangle size={18} />
        <p>{error}</p>
      </div>{/if}
    <div class="privacy-note">
      <ShieldCheck size={14} /><span>{message('localPrivacy')}</span>
    </div>
  </form>

  <section class="panel result-panel" aria-labelledby="result-heading" aria-busy={busy}>
    <div class="panel-heading">
      <div class="heading-label">
        <Terminal size={18} strokeWidth={1.8} />
        <h2 id="result-heading">{modeUi ? modeUi.targetLabel[locale] : message('result')}</h2>
      </div>
      <span class="step-label">02</span>
    </div>

    {#if result}
      <div class="result-toolbar">
        <span class="result-count"
          >{charCount.toLocaleString(locale)}
          {message('characters')}<span aria-hidden="true"> · </span>{lineCount.toLocaleString(
            locale
          )}
          {message(lineCount === 1 ? 'line' : 'lines')}</span
        >
        {#if !result.media}<div class="result-actions">
            <button
              class="icon-button"
              type="button"
              onclick={downloadText}
              title={message('downloadResult')}
              aria-label={message('downloadResult')}><Download size={17} /></button
            >
          </div>{/if}
      </div>

      {#if result.swatch}
        <div class="color-result">
          <div
            class="swatch"
            style:background={result.swatch}
            role="img"
            aria-label={`${message('colorPreview')}: ${result.swatch}`}
          ></div>
          <div>
            <span class="color-value">{result.swatch}</span>
            {#if result.contrast !== undefined}<span class="contrast-value"
                >{message('contrast')}
                {result.contrast.toFixed(2)}:1
                <span class="contrast-badge" class:passing={result.contrast >= 4.5}
                  >{result.contrast >= 7
                    ? 'AAA'
                    : result.contrast >= 4.5
                      ? 'AA'
                      : result.contrast >= 3
                        ? message('aaLarge')
                        : message('belowAa')}</span
                ></span
              >{/if}
          </div>
        </div>
      {/if}

      {#if result.image}<div class="image-result">
          <img src={result.image.dataUrl} alt={message('convertedImage')} />
          <div>
            <span
              >{result.image.mime} · {result.image.bytes.toLocaleString(locale)}
              {message('bytes')}</span
            ><button type="button" class="button secondary" onclick={downloadImage}
              ><Download size={16} />{message('downloadImage')}</button
            >
          </div>
        </div>{/if}

      {#if result.media}
        <div class="qr-preview">
          {#if mediaUrl}<img
              src={mediaUrl}
              alt={message('qrImage')}
              width="256"
              height="256"
            />{/if}
        </div>
        <div class="media-actions">
          <button
            class="button secondary"
            type="button"
            onclick={downloadPng}
            disabled={downloadingPng}
            >{#if downloadingPng}<LoaderCircle size={16} class="spinner" />{:else}<ImageIcon
                size={16}
              />{/if}{message('downloadPng')}</button
          >
          <button class="button secondary" type="button" onclick={downloadSvg}
            ><Download size={16} />{message('downloadSvg')}</button
          >
        </div>
      {/if}

      {#if result.diff}
        <div class="diff-toolbar">
          <div class="diff-view-switch" aria-label={message('diffView')}>
            <button
              type="button"
              class:active={diffView === 'inline'}
              aria-pressed={diffView === 'inline'}
              onclick={() => (diffView = 'inline')}><Rows3 size={15} />{message('inline')}</button
            >
            <button
              type="button"
              class:active={diffView === 'split'}
              aria-pressed={diffView === 'split'}
              onclick={() => (diffView = 'split')}
              ><Columns2 size={15} />{message('sideBySide')}</button
            >
          </div>
          <button
            class="icon-button diff-fullscreen"
            type="button"
            onclick={openDiffFullscreen}
            title={message('viewFullscreen')}
            aria-label={message('viewFullscreen')}><Maximize2 size={16} /></button
          >
          <span class="diff-legend"
            ><span class="add-label">+ {message('added')}</span><span class="remove-label"
              >− {message('removed')}</span
            ></span
          >
        </div>
      {/if}

      {#if result.diff && diffView === 'inline'}
        <div
          class="result-output diff-output diff-inline"
          role="textbox"
          aria-readonly="true"
          aria-multiline="true"
          tabindex="0"
          aria-label={message('diffResult')}
        >
          {#each inlineDiffRows as row}
            <div
              class="diff-inline-line"
              class:diff-added={row.kind === 'added'}
              class:diff-removed={row.kind === 'removed'}
            >
              <code
                >{#each row.parts as part}<span
                    class:added={part.added}
                    class:removed={part.removed}>{part.value}</span
                  >{/each}</code
              >
            </div>
          {/each}
        </div>
      {:else if result.diff && diffView === 'split'}
        <div
          class="result-output diff-output diff-split"
          data-syntax-version={diffSyntaxVersion}
          aria-label={message('splitDiffResult')}
        >
          <div class="diff-split-head" aria-hidden="true">
            <span>{message('original')}</span><span>{message('changed')}</span>
          </div>
          {#each result.diffRows ?? [] as row}
            <div class="diff-split-row">
              <div
                class:added={row.before?.kind === 'added'}
                class:removed={row.before?.kind === 'removed'}
                class="diff-side-line"
                data-line={row.before?.line}
              >
                <code class="code-syntax"
                  >{@html highlightedDiffLine(row.before?.text, diffSyntaxVersion)}</code
                >
              </div>
              <div
                class:added={row.after?.kind === 'added'}
                class:removed={row.after?.kind === 'removed'}
                class="diff-side-line"
                data-line={row.after?.line}
              >
                <code class="code-syntax"
                  >{@html highlightedDiffLine(row.after?.text, diffSyntaxVersion)}</code
                >
              </div>
            </div>
          {/each}
        </div>
      {:else if structuredLanguage !== 'plain'}
        <div class="result-output structured-output">
          <CodeBlock
            text={result.text || message('emptyResult')}
            language={structuredLanguage}
            label={message('structuredResult')}
          />
        </div>
      {:else}
        <div
          class="result-output"
          class:media-source={!!result.media}
          role="textbox"
          aria-readonly="true"
          aria-multiline="true"
          tabindex="0"
          aria-label={message('toolResult')}
        >
          <code>{result.text || message('emptyResult')}</code>
        </div>
      {/if}
      <div class="result-footer">
        <span class="ready-dot"></span>{message('ready')}<button
          type="button"
          class="text-button"
          onclick={copyResult}
          >{message(copied ? 'copiedButton' : 'copyAll')}<Copy size={13} /></button
        >
        {#if modeUi?.reverse}<button type="button" class="text-button" onclick={useOutputAsInput}
            >{message('useOutput')}<RotateCcw size={13} /></button
          >{/if}
      </div>
    {:else}
      <div class="empty-result">
        <div class="empty-symbol"><Terminal size={30} strokeWidth={1.3} /></div>
        <h3>{message('readyHeading')}</h3>
        <p>
          {message('emptyHint')}
        </p>
        <span class="empty-tag"><ShieldCheck size={13} />{message('localTag')}</span>
      </div>
    {/if}
    <p class="status-message" role="status" aria-live="polite" aria-atomic="true">{status}</p>
  </section>
</div>

<dialog bind:this={diffDialog} class="diff-dialog" aria-label={message('fullscreenDiff')}>
  <div class="diff-dialog-heading">
    <strong>{message('differenceComparison')}</strong>
    <div>
      <div class="diff-view-switch" aria-label={message('diffView')}>
        <button
          type="button"
          class:active={diffView === 'inline'}
          onclick={() => (diffView = 'inline')}><Rows3 size={15} />{message('inline')}</button
        >
        <button
          type="button"
          class:active={diffView === 'split'}
          onclick={() => (diffView = 'split')}><Columns2 size={15} />{message('sideBySide')}</button
        >
      </div>
      <button
        class="icon-button"
        type="button"
        onclick={() => diffDialog.close()}
        aria-label={message('close')}><X size={18} /></button
      >
    </div>
  </div>
  {#if result?.diff && diffView === 'inline'}
    <div class="diff-dialog-content diff-output diff-inline code-syntax">
      {#each inlineDiffRows as row}
        <div
          class="diff-inline-line"
          class:diff-added={row.kind === 'added'}
          class:diff-removed={row.kind === 'removed'}
        >
          <code
            >{#each row.parts as part}<span class:added={part.added} class:removed={part.removed}
                >{part.value}</span
              >{/each}</code
          >
        </div>
      {/each}
    </div>
  {:else if result?.diff && diffView === 'split'}
    <div class="diff-dialog-content diff-output diff-split" data-syntax-version={diffSyntaxVersion}>
      <div class="diff-split-head" aria-hidden="true">
        <span>{message('original')}</span><span>{message('changed')}</span>
      </div>
      {#each result.diffRows ?? [] as row}
        <div class="diff-split-row">
          <div
            class:removed={row.before?.kind === 'removed'}
            class="diff-side-line"
            data-line={row.before?.line}
          >
            <code class="code-syntax"
              >{@html highlightedDiffLine(row.before?.text, diffSyntaxVersion)}</code
            >
          </div>
          <div
            class:added={row.after?.kind === 'added'}
            class="diff-side-line"
            data-line={row.after?.line}
          >
            <code class="code-syntax"
              >{@html highlightedDiffLine(row.after?.text, diffSyntaxVersion)}</code
            >
          </div>
        </div>
      {/each}
    </div>
  {/if}
</dialog>

<style>
  .workbench {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
    gap: 22px;
  }
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius, 18px);
    min-width: 0;
    overflow: hidden;
  }
  .panel-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 19px 23px;
    border-bottom: 1px solid var(--border);
  }
  .mode-summary {
    margin: 0;
    padding: 10px 23px;
    border-bottom: 1px solid var(--border);
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 13px;
    font-weight: 650;
  }
  .mode-summary span {
    padding: 0 6px;
  }
  .heading-label {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .heading-label > :global(svg) {
    color: var(--accent);
  }
  h2 {
    font-size: 14px;
    font-weight: 650;
    letter-spacing: -0.015em;
    margin: 0;
    color: var(--text);
  }
  .step-label {
    font-size: 11px;
    color: var(--muted);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    opacity: 0.7;
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 23px 23px 0;
    min-width: 0;
  }
  .fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 19px 16px;
  }
  .field {
    min-width: 0;
  }
  .field.wide {
    grid-column: 1 / -1;
  }
  .field-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 9px;
    color: var(--text);
  }
  input,
  select,
  textarea,
  button {
    font: inherit;
  }
  input:not([type='checkbox'], [type='color']),
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--bg);
    color: var(--text);
    min-height: 44px;
    padding: 10px 12px;
    font-size: 14px;
    transition:
      border-color 160ms,
      box-shadow 160ms;
  }
  textarea {
    resize: vertical;
    min-height: 130px;
    max-height: 650px;
    display: block;
    font:
      14px/1.7 ui-monospace,
      SFMono-Regular,
      Consolas,
      'Liberation Mono',
      monospace;
    tab-size: 2;
  }
  select {
    appearance: none;
    padding-right: 38px;
    cursor: pointer;
  }
  .select-control {
    position: relative;
  }
  .select-control :global(svg) {
    position: absolute;
    top: 50%;
    right: 13px;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    transition: color 160ms ease;
  }
  .select-control:focus-within :global(svg) {
    color: var(--accent);
  }
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.65;
  }
  .field-hint {
    margin: 7px 0 0;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .upload-field {
    margin: 22px 23px 0;
    padding: 15px;
    display: grid;
    gap: 9px;
    border: 1px dashed var(--border);
    border-radius: 9px;
    color: var(--text);
    font-size: 14px;
  }
  .upload-field input {
    max-width: 100%;
    font-size: 13px;
  }
  .image-result {
    margin: 0 23px 18px;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 15px;
    display: grid;
    gap: 12px;
    background: var(--bg);
  }
  .image-result img {
    display: block;
    max-width: 100%;
    max-height: 280px;
    margin: auto;
    object-fit: contain;
  }
  .image-result > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    color: var(--muted);
    font-size: 13px;
  }
  .checkbox-field {
    align-self: start;
  }
  .checkbox-label {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
    margin: 0;
    accent-color: var(--accent);
    cursor: pointer;
  }
  .checkbox-field .field-hint {
    margin: 0 0 0 25px;
  }
  .password-wrap {
    position: relative;
  }
  .password-wrap input {
    padding-right: 44px;
  }
  .reveal-button {
    position: absolute;
    right: 1px;
    top: 1px;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border: 0;
    border-radius: 8px;
    color: var(--muted);
    background: transparent;
    cursor: pointer;
  }
  .color-input {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 4px 9px;
    box-sizing: border-box;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--bg);
  }
  .color-input input {
    border: 0;
    width: 30px;
    height: 30px;
    padding: 0;
    background: transparent;
    cursor: pointer;
  }
  .color-input span {
    font:
      12px ui-monospace,
      SFMono-Regular,
      Consolas,
      monospace;
    color: var(--text);
  }
  .input-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 23px 23px 0;
  }
  .button {
    min-height: 44px;
    padding: 10px 17px;
    display: inline-flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 160ms,
      transform 160ms,
      border-color 160ms;
  }
  .button:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  .primary {
    background: var(--accent);
    color: #fff;
    border: 1px solid var(--accent);
    box-shadow: 0 3px 9px color-mix(in srgb, var(--accent) 16%, transparent);
  }
  .primary:hover:not(:disabled) {
    background: color-mix(in srgb, var(--accent) 88%, #000);
  }
  .secondary {
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--border);
  }
  .secondary:hover:not(:disabled) {
    background: var(--surface-2);
    border-color: var(--muted);
  }
  button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  button:focus-visible,
  .result-output:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }
  .privacy-note {
    padding: 19px 23px;
    display: flex;
    align-items: flex-start;
    gap: 7px;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.65;
  }
  .privacy-note :global(svg) {
    flex-shrink: 0;
    margin-top: 1px;
    color: var(--success);
  }
  .notice,
  .error-box {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    padding: 12px 13px;
    margin: 20px 23px 0;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: var(--surface-2);
  }
  .notice p,
  .error-box p {
    margin: 0;
    font-size: 13px;
    line-height: 1.65;
    overflow-wrap: anywhere;
  }
  .notice {
    color: var(--muted);
  }
  .notice :global(svg),
  .error-box :global(svg) {
    flex-shrink: 0;
    margin-top: 1px;
  }
  .error-box {
    background: color-mix(in srgb, var(--danger) 7%, var(--surface));
    border-color: color-mix(in srgb, var(--danger) 25%, var(--border));
    color: var(--danger);
  }
  .result-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    padding: 8px 13px 8px 23px;
  }
  .result-count {
    color: var(--muted);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }
  .result-actions {
    display: flex;
    gap: 2px;
  }
  .icon-button {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
  }
  .icon-button:hover,
  .reveal-button:hover {
    background: var(--surface-2);
    color: var(--text);
  }
  .result-output {
    margin: 0 23px 20px;
    padding: 17px;
    min-height: 245px;
    max-height: 550px;
    overflow: auto;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    tab-size: 2;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg);
    color: var(--text);
    font:
      14px/1.75 ui-monospace,
      SFMono-Regular,
      Consolas,
      'Liberation Mono',
      monospace;
  }
  .result-output code {
    font: inherit;
  }
  .media-source {
    min-height: 0;
    max-height: 140px;
    font-size: 11px;
  }
  .result-footer {
    display: flex;
    align-items: center;
    gap: 6px;
    border-top: 1px solid var(--border);
    min-height: 50px;
    padding: 3px 20px 3px 23px;
    color: var(--muted);
    font-size: 12px;
  }
  .ready-dot {
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: var(--success);
  }
  .text-button {
    display: inline-flex;
    gap: 7px;
    align-items: center;
    min-height: 44px;
    margin-left: auto;
    padding: 0 3px;
    color: var(--muted);
    font-size: 13px;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  .text-button:hover {
    color: var(--accent);
  }
  .empty-result {
    padding: 66px 30px 64px;
    min-height: 365px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-image: radial-gradient(var(--border) 0.65px, transparent 0.65px);
    background-size: 18px 18px;
  }
  .empty-symbol {
    width: 65px;
    height: 65px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 17px;
    background: var(--surface);
    color: var(--muted);
    box-shadow: 0 6px 18px #00000005;
    margin-bottom: 18px;
  }
  .empty-result h3 {
    margin: 0 0 9px;
    color: var(--text);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.015em;
  }
  .empty-result p {
    margin: 0;
    max-width: 290px;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.8;
  }
  .empty-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 24px;
    font-size: 10px;
    color: var(--muted);
  }
  .status-message {
    font-size: 11px;
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
    padding: 0 23px;
  }
  .status-message:not(:empty) {
    border-top: 1px solid var(--border);
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .color-result {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 3px 23px 20px;
  }
  .swatch {
    width: 62px;
    height: 62px;
    flex-shrink: 0;
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  .color-value {
    display: block;
    font:
      13px ui-monospace,
      SFMono-Regular,
      Consolas,
      monospace;
    color: var(--text);
  }
  .contrast-value {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
    font-size: 10px;
    color: var(--muted);
  }
  .contrast-badge {
    padding: 3px 6px;
    border-radius: 5px;
    color: var(--danger);
    background: color-mix(in srgb, var(--danger) 9%, transparent);
    font-weight: 600;
  }
  .contrast-badge.passing {
    color: var(--success);
    background: color-mix(in srgb, var(--success) 9%, transparent);
  }
  .qr-preview {
    display: grid;
    place-items: center;
    min-height: 285px;
    margin: 0 23px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: repeating-conic-gradient(#eceef1 0% 25%, #fff 0% 50%) 50% / 16px 16px;
  }
  .qr-preview img {
    display: block;
    max-width: 100%;
    width: 256px;
    height: auto;
    image-rendering: pixelated;
  }
  .media-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 9px;
    padding: 18px 23px;
  }
  .diff-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin: 0 23px 10px;
  }
  .diff-view-switch {
    display: inline-flex;
    align-items: center;
    padding: 3px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
  }
  .diff-view-switch button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    min-height: 29px;
    border: 0;
    border-radius: 5px;
    padding: 0 8px;
    background: transparent;
    color: var(--muted);
    font-size: 11px;
    cursor: pointer;
  }
  .diff-view-switch button.active {
    background: var(--accent-soft);
    color: var(--accent);
  }
  .diff-fullscreen {
    width: 34px;
    height: 34px;
  }
  .diff-legend {
    display: flex;
    gap: 9px;
    margin-left: auto;
    font-size: 10px;
  }
  .add-label {
    color: var(--success);
  }
  .remove-label {
    color: var(--danger);
  }
  .diff-output .added {
    background: color-mix(in srgb, var(--success) 15%, transparent);
    color: var(--success);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
  .diff-output .removed {
    background: color-mix(in srgb, var(--danger) 12%, transparent);
    color: var(--danger);
    text-decoration: line-through;
  }
  .diff-inline {
    padding: 0;
    min-height: 0;
    overflow: auto;
    white-space: normal;
  }
  .diff-inline-line {
    display: grid;
    grid-template-columns: 2ch minmax(0, 1fr);
    gap: 10px;
    min-height: 26px;
    padding: 2px 13px;
  }
  .diff-inline-line::before {
    content: ' ';
    color: var(--muted);
    text-align: center;
    user-select: none;
  }
  .diff-inline-line.diff-added::before {
    content: '+';
    color: var(--success);
  }
  .diff-inline-line.diff-removed::before {
    content: '−';
    color: var(--danger);
  }
  .diff-inline-line.diff-added {
    background: color-mix(in srgb, var(--success) 7%, transparent);
  }
  .diff-inline-line.diff-removed {
    background: color-mix(in srgb, var(--danger) 6%, transparent);
  }
  .diff-inline-line code {
    overflow: visible;
    font: inherit;
    white-space: pre;
  }
  .structured-output {
    padding: 17px 0;
  }
  .structured-output :global(.code-block) {
    max-height: 516px;
    padding: 0 17px;
  }
  .diff-split {
    padding: 0;
    min-height: 0;
    overflow: auto;
    white-space: normal;
  }
  .diff-split-head,
  .diff-split-row {
    display: grid;
    grid-template-columns: minmax(260px, 1fr) minmax(260px, 1fr);
    min-width: 520px;
  }
  .diff-split-head {
    position: sticky;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid var(--border);
    background: var(--surface-2);
    color: var(--muted);
    font-size: 11px;
    font-weight: 650;
  }
  .diff-split-head span {
    padding: 9px 13px;
  }
  .diff-split-head span + span,
  .diff-side-line + .diff-side-line {
    border-left: 1px solid var(--border);
  }
  .diff-side-line {
    display: grid;
    grid-template-columns: 3ch minmax(0, 1fr);
    gap: 10px;
    min-height: 25px;
    padding: 2px 12px;
  }
  .diff-side-line code {
    overflow: visible;
    font: inherit;
    white-space: pre;
  }
  .diff-side-line::before {
    content: attr(data-line);
    color: var(--muted);
    opacity: 0.65;
    text-align: right;
    user-select: none;
  }
  .diff-dialog {
    width: min(1400px, calc(100vw - 32px));
    height: min(900px, calc(100vh - 32px));
    max-width: none;
    max-height: none;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface);
    color: var(--text);
    box-shadow: 0 24px 70px rgb(0 0 0 / 0.28);
  }
  .diff-dialog::backdrop {
    background: rgb(12 25 21 / 0.62);
  }
  .diff-dialog-heading {
    min-height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 10px 14px 10px 20px;
    border-bottom: 1px solid var(--border);
  }
  .diff-dialog-heading > div {
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .diff-dialog-content {
    height: calc(100% - 58px);
    margin: 0;
    border: 0;
    border-radius: 0;
    max-height: none;
    min-height: 0;
    padding: 18px 20px;
    overflow: auto;
    white-space: pre;
    font:
      14px/1.75 ui-monospace,
      SFMono-Regular,
      Consolas,
      'Liberation Mono',
      monospace;
  }
  .diff-dialog-content.diff-split {
    padding: 0;
  }
  .diff-dialog-content.diff-inline {
    white-space: normal;
  }
  :global(.spinner) {
    animation: spin 800ms linear infinite;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (max-width: 850px) {
    .workbench {
      grid-template-columns: minmax(0, 1fr);
      gap: 18px;
    }
    .empty-result {
      min-height: 290px;
      padding: 40px 24px;
    }
    .result-output {
      min-height: 190px;
    }
    .media-source {
      min-height: 0;
    }
  }
  @media (max-width: 440px) {
    .panel-heading {
      padding: 17px;
    }
    fieldset {
      padding: 18px 17px 0;
    }
    .fields {
      gap: 16px 12px;
    }
    .input-actions {
      padding: 19px 17px 0;
    }
    .privacy-note {
      padding: 17px;
    }
    .notice,
    .error-box {
      margin-left: 17px;
      margin-right: 17px;
    }
    .result-toolbar {
      padding-left: 17px;
      padding-right: 7px;
    }
    .result-output {
      margin-left: 17px;
      margin-right: 17px;
      padding: 13px;
    }
    .result-footer {
      padding-left: 17px;
      padding-right: 14px;
    }
    .color-result {
      padding-left: 17px;
      padding-right: 17px;
    }
    .qr-preview {
      margin-left: 17px;
      margin-right: 17px;
    }
    .diff-toolbar {
      margin-left: 17px;
      margin-right: 17px;
    }
    .field-label {
      font-size: 14px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
    }
    .button:hover:not(:disabled) {
      transform: none;
    }
    :global(.spinner) {
      animation: none;
    }
  }
</style>
