<script lang="ts">
  import { onMount } from 'svelte';
  import {
    ArrowLeft,
    ChevronRight,
    BookOpen,
    Lightbulb,
    ArrowUpRight,
    ShieldCheck
  } from '@lucide/svelte';
  import Seo from '$lib/components/Seo.svelte';
  import ToolIcon from '$lib/components/ToolIcon.svelte';
  import ToolWorkbench from '$lib/components/ToolWorkbench.svelte';
  import { tools, toolUrl, categories } from '$lib/catalog';
  import { contentPages } from '$lib/content';
  import { otherLocale, toolPageCopy } from '$lib/i18n';
  import { visitTool } from '$lib/preferences.svelte';
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
  const locale = $derived(data.locale);
  const copy = $derived(toolPageCopy[locale]);
  const tool = $derived(data.tool);
  const content = $derived(
    data.kind === 'about' || data.kind === 'privacy' ? contentPages[data.kind][locale] : null
  );
  const alternate = $derived(`/${otherLocale(locale)}/${tool ? tool.path : data.kind}/`);
  onMount(() => {
    if (data.tool) visitTool(data.tool.id);
  });
</script>

{#if tool}
  <Seo
    title={tool.name[locale]}
    description={tool.description[locale]}
    {locale}
    path={toolUrl(tool, locale)}
    alternatePath={alternate}
    kind="tool"
    {tool}
  />
  <nav class="breadcrumbs" aria-label={copy.breadcrumbs}>
    <a href="/{locale}/">{copy.home}</a><ChevronRight size={14} /><a href="/{locale}/"
      >{categories[tool.category][locale]}</a
    ><ChevronRight size={14} /><span aria-current="page">{tool.name[locale]}</span>
  </nav>
  <div class="tool-hero">
    <div class="tool-hero-icon"><ToolIcon id={tool.id} size={31} /></div>
    <div>
      <p class="eyebrow">{categories[tool.category][locale]} / CS TOOLSET</p>
      <h1>{tool.name[locale]}</h1>
      <p class="tool-description">{tool.description[locale]}</p>
    </div>
  </div>
  <ToolWorkbench {tool} {locale} />
  <section class="guide">
    <div class="guide-main">
      <p class="eyebrow"><BookOpen size={15} />{copy.guideEyebrow}</p>
      <h2>{copy.aboutHeading}</h2>
      <p>{tool.intro[locale]}</p>
      <h3>{copy.howToHeading}</h3>
      <ol>
        {#each tool.instructions[locale] as step}<li>{step}</li>{/each}
      </ol>
      <div class="example">
        <Lightbulb size={19} />
        <div>
          <strong>{copy.example}</strong>
          <p>{tool.example[locale]}</p>
        </div>
      </div>
    </div>
    <aside>
      <p class="eyebrow">{copy.relatedEyebrow}</p>
      <h3>{copy.relatedHeading}</h3>
      {#each tool.related as id}{@const related = tools.find((x) => x.id === id)}{#if related}<a
            class="related-card"
            href={toolUrl(related, locale)}
            ><span class="related-icon"><ToolIcon id={related.id} size={19} /></span><span
              ><strong>{related.name[locale]}</strong><small>{related.description[locale]}</small
              ></span
            ><ArrowUpRight size={15} /></a
          >{/if}{/each}
      <p class="privacy-promise">
        <ShieldCheck size={17} />{copy.privacyPromise}
      </p>
    </aside>
  </section>
{:else if content}
  <Seo
    title={content.title}
    description={content.description}
    {locale}
    path={`/${locale}/${data.kind}/`}
    alternatePath={alternate}
    kind={data.kind}
  />
  <nav class="breadcrumbs" aria-label={copy.breadcrumbs}>
    <a href="/{locale}/">{copy.home}</a><ChevronRight size={14} /><span aria-current="page"
      >{content.title}</span
    >
  </nav>
  <article class="editorial">
    <p class="eyebrow">CS TOOLSET / {data.kind.toUpperCase()}</p>
    <h1>{content.title}</h1>
    <p class="editorial-intro">{content.intro}</p>
    {#each content.sections as section}<section>
        <h2>{section.heading}</h2>
        {#each section.paragraphs as paragraph}<p>{paragraph}</p>{/each}
      </section>{/each}<a class="back-link" href="/{locale}/"
      ><ArrowLeft size={17} />{copy.backToTools}</a
    >
  </article>
{/if}

<style>
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--accent);
    font:
      700 10px ui-monospace,
      monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 13px;
    margin: 0 0 38px;
    flex-wrap: wrap;
  }
  .breadcrumbs a:hover {
    color: var(--accent);
  }
  .breadcrumbs span {
    color: var(--text);
  }
  .tool-hero {
    display: flex;
    align-items: center;
    gap: 19px;
    margin-bottom: 27px;
  }
  .tool-hero-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: var(--accent-soft);
    color: var(--accent);
    flex-shrink: 0;
  }
  .tool-hero .eyebrow {
    margin: 0;
  }
  .tool-hero h1 {
    font-size: clamp(29px, 3vw, 39px);
    letter-spacing: -0.04em;
    margin: 8px 0;
  }
  .tool-description {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
  }
  .guide {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 285px;
    gap: 40px;
    margin-top: 53px;
    padding-top: 35px;
    border-top: 1px solid var(--border);
  }
  .guide-main {
    max-width: 760px;
  }
  .guide h2 {
    font-size: 24px;
    letter-spacing: -0.03em;
    margin: 16px 0;
  }
  .guide h3 {
    font-size: 15px;
    margin: 28px 0 12px;
  }
  .guide-main > p:not(.eyebrow),
  .guide li {
    color: var(--muted);
    font-size: 15px;
    line-height: 1.9;
  }
  .guide ol {
    padding-left: 21px;
  }
  .guide li {
    padding-left: 5px;
    margin: 7px 0;
  }
  .example {
    display: flex;
    gap: 12px;
    background: var(--accent-soft);
    border: 1px solid color-mix(in srgb, var(--accent) 17%, var(--border));
    border-radius: 11px;
    padding: 17px;
    color: var(--accent);
    margin-top: 24px;
  }
  .example > :global(svg) {
    flex-shrink: 0;
  }
  .example strong {
    font-size: 12px;
  }
  .example p {
    font-size: 14px;
    line-height: 1.8;
    margin: 6px 0 0;
    color: var(--text);
  }
  .guide aside h3 {
    font-size: 19px;
    margin: 7px 0 14px;
  }
  .related-card {
    display: flex;
    align-items: center;
    gap: 9px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 12px;
    margin: 8px 0;
  }
  .related-card:hover {
    border-color: var(--accent);
  }
  .related-icon {
    color: var(--accent);
    flex-shrink: 0;
  }
  .related-card > span:nth-child(2) {
    flex: 1;
    min-width: 0;
    display: grid;
    gap: 5px;
  }
  .related-card strong {
    font-size: 13px;
  }
  .related-card small {
    color: var(--muted);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .related-card > :global(svg) {
    color: var(--muted);
  }
  .privacy-promise {
    display: flex;
    gap: 7px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.6;
    margin-top: 18px;
  }
  .privacy-promise :global(svg) {
    flex-shrink: 0;
    color: var(--accent);
  }
  .editorial {
    max-width: 850px;
    margin: 0 auto;
  }
  .editorial h1 {
    font-size: clamp(36px, 5vw, 55px);
    letter-spacing: -0.055em;
    margin: 15px 0;
  }
  .editorial-intro {
    font-size: 19px;
    line-height: 1.7;
    color: var(--muted);
    margin-bottom: 50px;
  }
  .editorial section {
    border-top: 1px solid var(--border);
    padding: 22px 0;
  }
  .editorial h2 {
    font-size: 22px;
    letter-spacing: -0.025em;
  }
  .editorial section p {
    color: var(--muted);
    font-size: 14px;
    line-height: 2;
    max-width: 720px;
  }
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--accent);
    font-size: 13px;
    font-weight: 650;
    margin-top: 28px;
  }
  @media (max-width: 820px) {
    .guide {
      grid-template-columns: 1fr;
      gap: 18px;
    }
    .guide aside {
      max-width: 580px;
    }
  }
  @media (max-width: 550px) {
    .breadcrumbs {
      margin-bottom: 22px;
    }
    .tool-hero {
      align-items: start;
    }
    .tool-hero-icon {
      width: 48px;
      height: 48px;
    }
    .tool-hero h1 {
      font-size: 27px;
    }
    .guide {
      margin-top: 36px;
    }
  }
</style>
