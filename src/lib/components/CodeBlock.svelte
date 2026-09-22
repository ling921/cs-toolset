<script lang="ts">
  import { ensureCodeLanguage, highlightCode, type CodeLanguage } from '$lib/code';

  let {
    text,
    language,
    lineNumbers = true,
    label
  }: { text: string; language: CodeLanguage; lineNumbers?: boolean; label: string } = $props();

  const lines = $derived(text.split('\n'));
  let syntaxVersion = $state(0);

  function highlightedLine(value: string, currentLanguage: CodeLanguage, _version: number) {
    return highlightCode(value, currentLanguage) || ' ';
  }

  $effect(() => {
    let active = true;
    ensureCodeLanguage(language).then(() => {
      if (active) syntaxVersion += 1;
    });
    return () => {
      active = false;
    };
  });
</script>

<div
  class="code-syntax code-block"
  data-syntax-version={syntaxVersion}
  class:with-line-numbers={lineNumbers}
  role="textbox"
  aria-readonly="true"
  aria-multiline="true"
  tabindex="0"
  aria-label={label}
>
  {#each lines as line, index}
    <div class="code-line" data-line={lineNumbers ? index + 1 : undefined}>
      <code>{@html highlightedLine(line, language, syntaxVersion)}</code>
    </div>
  {/each}
</div>

<style>
  .code-block {
    overflow: auto;
    white-space: pre;
    tab-size: 2;
  }
  .code-line {
    display: grid;
    grid-template-columns: 1fr;
    min-width: max-content;
  }
  .with-line-numbers .code-line {
    grid-template-columns: 3ch minmax(0, 1fr);
    gap: 14px;
  }
  .with-line-numbers .code-line::before {
    content: attr(data-line);
    color: var(--muted);
    opacity: 0.68;
    text-align: right;
    user-select: none;
  }
  code {
    font: inherit;
  }
  :global(.code-syntax .hljs-comment),
  :global(.code-syntax .hljs-quote) {
    color: #7b8a83;
    font-style: italic;
  }
  :global(.code-syntax .hljs-string),
  :global(.code-syntax .hljs-template-variable) {
    color: #a14f25;
  }
  :global(.code-syntax .hljs-number),
  :global(.code-syntax .hljs-literal),
  :global(.code-syntax .hljs-boolean) {
    color: #7457ad;
  }
  :global(.code-syntax .hljs-keyword),
  :global(.code-syntax .hljs-selector-tag),
  :global(.code-syntax .hljs-name) {
    color: #087263;
    font-weight: 650;
  }
  :global(.code-syntax .hljs-title),
  :global(.code-syntax .hljs-property),
  :global(.code-syntax .hljs-attribute),
  :global(.code-syntax .hljs-attr) {
    color: #087263;
    font-weight: 650;
  }
  :global(.code-syntax .hljs-punctuation) {
    color: #71837a;
  }
  :global(html[data-theme='dark'] .code-syntax .hljs-comment),
  :global(html[data-theme='dark'] .code-syntax .hljs-quote) {
    color: #8fa299;
  }
  :global(html[data-theme='dark'] .code-syntax .hljs-string),
  :global(html[data-theme='dark'] .code-syntax .hljs-template-variable) {
    color: #e9a47f;
  }
  :global(html[data-theme='dark'] .code-syntax .hljs-number),
  :global(html[data-theme='dark'] .code-syntax .hljs-literal),
  :global(html[data-theme='dark'] .code-syntax .hljs-boolean) {
    color: #c9aaff;
  }
  :global(html[data-theme='dark'] .code-syntax .hljs-keyword),
  :global(html[data-theme='dark'] .code-syntax .hljs-selector-tag),
  :global(html[data-theme='dark'] .code-syntax .hljs-name) {
    color: #69d9bd;
  }
  :global(html[data-theme='dark'] .code-syntax .hljs-title),
  :global(html[data-theme='dark'] .code-syntax .hljs-property),
  :global(html[data-theme='dark'] .code-syntax .hljs-attribute),
  :global(html[data-theme='dark'] .code-syntax .hljs-attr) {
    color: #69d9bd;
    font-weight: 650;
  }
  :global(html[data-theme='dark'] .code-syntax .hljs-punctuation) {
    color: #9cb1a7;
  }
</style>
