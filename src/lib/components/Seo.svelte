<script lang="ts">
  import { seoData, type SeoProps } from '$lib/seo';
  let props: SeoProps = $props();
  const meta = $derived(seoData(props));
  const jsonLd = $derived('<scr' + `ipt type="application/ld+json">${meta.graph}</scr` + 'ipt>');
</script>

<svelte:head>
  <title>{meta.title} · CS Toolset</title>
  <meta name="description" content={meta.description} />
  <meta name="robots" content={meta.robots} />
  <link rel="canonical" href={meta.url} />
  {#if meta.alternates}
    <link rel="alternate" hreflang="en" href={meta.alternates.en} />
    <link rel="alternate" hreflang="zh-CN" href={meta.alternates['zh-CN']} />
    <link rel="alternate" hreflang="x-default" href={meta.alternates['x-default']} />
  {/if}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="CS Toolset" />
  <meta property="og:locale" content={props.locale === 'zh-CN' ? 'zh_CN' : 'en_US'} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:image" content={meta.image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  {@html jsonLd}
</svelte:head>
