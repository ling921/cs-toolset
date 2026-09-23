<script lang="ts">
  import { page } from '$app/state';
  import Seo from '$lib/components/Seo.svelte';
  import { ArrowLeft } from '@lucide/svelte';
  import { errorCopy, localeFromPath, t } from '$lib/i18n';

  const locale = $derived(localeFromPath(page.url.pathname));
  const copy = $derived(t(locale, errorCopy));
</script>

<Seo
  title={copy.title}
  description={copy.description}
  {locale}
  path={page.url.pathname}
  kind="error"
/>
<div class="not-found">
  <span>404</span>
  <h1>{copy.heading}</h1>
  <p>{copy.body}</p>
  <a href="/{locale}/"><ArrowLeft size={18} />{copy.back}</a>
</div>

<style>
  .not-found {
    min-height: 55vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .not-found span {
    font:
      700 80px ui-monospace,
      monospace;
    color: var(--accent);
  }
  .not-found h1 {
    margin: 8px;
    font-size: 30px;
  }
  .not-found p {
    color: var(--muted);
  }
  .not-found a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent);
    color: #fff;
    border-radius: 9px;
    padding: 12px 17px;
    margin-top: 24px;
  }
</style>
