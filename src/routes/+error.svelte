<script lang="ts">
  import { page } from '$app/state';
  import Seo from '$lib/components/Seo.svelte';
  import { ArrowLeft } from '@lucide/svelte';
  const zh = $derived(page.url.pathname.startsWith('/zh-CN/'));
  const locale = $derived(zh ? 'zh-CN' : 'en');
</script>

<Seo
  title={zh ? '页面未找到' : 'Page not found'}
  description={zh
    ? '这个页面不存在，请返回工具首页。'
    : 'This page does not exist. Return to the tool directory.'}
  {locale}
  path={page.url.pathname}
  kind="error"
/>
<div class="not-found">
  <span>404</span>
  <h1>{zh ? '这里没有找到工具' : 'Nothing here yet'}</h1>
  <p>
    {zh
      ? '检查一下地址，或者回到首页搜索需要的工具。'
      : 'Check the address or head home to find the tool you need.'}
  </p>
  <a href="/{locale}/"><ArrowLeft size={18} />{zh ? '返回首页' : 'Back to tools'}</a>
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
