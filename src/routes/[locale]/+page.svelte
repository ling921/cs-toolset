<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { Search, Heart, ShieldCheck, Wifi, Keyboard, ChevronsRight } from '@lucide/svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';
  import Seo from '$lib/components/Seo.svelte';
  import ToolIcon from '$lib/components/ToolIcon.svelte';
  import { tools, toolUrl, categories } from '$lib/catalog';
  import { searchTools } from '$lib/search';
  import { tagLabel } from '$lib/tags';
  import { localeFromPath, otherLocale } from '$lib/i18n';
  import { preferences, toggleFavorite } from '$lib/preferences.svelte';
  import type { Category, Locale } from '$lib/types';
  const locale: Locale = $derived(localeFromPath(page.url.pathname));
  const zh = $derived(locale === 'zh-CN');
  let isApplePlatform = $state(false);
  const shortcutLabel = $derived(isApplePlatform ? '⌘ K' : 'Ctrl K');
  let query = $state('');
  let category = $state<Category | 'all' | 'favorites'>('all');
  const filtered = $derived(searchTools(tools, query, locale, category, preferences.favorites));
  const filters: (Category | 'all' | 'favorites')[] = [
    'all',
    'generate',
    'convert',
    'security',
    'text',
    'other',
    'favorites'
  ];
  const label = (filter: Category | 'all' | 'favorites') =>
    filter === 'all'
      ? zh
        ? '全部工具'
        : 'All tools'
      : filter === 'favorites'
        ? zh
          ? '已收藏'
          : 'Favorites'
        : categories[filter][locale];
  onMount(() => {
    isApplePlatform =
      /Mac|iPhone|iPad|iPod/i.test(navigator.platform) ||
      /Mac OS X|iPhone|iPad|iPod/i.test(navigator.userAgent);
  });
</script>

<Seo
  title={zh
    ? '免费在线开发者工具：编码、生成与转换'
    : 'Free online developer tools for encoding, generating and converting'}
  description={zh
    ? '搜索免费的开发者工具：JSON、Base64、密码、正则、Cron、二维码等。纯静态网站，数据在浏览器本地处理，并支持离线使用。'
    : 'Search free developer tools including JSON, Base64, passwords, regex, Cron and QR codes. Private browser-side processing and offline support.'}
  {locale}
  path={`/${locale}/`}
  alternatePath={`/${otherLocale(locale)}/`}
  kind="home"
/>
<section class="hero">
  <div class="hero-copy">
    <p class="eyebrow">
      <span class="pulse"></span>{zh
        ? '为开发者准备的轻量工具箱'
        : 'A little toolkit for big ideas'}
    </p>
    <h1>
      {zh ? '开发日常，' : 'The small tools'}<br /><span
        >{zh ? '从这里开始。' : 'that make a difference.'}</span
      >
    </h1>
    <p>
      {zh
        ? '用得上的工具，集中在这里。快速查找、即开即用，所有数据都在你的浏览器中完成处理。'
        : 'Useful utilities in one place. Fast, thoughtfully made, and processed entirely in your browser.'}
    </p>
    <div class="hero-pills">
      <span><ShieldCheck size={15} />{zh ? '隐私优先' : 'Private by default'}</span><span
        ><Wifi size={15} />{zh ? '离线可用' : 'Works offline'}</span
      ><span><Keyboard size={15} />{shortcutLabel} {zh ? '快捷搜索' : 'quick search'}</span>
    </div>
  </div>
  <div class="hero-decoration" aria-hidden="true">
    <div class="window-top"><span></span><span></span><span></span></div>
    <div class="window-line"><span>const</span> tools = <b>"better work"</b>;</div>
    <div class="window-line muted-code">
      // {zh ? '为灵感腾出空间' : 'save time for the good stuff'}
    </div>
    <div class="window-line">tools.<b>create</b>(); <span class="cursor">▌</span></div>
    <div class="window-output">✓ {zh ? '准备就绪' : 'ready when you are'}</div>
  </div>
