<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import {
    Search,
    Moon,
    Sun,
    Monitor,
    Languages,
    ChevronDown,
    X,
    ArrowUpRight,
    RefreshCw,
    WifiOff
  } from '@lucide/svelte';
  import { tools, toolUrl } from '$lib/catalog';
  import { searchTools } from '$lib/search';
  import {
    preferences,
    loadPreferences,
    savePreferences,
    applyTheme
  } from '$lib/preferences.svelte';
  import { siteConfig } from '$lib/site';
  import {
    defaultLocale,
    isLocale,
    layoutCopy,
    localeConfig,
    localeFromPath,
    locales,
    t
  } from '$lib/i18n';
  import type { Locale } from '$lib/types';
  import './app.css';

  let { children } = $props();
  const locale: Locale = $derived(
    localeFromPath(
      page.url.pathname,
      page.url.pathname === '/' && preferences.ready ? preferences.locale : defaultLocale
    )
  );
  let palette: HTMLDialogElement;
  let paletteInput: HTMLInputElement;
  let query = $state('');
  let active = $state(0);
  let updateWaiting = $state(false);
  let updateApplying = $state(false);
  let updateFailed = $state(false);
  let offline = $state(false);
  let isApplePlatform = $state(false);
  let languageMenuOpen = $state(false);
  let languageMenu: HTMLElement;
  let previousOverflow = '';
  let worker: ServiceWorkerRegistration | undefined;
  let updateTimer: ReturnType<typeof setTimeout> | undefined;
  let reloading = false;
  const matches = $derived(searchTools(tools, query, locale).slice(0, 12));
  const copy = $derived(t(locale, layoutCopy));
  const currentPath = $derived(page.url.pathname.replace(/^\/[^/]+\//, '').replace(/\/$/, ''));
  const shortcutLabel = $derived(isApplePlatform ? '⌘ K' : 'Ctrl K');
  const updateState = $derived(updateFailed ? 'failed' : updateApplying ? 'applying' : 'ready');

  function openPalette() {
    if (palette?.open) return;
    query = '';
    active = 0;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    palette?.showModal();
    setTimeout(() => paletteInput?.focus(), 0);
  }
  function closePalette() {
    palette?.close();
    unlockPaletteScroll();
  }
  function unlockPaletteScroll() {
    document.documentElement.style.overflow = previousOverflow;
  }
  function paletteKey(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      active = Math.min(matches.length - 1, active + 1);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      active = Math.max(0, active - 1);
    }
    if (event.key === 'Enter' && matches[active]) {
      event.preventDefault();
      goto(toolUrl(matches[active], locale));
      closePalette();
    }
  }
  function keyGlobal(event: KeyboardEvent) {
    if (event.key === 'Escape' && languageMenuOpen) {
      languageMenuOpen = false;
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      palette?.open ? closePalette() : openPalette();
    }
  }
  function setTheme(theme: 'system' | 'light' | 'dark') {
    preferences.theme = theme;
    applyTheme();
    savePreferences();
  }
  function changeLocale(selected: string) {
    languageMenuOpen = false;
    if (!isLocale(selected) || selected === locale) return;
    preferences.locale = selected;
    savePreferences();
    goto(`/${selected}/${currentPath ? currentPath + '/' : ''}`);
  }
  function languageMenuKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      languageMenuOpen = false;
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      languageMenuOpen = !languageMenuOpen;
    }
  }
  function registrationUpdate() {
    if (worker?.waiting) {
      updateWaiting = true;
      updateFailed = false;
    }
  }
  function acknowledgeSkipWaiting(waiting: ServiceWorker): Promise<void> {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      const timer = setTimeout(() => reject(new Error('Update worker did not respond.')), 3_000);
      channel.port1.onmessage = (event) => {
        clearTimeout(timer);
        if (event.data?.type === 'SKIP_WAITING_ACCEPTED') resolve();
        else reject(new Error('Unexpected update worker response.'));
      };
      waiting.postMessage({ type: 'SKIP_WAITING' }, [channel.port2]);
    });
  }
  async function refreshUpdate() {
    if (updateApplying) return;
    if (updateFailed) {
      location.reload();
      return;
    }
    updateApplying = true;
    try {
      const latest = await navigator.serviceWorker.getRegistration();
      worker = latest ?? worker;
      const waiting = latest?.waiting ?? worker?.waiting;
      if (!waiting) {
        location.reload();
        return;
      }
      await acknowledgeSkipWaiting(waiting);
      updateTimer = setTimeout(() => {
        updateApplying = false;
        updateFailed = true;
      }, 7_000);
    } catch {
      updateApplying = false;
      updateFailed = true;
    }
  }
  onMount(() => {
    loadPreferences();
    isApplePlatform =
      /Mac|iPhone|iPad|iPod/i.test(navigator.platform) ||
      /Mac OS X|iPhone|iPad|iPod/i.test(navigator.userAgent);
    offline = !navigator.onLine;
    const connection = () => (offline = !navigator.onLine);
    const scheme = () => {
      if (preferences.theme === 'system') applyTheme();
    };
    window.addEventListener('keydown', keyGlobal);
    const closeLanguageMenu = (event: PointerEvent) => {
      if (languageMenuOpen && languageMenu && !languageMenu.contains(event.target as Node))
        languageMenuOpen = false;
    };
    window.addEventListener('pointerdown', closeLanguageMenu);
    window.addEventListener('online', connection);
    window.addEventListener('offline', connection);
    const media = matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', scheme);
    let previousController = navigator.serviceWorker?.controller;
    const controller = () => {
      const changed = navigator.serviceWorker.controller !== previousController;
      if (changed && (previousController || updateApplying) && !reloading) {
        reloading = true;
        if (updateTimer) clearTimeout(updateTimer);
        location.reload();
      }
      previousController = navigator.serviceWorker.controller;
    };
    if ('serviceWorker' in navigator && !import.meta.env.DEV) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((reg) => {
          worker = reg;
          registrationUpdate();
          reg.addEventListener('updatefound', () =>
            reg.installing?.addEventListener('statechange', registrationUpdate)
          );
          navigator.serviceWorker.addEventListener('controllerchange', controller);
          const timer = setInterval(() => reg.update(), 60 * 60 * 1000);
          cleanupWorker = () => {
            clearInterval(timer);
            if (updateTimer) clearTimeout(updateTimer);
            navigator.serviceWorker.removeEventListener('controllerchange', controller);
          };
        })
        .catch(() => {});
    }
    return () => {
      window.removeEventListener('keydown', keyGlobal);
      window.removeEventListener('pointerdown', closeLanguageMenu);
      window.removeEventListener('online', connection);
      window.removeEventListener('offline', connection);
      media.removeEventListener('change', scheme);
      unlockPaletteScroll();
      cleanupWorker?.();
    };
  });
  let cleanupWorker: (() => void) | undefined;
