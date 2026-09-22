// @ts-nocheck
import { error } from '@sveltejs/kit';
import { tools, findToolByPath, locales } from '$lib/catalog';
import { isLocale } from '$lib/i18n';
import type { EntryGenerator, PageLoad } from './$types';
export const entries: EntryGenerator = () =>
  locales.flatMap((locale) => [
    ...tools.map((t) => ({ locale, slug: t.path })),
    { locale, slug: 'about' },
    { locale, slug: 'privacy' }
  ]);
export const load = ({ params }: Parameters<PageLoad>[0]) => {
  if (!isLocale(params.locale)) error(404, 'Language not found');
  const slug = params.slug.replace(/\/$/, '');
  const tool = findToolByPath(slug);
  if (tool) return { locale: params.locale, tool, kind: 'tool' as const };
  if (slug === 'about' || slug === 'privacy')
    return {
      locale: params.locale,
      kind: slug as 'about' | 'privacy',
      tool: null
    };
  error(404, 'Tool not found');
};
