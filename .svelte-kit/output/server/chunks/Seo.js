import { h as head, e as escape_html, a as attr, d as derived } from "./index.js";
import { s as siteConfig } from "./Icon.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function seoData({ title, description, locale, path, kind, tool, alternatePath }) {
  const url = new URL(path, siteConfig.origin).href;
  const alternate = alternatePath ? new URL(alternatePath, siteConfig.origin).href : void 0;
  const origin = siteConfig.origin;
  const alternates = alternatePath ? {
    en: locale === "en" ? url : alternate,
    "zh-CN": locale === "zh-CN" ? url : alternate,
    "x-default": kind === "home" ? new URL("/", origin).href : locale === "en" ? url : alternate
  } : void 0;
  const graph = [];
  if (kind === "gateway" || kind === "home")
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ling.Tools",
      url: origin + "/",
      description,
      inLanguage: ["en", "zh-CN"]
    });
  if (kind === "tool" && tool) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name[locale],
      url,
      description: tool.description[locale],
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any modern web browser",
      inLanguage: locale,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
    });
    graph.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "zh-CN" ? "首页" : "Home",
          item: origin + `/${locale}/`
        },
        { "@type": "ListItem", position: 2, name: tool.name[locale], item: url }
      ]
    });
  }
  return {
    url,
    alternates,
    graph: JSON.stringify(graph).replace(/</g, "\\u003c"),
    image: origin + "/social-card.svg",
    robots: "noindex, nofollow",
    title,
    description
  };
}
function Seo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    const meta = derived(() => seoData(props));
    const jsonLd = derived(() => `<script type="application/ld+json">${meta().graph}<\/script>`);
    head("gsrl61", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(meta().title)} · Ling.Tools</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", meta().description)}/> <meta name="robots"${attr("content", meta().robots)}/> <link rel="canonical"${attr("href", meta().url)}/> `);
      if (meta().alternates) {
        $$renderer3.push(`<!--[0--><link rel="alternate" hreflang="en"${attr("href", meta().alternates.en)}/> <link rel="alternate" hreflang="zh-CN"${attr("href", meta().alternates["zh-CN"])}/> <link rel="alternate" hreflang="x-default"${attr("href", meta().alternates["x-default"])}/>`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> <meta property="og:type" content="website"/> <meta property="og:site_name" content="Ling.Tools"/> <meta property="og:locale"${attr("content", props.locale === "zh-CN" ? "zh_CN" : "en_US")}/> <meta property="og:title"${attr("content", meta().title)}/> <meta property="og:description"${attr("content", meta().description)}/> <meta property="og:url"${attr("content", meta().url)}/> <meta property="og:image"${attr("content", meta().image)}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", meta().title)}/> <meta name="twitter:description"${attr("content", meta().description)}/> <meta name="twitter:image"${attr("content", meta().image)}/> ${html(jsonLd())}`);
    });
  });
}
export {
  Seo as S
};
