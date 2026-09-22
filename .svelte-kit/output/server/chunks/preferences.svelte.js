import { s as spread_props } from "./index.js";
import { I as Icon } from "./Icon.js";
import { m as matchesTag, b as tagLabel } from "./catalog.js";
import "clsx";
import { d as defaultLocale } from "./i18n.js";
function Search($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "search",
    "size": 24,
    "node": [
      ["path", { "d": "m21 21-4.34-4.34" }],
      ["circle", { "cx": "11", "cy": "11", "r": "8" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function parseSearchQuery(query) {
  const includeTags = [];
  const excludeTags = [];
  const remaining = query.replace(
    /(^|\s)(-?tag):(?:"([^"]+)"|(\S+))/giu,
    (_whole, space, operator, quoted, plain) => {
      const value = (quoted || plain || "").toLocaleLowerCase().trim();
      if (value) (operator.startsWith("-") ? excludeTags : includeTags).push(value);
      return space;
    }
  );
  return {
    terms: remaining.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean),
    includeTags,
    excludeTags
  };
}
function searchTools(tools, query, locale, category = "all", favorites = []) {
  const { terms: tokens, includeTags, excludeTags } = parseSearchQuery(query);
  return tools.filter(
    (t) => (category === "all" || (category === "favorites" ? favorites.includes(t.id) : t.category === category)) && includeTags.every((needle) => t.tags.some((tag) => matchesTag(tag, needle))) && excludeTags.every((needle) => !t.tags.some((tag) => matchesTag(tag, needle)))
  ).map((tool, index) => {
    const name = tool.name[locale].toLocaleLowerCase();
    const haystack = [
      ...Object.values(tool.name),
      ...Object.values(tool.description),
      ...tool.keywords,
      ...tool.tags.flatMap((tag) => [tag, tagLabel(tag, locale)]),
      tool.category
    ].join(" ").toLocaleLowerCase();
    const score = tokens.every((t) => haystack.includes(t)) ? tokens.reduce(
      (sum, t) => sum + (name === t ? 100 : name.startsWith(t) ? 30 : name.includes(t) ? 15 : 1),
      0
    ) : -1;
    return { tool, index, score };
  }).filter((t) => t.score >= 0).sort((a, b) => b.score - a.score || a.index - b.index).map((t) => t.tool);
}
const preferences = {
  theme: "system",
  locale: defaultLocale,
  favorites: [],
  ready: false
};
export {
  Search as S,
  preferences as p,
  searchTools as s
};
