import { e as escape_html, a as attr, d as derived } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
import { S as Seo } from "../../chunks/Seo.js";
import { A as Arrow_left } from "../../chunks/arrow-left.js";
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const zh = derived(() => page.url.pathname.startsWith("/zh-CN/"));
    const locale = derived(() => zh() ? "zh-CN" : "en");
    Seo($$renderer2, {
      title: zh() ? "页面未找到" : "Page not found",
      description: zh() ? "这个页面不存在，请返回工具首页。" : "This page does not exist. Return to the tool directory.",
      locale: locale(),
      path: page.url.pathname,
      kind: "error"
    });
    $$renderer2.push(`<!----> <div class="not-found svelte-1j96wlh"><span class="svelte-1j96wlh">404</span> <h1 class="svelte-1j96wlh">${escape_html(zh() ? "这里没有找到工具" : "Nothing here yet")}</h1> <p class="svelte-1j96wlh">${escape_html(zh() ? "检查一下地址，或者回到首页搜索需要的工具。" : "Check the address or head home to find the tool you need.")}</p> <a${attr("href", `/${locale()}/`)} class="svelte-1j96wlh">`);
    Arrow_left($$renderer2, { size: 18 });
    $$renderer2.push(`<!---->${escape_html(zh() ? "返回首页" : "Back to tools")}</a></div>`);
  });
}
export {
  _error as default
};
