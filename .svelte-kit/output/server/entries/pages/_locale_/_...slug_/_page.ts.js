import { error } from "@sveltejs/kit";
import { a as tools, f as findToolByPath } from "../../../../chunks/catalog.js";
import { b as locales, i as isLocale } from "../../../../chunks/i18n.js";
const entries = () => locales.flatMap((locale) => [
  ...tools.map((t) => ({ locale, slug: t.path })),
  { locale, slug: "about" },
  { locale, slug: "privacy" }
]);
const load = ({ params }) => {
  if (!isLocale(params.locale)) error(404, "Language not found");
  const slug = params.slug.replace(/\/$/, "");
  const tool = findToolByPath(slug);
  if (tool) return { locale: params.locale, tool, kind: "tool" };
  if (slug === "about" || slug === "privacy")
    return {
      locale: params.locale,
      kind: slug,
      tool: null
    };
  error(404, "Tool not found");
};
export {
  entries,
  load
};
