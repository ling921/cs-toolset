import type { ToolMeta, Locale, Category } from './types';
import { matchesTag, tagLabel } from './tags';

export function parseSearchQuery(query: string): {
  terms: string[];
  includeTags: string[];
  excludeTags: string[];
} {
  const includeTags: string[] = [];
  const excludeTags: string[] = [];
  const remaining = query.replace(
    /(^|\s)(-?tag):(?:"([^"]+)"|(\S+))/giu,
    (
      _whole,
      space: string,
      operator: string,
      quoted: string | undefined,
      plain: string | undefined
    ) => {
      const value = (quoted || plain || '').toLocaleLowerCase().trim();
      if (value) (operator.startsWith('-') ? excludeTags : includeTags).push(value);
      return space;
    }
  );
  return {
    terms: remaining.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean),
    includeTags,
    excludeTags
  };
}
export function searchTools(
  tools: ToolMeta[],
  query: string,
  locale: Locale,
  category: Category | 'all' | 'favorites' = 'all',
  favorites: string[] = []
): ToolMeta[] {
  const { terms: tokens, includeTags, excludeTags } = parseSearchQuery(query);
  return tools
    .filter(
      (t) =>
        (category === 'all' ||
          (category === 'favorites' ? favorites.includes(t.id) : t.category === category)) &&
        includeTags.every((needle) => t.tags.some((tag) => matchesTag(tag, needle))) &&
        excludeTags.every((needle) => !t.tags.some((tag) => matchesTag(tag, needle)))
    )
    .map((tool, index) => {
      const name = tool.name[locale].toLocaleLowerCase();
      const haystack = [
        ...Object.values(tool.name),
        ...Object.values(tool.description),
        ...tool.keywords,
        ...tool.tags.flatMap((tag) => [tag, tagLabel(tag, locale)]),
        tool.category
      ]
        .join(' ')
        .toLocaleLowerCase();
      const score = tokens.every((t) => haystack.includes(t))
        ? tokens.reduce(
            (sum, t) =>
              sum + (name === t ? 100 : name.startsWith(t) ? 30 : name.includes(t) ? 15 : 1),
            0
          )
        : -1;
      return { tool, index, score };
    })
    .filter((t) => t.score >= 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((t) => t.tool);
}
