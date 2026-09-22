import { s as spread_props, a as attr, e as escape_html, b as attr_class, c as stringify, f as ensure_array_like, d as derived } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import { t as toolUrl, a as tools } from "../../chunks/catalog.js";
import { S as Search, p as preferences, s as searchTools } from "../../chunks/preferences.svelte.js";
import { I as Icon, s as siteConfig } from "../../chunks/Icon.js";
import { l as localeConfig, a as localeFromPath, d as defaultLocale } from "../../chunks/i18n.js";
import { L as Languages } from "../../chunks/languages.js";
import { C as Chevron_down, A as Arrow_up_right, X } from "../../chunks/x.js";
function Monitor($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "monitor",
    "size": 24,
    "node": [
      [
        "rect",
        { "width": "20", "height": "14", "x": "2", "y": "3", "rx": "2" }
      ],
      ["line", { "x1": "8", "x2": "16", "y1": "21", "y2": "21" }],
      ["line", { "x1": "12", "x2": "12", "y1": "17", "y2": "21" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Moon($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "moon",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Sun($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "sun",
    "size": 24,
    "node": [
      ["circle", { "cx": "12", "cy": "12", "r": "4" }],
      ["path", { "d": "M12 2v2" }],
      ["path", { "d": "M12 20v2" }],
      ["path", { "d": "m4.93 4.93 1.41 1.41" }],
      ["path", { "d": "m17.66 17.66 1.41 1.41" }],
      ["path", { "d": "M2 12h2" }],
      ["path", { "d": "M20 12h2" }],
      ["path", { "d": "m6.34 17.66-1.41 1.41" }],
      ["path", { "d": "m19.07 4.93-1.41 1.41" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    const locale = derived(() => localeFromPath(page.url.pathname, page.url.pathname === "/" && preferences.ready ? preferences.locale : defaultLocale));
    let query = "";
    let active = 0;
    let languageMenuOpen = false;
    const matches = derived(() => searchTools(tools, query, locale()).slice(0, 12));
    const zh = derived(() => locale() === "zh-CN");
    const shortcutLabel = derived(() => "Ctrl K");
    $$renderer2.push(`<div class="site-shell"><header class="site-header"><div class="header-inner"><a class="brand"${attr("href", `/${locale()}/`)}${attr("aria-label", zh() ? "Ling.Tools 首页" : "Ling.Tools home")}><span class="brand-mark" aria-hidden="true">>_</span><span>Ling<span class="brand-dot">.</span>Tools</span></a> <nav class="header-actions"${attr("aria-label", zh() ? "网站导航" : "Site navigation")}><button class="search-shortcut"${attr("aria-keyshortcuts", "Control+K")}${attr("aria-label", zh() ? "搜索全部工具" : "Search all tools")}>`);
    Search($$renderer2, { size: 17 });
    $$renderer2.push(`<!----><span>${escape_html(zh() ? "搜索工具" : "Search tools")}</span><kbd>${escape_html(shortcutLabel())}</kbd></button> <button class="icon-control mobile-search"${attr("aria-label", zh() ? "搜索全部工具" : "Search all tools")}>`);
    Search($$renderer2, { size: 20 });
    $$renderer2.push(`<!----></button> <div class="language-menu"><button class="language-select" type="button"${attr("title", zh() ? "切换语言" : "Change language")}${attr("aria-label", zh() ? "选择语言" : "Choose language")} aria-haspopup="menu"${attr("aria-expanded", languageMenuOpen)}>`);
    Languages($$renderer2, { size: 18, "aria-hidden": "true" });
    $$renderer2.push(`<!----> <span>${escape_html(localeConfig[locale()].label)}</span> `);
    Chevron_down($$renderer2, { class: "select-chevron", size: 14, "aria-hidden": "true" });
    $$renderer2.push(`<!----></button> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div${attr_class("theme-controls", void 0, {
      "theme-light": preferences.theme === "light",
      "theme-system": preferences.theme === "system",
      "theme-dark": preferences.theme === "dark"
    })}${attr("aria-label", zh() ? "主题" : "Theme")}><span class="theme-indicator" aria-hidden="true"></span> <button${attr("aria-label", zh() ? "浅色主题" : "Light theme")}${attr("title", zh() ? "浅色主题" : "Light theme")}${attr("aria-pressed", preferences.theme === "light")}${attr_class("", void 0, { "chosen": preferences.theme === "light" })}>`);
    Sun($$renderer2, { size: 17 });
    $$renderer2.push(`<!----></button> <button${attr("aria-label", zh() ? "系统主题" : "System theme")}${attr("title", zh() ? "系统主题" : "System theme")}${attr("aria-pressed", preferences.theme === "system")}${attr_class("", void 0, { "chosen": preferences.theme === "system" })}>`);
    Monitor($$renderer2, { size: 17 });
    $$renderer2.push(`<!----></button> <button${attr("aria-label", zh() ? "深色主题" : "Dark theme")}${attr("title", zh() ? "深色主题" : "Dark theme")}${attr("aria-pressed", preferences.theme === "dark")}${attr_class("", void 0, { "chosen": preferences.theme === "dark" })}>`);
    Moon($$renderer2, { size: 17 });
    $$renderer2.push(`<!----></button></div></nav></div></header> <main id="main" class="page-container">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> <footer class="site-footer"><div class="footer-inner"><div class="footer-brand"><span class="brand-mark small">>_</span><span>Ling.Tools</span><span class="footer-sep">·</span><span>© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Jing Ling</span></div> <nav${attr("aria-label", zh() ? "页脚" : "Footer")}><a href="https://github.com/ling921/ling-tools" target="_blank" rel="noopener noreferrer">GitHub `);
    Arrow_up_right($$renderer2, { size: 12 });
    $$renderer2.push(`<!----></a><a${attr("href", `/${stringify(locale())}/about/`)}>${escape_html(zh() ? "关于" : "About")}</a><a${attr("href", `/${stringify(locale())}/privacy/`)}>${escape_html(zh() ? "隐私" : "Privacy")}</a><span class="version">v${escape_html(siteConfig.version)} · ${escape_html(siteConfig.commit)}</span></nav></div></footer></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <dialog class="command-dialog"${attr("aria-label", zh() ? "搜索工具" : "Search tools")}><div class="command-box"><div class="command-search">`);
    Search($$renderer2, { size: 20 });
    $$renderer2.push(`<!----><input${attr("value", query)}${attr("placeholder", zh() ? "搜索开发者工具，支持 tag:hash..." : "Search developer tools; try tag:hash...")}${attr("aria-label", zh() ? "搜索工具" : "Search tools")}/><button${attr("aria-label", zh() ? "关闭" : "Close")}>`);
    X($$renderer2, { size: 19 });
    $$renderer2.push(`<!----></button></div> <div class="command-results" role="listbox"${attr("aria-label", zh() ? "搜索结果" : "Search results")}>`);
    const each_array_1 = ensure_array_like(matches());
    if (each_array_1.length !== 0) {
      $$renderer2.push("<!--[-->");
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let item = each_array_1[i];
        $$renderer2.push(`<a role="option"${attr("aria-selected", i === active)}${attr("href", toolUrl(item, locale()))}${attr_class("", void 0, { "active": i === active })}><span class="command-result-icon"><span aria-hidden="true">${escape_html(item.icon.slice(0, 1))}</span></span><span class="command-result-copy"><strong>${escape_html(item.name[locale()])}</strong><small>${escape_html(item.description[locale()])}</small></span>`);
        Arrow_up_right($$renderer2, { size: 15 });
        $$renderer2.push(`<!----></a>`);
      }
    } else {
      $$renderer2.push(`<!--[!--><p class="command-empty">${escape_html(zh() ? "没有匹配的工具，试试其他关键词。" : "No matching tools. Try another keyword.")}</p>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="command-hint"><span>↑ ↓ ${escape_html(zh() ? "选择" : "navigate")} · Enter ${escape_html(zh() ? "打开" : "open")}</span><span>Esc ${escape_html(zh() ? "关闭" : "close")}</span></div></div></dialog>`);
  });
}
export {
  _layout as default
};