</section>
<section class="directory" aria-label={zh ? '全部工具' : 'Tool directory'}>
  <div class="directory-heading">
    <div>
      <p class="eyebrow">EXPLORE / {zh ? '探索工具' : 'EXPLORE THE TOOLS'}</p>
      <h2>{zh ? '探索工具' : 'Explore the tools'}</h2>
    </div>
    <p>{zh ? '找到需要的，直接开始。' : 'Find what you need and get going.'}</p>
  </div>
  <div class="search-field">
    <Search size={22} /><input
      type="search"
      bind:value={query}
      placeholder={zh ? '搜索工具，例如 MD5 tag:hash' : 'Search tools, e.g. MD5 tag:hash'}
      aria-label={zh ? '搜索所有工具' : 'Search all tools'}
      autocomplete="off"
    />
  </div>
  <p class="search-help">
    {zh
      ? '支持 tag:hash 精确筛选、-tag:hash 排除；可组合多个标签。'
      : 'Use tag:hash to filter, -tag:hash to exclude, and combine tags.'}
  </p>
  <div class="filter-row" aria-label={zh ? '工具分类' : 'Tool categories'}>
    {#each filters as filter}<button
        class:current={category === filter}
        aria-pressed={category === filter}
        onclick={() => (category = filter)}
        >{#if filter === 'favorites'}<Heart size={14} />{/if}{label(filter)}</button
      >{/each}
  </div>
  {#if filtered.length}<div class="tool-grid">
      {#each filtered as tool (tool.id)}<article
          class="tool-card"
          animate:flip={{
            duration:
              preferences.ready &&
              typeof matchMedia !== 'undefined' &&
              matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 0
                : 210
          }}
        >
          <a href={toolUrl(tool, locale)} class="card-link" aria-label={tool.name[locale]}
            ><div class="card-top">
              <span class="card-icon"><ToolIcon id={tool.id} /></span>
              <span class="card-category">{categories[tool.category][locale]}</span>
            </div>
            <h3>{tool.name[locale]}</h3>
            <p>{tool.description[locale]}</p>
            <span class="card-bottom">
              <span class="card-open"
                >{zh ? '打开工具' : 'Open tool'} <ChevronsRight size={15} /></span
              >
              <span class="card-tags" aria-label={zh ? '工具标签' : 'Tool tags'}>
                {#each tool.tags.slice(0, 3) as tag (tag)}<span class="card-tag"
                    >#{tagLabel(tag, locale)}</span
                  >{/each}
                {#if tool.tags.length > 3}<span
                    class="tag-overflow"
                    title={tool.tags
                      .slice(3)
                      .map((tag) => `#${tagLabel(tag, locale)}`)
                      .join(' · ')}
                    aria-label={tool.tags
                      .slice(3)
                      .map((tag) => tagLabel(tag, locale))
                      .join(', ')}
                    >+{tool.tags.length - 3}<span class="tag-popover"
                      >{tool.tags
                        .slice(3)
                        .map((tag) => `#${tagLabel(tag, locale)}`)
                        .join(' · ')}</span
                    ></span
                  >{/if}
              </span>
            </span>
          </a><button
            class="favorite"
            class:selected={preferences.favorites.includes(tool.id)}
            aria-label={preferences.favorites.includes(tool.id)
              ? zh
                ? '取消收藏'
                : 'Remove favorite'
              : zh
                ? '收藏工具'
                : 'Add favorite'}
            aria-pressed={preferences.favorites.includes(tool.id)}
            onclick={() => toggleFavorite(tool.id)}
            ><Heart
              size={17}
              fill={preferences.favorites.includes(tool.id) ? 'currentColor' : 'none'}
            /></button
          >
        </article>{/each}
    </div>{:else}<div class="no-results" transition:fade={{ duration: 140 }}>
      <Search size={32} />
      <h3>{zh ? '暂时没有匹配的工具' : 'No tools found'}</h3>
      <p>
        {zh
          ? '试试其他关键词，或查看全部分类。'
          : 'Try a different keyword or browse all categories.'}
      </p>
      <button
        onclick={() => {
          query = '';
          category = 'all';
        }}>{zh ? '查看全部工具' : 'Show all tools'}</button
      >
    </div>{/if}
</section>

<style>
  .hero {
    display: grid;
    grid-template-columns: 1.18fr 0.82fr;
    gap: 35px;
    align-items: center;
    padding: 45px 0 80px;
  }
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--accent);
    font:
      700 11px ui-monospace,
      monospace;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .pulse {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
  .hero h1 {
    font-size: clamp(38px, 5vw, 65px);
    line-height: 1.18;
    letter-spacing: -0.055em;
    margin: 19px 0 20px;
  }
  .hero h1 span {
    color: var(--accent);
  }
  .hero-copy > p:not(.eyebrow) {
    max-width: 520px;
    font-size: 15px;
    line-height: 1.95;
    color: var(--muted);
  }
  .hero-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 25px;
  }
  .hero-pills span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 100px;
    padding: 8px 11px;
    font-size: 13px;
    color: var(--muted);
  }
  .hero-pills :global(svg) {
    color: var(--accent);
  }
  .hero-decoration {
    padding: 32px 36px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    transform: rotate(2deg);
    box-shadow:
      0 15px 0 var(--accent-soft),
      0 25px 50px #0000000a;
    font:
      14px/2.1 ui-monospace,
      monospace;
  }
  .window-top {
    display: flex;
    gap: 6px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 18px;
    margin-bottom: 18px;
  }
  .window-top span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--border);
  }
  .window-top span:first-child {
    background: #f29e9e;
  }
  .window-top span:nth-child(2) {
    background: #e8ca70;
  }
  .window-top span:nth-child(3) {
    background: #8ed5a5;
  }
  .window-line {
    white-space: nowrap;
    color: var(--text);
  }
  .window-line span {
    color: var(--accent);
  }
  .window-line b {
    color: #9d4265;
    font-weight: 500;
  }
  .window-line.muted-code {
    color: var(--muted);
  }
  .window-output {
    margin-top: 22px;
    background: var(--surface-2);
    color: var(--success);
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 8px;
  }
  .directory-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 23px;
  }
  .directory-heading h2 {
    font-size: 29px;
    letter-spacing: -0.04em;
    margin: 9px 0 0;
  }
  .directory-heading > p {
    color: var(--muted);
    font-size: 14px;
  }
  .search-field {
    height: 64px;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--surface);
    padding: 0 21px;
    color: var(--accent);
    box-shadow: 0 8px 24px #00000007;
  }
  .search-field:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  .search-field input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text);
    font-size: 15px;
  }
  .search-field input::placeholder {
    color: var(--muted);
  }
  .search-help {
    margin: 9px 2px 0;
    color: var(--muted);
    font-size: 12px;
    line-height: 1.5;
  }
  .filter-row {
    display: flex;
    gap: 7px;
    overflow-x: auto;
    padding: 16px 0 24px;
  }
  .filter-row button {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    min-height: 37px;
    padding: 7px 13px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--surface);
    color: var(--muted);
    font-size: 13px;
  }
  .filter-row button.current {
    border-color: var(--accent);
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 700;
  }
  .tool-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
  }
  .tool-card {
    position: relative;
    min-height: 204px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 13px;
    transition:
      transform 0.2s,
      border-color 0.2s,
      box-shadow 0.2s;
  }
  .tool-card:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
    box-shadow: 0 15px 36px #0000000d;
  }
  .card-link {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 21px;
  }
  .card-top {
    display: flex;
    align-items: center;
    gap: 11px;
    padding-right: 38px;
  }
  .card-icon {
    display: grid;
    place-items: center;
    width: 39px;
    height: 39px;
    background: var(--accent-soft);
    border-radius: 9px;
    color: var(--accent);
  }
  .card-category {
    color: var(--accent);
    font-size: 12px;
    font-weight: 650;
  }
  .card-link h3 {
    margin: 16px 0 6px;
    font-size: 16px;
    letter-spacing: -0.02em;
  }
  .card-link p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.7;
    flex: 1;
    max-width: 100%;
  }
  .card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .card-open {
    display: inline-flex;
    gap: 5px;
    align-items: center;
    color: var(--accent);
    font-size: 13px;
    font-weight: 650;
    white-space: nowrap;
  }
  .card-tags {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    min-width: 0;
    margin-left: auto;
  }
  .card-tag,
  .tag-overflow {
    display: inline-block;
    max-width: 86px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 5px;
    background: var(--surface-2);
    color: var(--muted);
    padding: 3px 5px;
    font-size: 10px;
    line-height: 1.4;
  }
  .tag-overflow {
    position: relative;
    overflow: visible;
    background: var(--accent-soft);
    color: var(--accent);
  }
  .tag-popover {
    display: none;
    position: absolute;
    bottom: calc(100% + 6px);
    right: 0;
    z-index: 3;
    width: max-content;
    max-width: 240px;
    padding: 7px 9px;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--surface);
    box-shadow: 0 8px 24px #0002;
    color: var(--text);
    font-size: 12px;
    white-space: normal;
  }
  .tag-overflow:hover .tag-popover {
    display: block;
  }
  .favorite {
    position: absolute;
    top: 25px;
    right: 18px;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    color: var(--muted);
    border-radius: 7px;
  }
  .favorite:hover,
  .favorite.selected {
    color: var(--accent);
    background: var(--accent-soft);
  }
  .no-results {
    text-align: center;
    padding: 70px 20px;
    color: var(--muted);
  }
  .no-results :global(svg) {
    color: var(--accent);
  }
  .no-results h3 {
    color: var(--text);
  }
  .no-results p {
    font-size: 13px;
  }
  .no-results button {
    border: 1px solid var(--accent);
    background: var(--accent-soft);
    color: var(--accent);
    border-radius: 8px;
    padding: 10px 14px;
    margin-top: 13px;
  }
  @media (max-width: 930px) {
    .hero {
      grid-template-columns: 1fr;
    }
    .hero-decoration {
      display: none;
    }
    .tool-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 600px) {
    .hero {
      padding: 28px 0 48px;
    }
    .hero h1 {
      font-size: 39px;
    }
    .hero-copy > p:not(.eyebrow) {
      font-size: 13px;
    }
    .directory-heading > p {
      display: none;
    }
    .tool-grid {
      grid-template-columns: 1fr;
    }
    .tool-card {
      min-height: 190px;
    }
    .directory-heading h2 {
      font-size: 25px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tool-card {
      transition: none;
    }
    .tool-card:hover {
      transform: none;
    }
  }
</style>
