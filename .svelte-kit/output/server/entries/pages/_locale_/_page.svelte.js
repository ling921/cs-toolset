import { s as spread_props, e as escape_html, a as attr, f as ensure_array_like, b as attr_class, d as derived } from "../../../chunks/index.js";
import { p as page } from "../../../chunks/index2.js";
import { S as Seo } from "../../../chunks/Seo.js";
import { S as Shield_check, T as ToolIcon } from "../../../chunks/ToolIcon.js";
import { t as toolUrl, c as categories, b as tagLabel, a as tools } from "../../../chunks/catalog.js";
import { S as Search, p as preferences, s as searchTools } from "../../../chunks/preferences.svelte.js";
import { o as otherLocale, a as localeFromPath } from "../../../chunks/i18n.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Chevrons_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "chevrons-right",
    "size": 24,
    "node": [
      ["path", { "d": "m6 17 5-5-5-5" }],
      ["path", { "d": "m13 17 5-5-5-5" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Heart($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "heart",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
        }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Keyboard($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "keyboard",
    "size": 24,
    "node": [
      ["path", { "d": "M10 8h.01" }],
      ["path", { "d": "M12 12h.01" }],
      ["path", { "d": "M14 8h.01" }],
      ["path", { "d": "M16 12h.01" }],
      ["path", { "d": "M18 8h.01" }],
      ["path", { "d": "M6 8h.01" }],
      ["path", { "d": "M7 16h10" }],
      ["path", { "d": "M8 12h.01" }],
      [
        "rect",
        { "width": "20", "height": "16", "x": "2", "y": "4", "rx": "2" }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Wifi($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "wifi",
    "size": 24,
    "node": [
      ["path", { "d": "M12 20h.01" }],
      ["path", { "d": "M2 8.82a15 15 0 0 1 20 0" }],
      ["path", { "d": "M5 12.859a10 10 0 0 1 14 0" }],
      ["path", { "d": "M8.5 16.429a5 5 0 0 1 7 0" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const locale = derived(() => localeFromPath(page.url.pathname));
    const zh = derived(() => locale() === "zh-CN");
    const shortcutLabel = derived(() => "Ctrl K");
    let query = "";
    let category = "all";
    const filtered = derived(() => searchTools(tools, query, locale(), category, preferences.favorites));
    const filters = [
      "all",
      "generate",
      "convert",
      "security",
      "text",
      "other",
      "favorites"
    ];
    const label = (filter) => filter === "all" ? zh() ? "全部工具" : "All tools" : filter === "favorites" ? zh() ? "已收藏" : "Favorites" : categories[filter][locale()];
    Seo($$renderer2, {
      title: zh() ? "免费在线开发者工具：编码、生成与转换" : "Free online developer tools for encoding, generating and converting",
      description: zh() ? "搜索免费的开发者工具：JSON、Base64、密码、正则、Cron、二维码等。纯静态网站，数据在浏览器本地处理，并支持离线使用。" : "Search free developer tools including JSON, Base64, passwords, regex, Cron and QR codes. Private browser-side processing and offline support.",
      locale: locale(),
      path: `/${locale()}/`,
      alternatePath: `/${otherLocale(locale())}/`,
      kind: "home"
    });
    $$renderer2.push(`<!----> <section class="hero svelte-1waspsf"><div class="hero-copy svelte-1waspsf"><p class="eyebrow svelte-1waspsf"><span class="pulse svelte-1waspsf"></span>${escape_html(zh() ? "为开发者准备的轻量工具箱" : "A little toolkit for big ideas")}</p> <h1 class="svelte-1waspsf">${escape_html(zh() ? "开发日常，" : "The small tools")}<br/><span class="svelte-1waspsf">${escape_html(zh() ? "从这里开始。" : "that make a difference.")}</span></h1> <p class="svelte-1waspsf">${escape_html(zh() ? "用得上的工具，集中在这里。快速查找、即开即用，所有数据都在你的浏览器中完成处理。" : "Useful utilities in one place. Fast, thoughtfully made, and processed entirely in your browser.")}</p> <div class="hero-pills svelte-1waspsf"><span class="svelte-1waspsf">`);
    Shield_check($$renderer2, { size: 15 });
    $$renderer2.push(`<!---->${escape_html(zh() ? "隐私优先" : "Private by default")}</span><span class="svelte-1waspsf">`);
    Wifi($$renderer2, { size: 15 });
    $$renderer2.push(`<!---->${escape_html(zh() ? "离线可用" : "Works offline")}</span><span class="svelte-1waspsf">`);
    Keyboard($$renderer2, { size: 15 });
    $$renderer2.push(`<!---->${escape_html(shortcutLabel())} ${escape_html(zh() ? "快捷搜索" : "quick search")}</span></div></div> <div class="hero-decoration svelte-1waspsf" aria-hidden="true"><div class="window-top svelte-1waspsf"><span class="svelte-1waspsf"></span><span class="svelte-1waspsf"></span><span class="svelte-1waspsf"></span></div> <div class="window-line svelte-1waspsf"><span class="svelte-1waspsf">const</span> tools = <b class="svelte-1waspsf">"better work"</b>;</div> <div class="window-line muted-code svelte-1waspsf">// ${escape_html(zh() ? "为灵感腾出空间" : "save time for the good stuff")}</div> <div class="window-line svelte-1waspsf">tools.<b class="svelte-1waspsf">create</b>(); <span class="cursor svelte-1waspsf">▌</span></div> <div class="window-output svelte-1waspsf">✓ ${escape_html(zh() ? "准备就绪" : "ready when you are")}</div></div></section> <section class="directory"${attr("aria-label", zh() ? "全部工具" : "Tool directory")}><div class="directory-heading svelte-1waspsf"><div><p class="eyebrow svelte-1waspsf">EXPLORE / ${escape_html(zh() ? "探索工具" : "EXPLORE THE TOOLS")}</p> <h2 class="svelte-1waspsf">${escape_html(zh() ? "探索工具" : "Explore the tools")}</h2></div> <p class="svelte-1waspsf">${escape_html(zh() ? "找到需要的，直接开始。" : "Find what you need and get going.")}</p></div> <div class="search-field svelte-1waspsf">`);
    Search($$renderer2, { size: 22 });
    $$renderer2.push(`<!----><input type="search"${attr("value", query)}${attr("placeholder", zh() ? "搜索工具，例如 MD5 tag:hash" : "Search tools, e.g. MD5 tag:hash")}${attr("aria-label", zh() ? "搜索所有工具" : "Search all tools")} autocomplete="off" class="svelte-1waspsf"/></div> <p class="search-help svelte-1waspsf">${escape_html(zh() ? "支持 tag:hash 精确筛选、-tag:hash 排除；可组合多个标签。" : "Use tag:hash to filter, -tag:hash to exclude, and combine tags.")}</p> <div class="filter-row svelte-1waspsf"${attr("aria-label", zh() ? "工具分类" : "Tool categories")}><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let filter = each_array[$$index];
      $$renderer2.push(`<button${attr("aria-pressed", category === filter)}${attr_class("svelte-1waspsf", void 0, { "current": category === filter })}>`);
      if (filter === "favorites") {
        $$renderer2.push("<!--[0-->");
        Heart($$renderer2, { size: 14 });
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->${escape_html(label(filter))}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (filtered().length) {
      $$renderer2.push(`<!--[0--><div class="tool-grid svelte-1waspsf"><!--[-->`);
      const each_array_1 = ensure_array_like(filtered());
      for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
        let tool = each_array_1[$$index_2];
        $$renderer2.push(`<article class="tool-card svelte-1waspsf"><a${attr("href", toolUrl(tool, locale()))} class="card-link svelte-1waspsf"${attr("aria-label", tool.name[locale()])}><div class="card-top svelte-1waspsf"><span class="card-icon svelte-1waspsf">`);
        ToolIcon($$renderer2, { id: tool.id });
        $$renderer2.push(`<!----></span> <span class="card-category svelte-1waspsf">${escape_html(categories[tool.category][locale()])}</span></div> <h3 class="svelte-1waspsf">${escape_html(tool.name[locale()])}</h3> <p class="svelte-1waspsf">${escape_html(tool.description[locale()])}</p> <span class="card-bottom svelte-1waspsf"><span class="card-open svelte-1waspsf">${escape_html(zh() ? "打开工具" : "Open tool")} `);
        Chevrons_right($$renderer2, { size: 15 });
        $$renderer2.push(`<!----></span> <span class="card-tags svelte-1waspsf"${attr("aria-label", zh() ? "工具标签" : "Tool tags")}><!--[-->`);
        const each_array_2 = ensure_array_like(tool.tags.slice(0, 3));
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let tag = each_array_2[$$index_1];
          $$renderer2.push(`<span class="card-tag svelte-1waspsf">#${escape_html(tagLabel(tag, locale()))}</span>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (tool.tags.length > 3) {
          $$renderer2.push(`<!--[0--><span class="tag-overflow svelte-1waspsf"${attr("title", tool.tags.slice(3).map((tag) => `#${tagLabel(tag, locale())}`).join(" · "))}${attr("aria-label", tool.tags.slice(3).map((tag) => tagLabel(tag, locale())).join(", "))}>+${escape_html(tool.tags.length - 3)}<span class="tag-popover svelte-1waspsf">${escape_html(tool.tags.slice(3).map((tag) => `#${tagLabel(tag, locale())}`).join(" · "))}</span></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></span></span></a><button${attr_class("favorite svelte-1waspsf", void 0, { "selected": preferences.favorites.includes(tool.id) })}${attr("aria-label", preferences.favorites.includes(tool.id) ? zh() ? "取消收藏" : "Remove favorite" : zh() ? "收藏工具" : "Add favorite")}${attr("aria-pressed", preferences.favorites.includes(tool.id))}>`);
        Heart($$renderer2, {
          size: 17,
          fill: preferences.favorites.includes(tool.id) ? "currentColor" : "none"
        });
        $$renderer2.push(`<!----></button></article>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push(`<!--[-1--><div class="no-results svelte-1waspsf">`);
      Search($$renderer2, { size: 32 });
      $$renderer2.push(`<!----> <h3 class="svelte-1waspsf">${escape_html(zh() ? "暂时没有匹配的工具" : "No tools found")}</h3> <p class="svelte-1waspsf">${escape_html(zh() ? "试试其他关键词，或查看全部分类。" : "Try a different keyword or browse all categories.")}</p> <button class="svelte-1waspsf">${escape_html(zh() ? "查看全部工具" : "Show all tools")}</button></div>`);
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
export {
  _page as default
};