</script>

<div class="site-shell">
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href={`/${locale}/`} aria-label={copy.brandHome}
        ><span class="brand-mark" aria-hidden="true">&gt;_</span><span
          >CS <span class="brand-dot">Toolset</span></span
        ></a
      >
      <nav class="header-actions" aria-label={copy.siteNavigation}>
        <button
          class="search-shortcut"
          onclick={openPalette}
          aria-keyshortcuts={isApplePlatform ? 'Meta+K' : 'Control+K'}
          aria-label={copy.searchAllTools}
        >
          <Search size={17} />
          <span>{copy.searchTools}</span>
          <kbd>{shortcutLabel}</kbd></button
        >
        <button
          class="icon-control mobile-search"
          onclick={openPalette}
          aria-label={copy.searchAllTools}
        >
          <Search size={20} />
        </button>
        <div bind:this={languageMenu} class="language-menu">
          <button
            class="language-select"
            type="button"
            title={copy.changeLanguage}
            aria-label={copy.chooseLanguage}
            aria-haspopup="menu"
            aria-expanded={languageMenuOpen}
            onclick={() => (languageMenuOpen = !languageMenuOpen)}
            onkeydown={languageMenuKeydown}
          >
            <Languages size={18} aria-hidden="true" />
            <span>{localeConfig[locale].label}</span>
            <ChevronDown class="select-chevron" size={14} aria-hidden="true" />
          </button>
          {#if languageMenuOpen}<div class="language-options" role="menu">
              {#each locales as language}
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={language === locale}
                  class:active={language === locale}
                  onclick={() => changeLocale(language)}>{localeConfig[language].label}</button
                >
              {/each}
            </div>{/if}
        </div>
        <div
          class="theme-controls"
          class:theme-light={preferences.theme === 'light'}
          class:theme-system={preferences.theme === 'system'}
          class:theme-dark={preferences.theme === 'dark'}
          aria-label={copy.theme}
        >
          <span class="theme-indicator" aria-hidden="true"></span>
          <button
            class:chosen={preferences.theme === 'light'}
            onclick={() => setTheme('light')}
            aria-label={copy.lightTheme}
            title={copy.lightTheme}
            aria-pressed={preferences.theme === 'light'}
          >
            <Sun size={17} />
          </button>
          <button
            class:chosen={preferences.theme === 'system'}
            onclick={() => setTheme('system')}
            aria-label={copy.systemTheme}
            title={copy.systemTheme}
            aria-pressed={preferences.theme === 'system'}
          >
            <Monitor size={17} />
          </button>
          <button
            class:chosen={preferences.theme === 'dark'}
            onclick={() => setTheme('dark')}
            aria-label={copy.darkTheme}
            title={copy.darkTheme}
            aria-pressed={preferences.theme === 'dark'}
          >
            <Moon size={17} />
          </button>
        </div>
      </nav>
    </div>
  </header>
  <main id="main" class="page-container">{@render children()}</main>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="brand-mark small">&gt;_</span>
        <span>CS Toolset</span><span class="footer-sep">·</span>
        <span>© {new Date().getFullYear()} Jing Ling</span>
      </div>
      <nav aria-label={copy.footer}>
        <a href="https://github.com/ling921/cs-toolset" target="_blank" rel="noopener noreferrer">
          GitHub <ArrowUpRight size={12} />
        </a>
        <a href="/{locale}/about/">{copy.about}</a>
        <a href="/{locale}/privacy/"> {copy.privacy} </a>
        <span class="version">v{siteConfig.version} · {siteConfig.commit}</span>
      </nav>
    </div>
  </footer>
</div>

{#if offline}<div class="floating-status" role="status">
    <WifiOff size={17} />{copy.offline}
  </div>{/if}
{#if updateWaiting}<div class="update-toast" role="status">
    <RefreshCw size={18} /><span>{copy.updateStatus[updateState]}</span
    ><button onclick={refreshUpdate} disabled={updateApplying}
      >{copy.updateAction[updateState]}</button
    ><button
      class="update-close"
      onclick={() => {
        updateWaiting = false;
        updateApplying = false;
        updateFailed = false;
        if (updateTimer) clearTimeout(updateTimer);
      }}
      aria-label={copy.dismiss}><X size={17} /></button
    >
  </div>{/if}

<dialog
  bind:this={palette}
  class="command-dialog"
  onclose={unlockPaletteScroll}
  onclick={(event) => {
    if (event.target === palette) closePalette();
  }}
  aria-label={copy.commandDialog}
>
  <div class="command-box">
    <div class="command-search">
      <Search size={20} /><input
        bind:this={paletteInput}
        bind:value={query}
        oninput={() => (active = 0)}
        onkeydown={paletteKey}
        placeholder={copy.searchPlaceholder}
        aria-label={copy.searchTools}
      /><button onclick={closePalette} aria-label={copy.close}><X size={19} /></button>
    </div>
    <div class="command-results" role="listbox" aria-label={copy.searchResults}>
      {#each matches as item, i (item.id)}<a
          role="option"
          aria-selected={i === active}
          class:active={i === active}
          href={toolUrl(item, locale)}
          onclick={closePalette}
          ><span class="command-result-icon"
            ><span aria-hidden="true">{item.icon.slice(0, 1)}</span></span
          ><span class="command-result-copy"
            ><strong>{item.name[locale]}</strong><small>{item.description[locale]}</small></span
          ><ArrowUpRight size={15} /></a
        >{:else}<p class="command-empty">
          {copy.noMatchingTools}
        </p>{/each}
    </div>
    <div class="command-hint">
      <span>↑ ↓ {copy.navigate} · Enter {copy.open}</span><span>Esc {copy.close}</span
      >
    </div>
  </div>
</dialog>
