import { siteConfig } from './site';
import type { Locale, ToolMeta } from './types';
export type SeoKind = 'gateway' | 'home' | 'tool' | 'about' | 'privacy' | 'error';
export interface SeoProps {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  kind: SeoKind;
  tool?: ToolMeta;
  alternatePath?: string;
}
export function seoData({ title, description, locale, path, kind, tool, alternatePath }: SeoProps) {
  const url = new URL(path, siteConfig.origin).href;
  const alternate = alternatePath ? new URL(alternatePath, siteConfig.origin).href : undefined;
  const origin = siteConfig.origin;
  const alternates = alternatePath
    ? {
        en: locale === 'en' ? url : alternate!,
        'zh-CN': locale === 'zh-CN' ? url : alternate!,
        'x-default':
          kind === 'home' ? new URL('/', origin).href : locale === 'en' ? url : alternate!
      }
    : undefined;
  const graph: Record<string, unknown>[] = [];
  if (kind === 'gateway' || kind === 'home')
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CS Toolset',
      url: origin + '/',
      description,
      inLanguage: ['en', 'zh-CN']
    });
  if (kind === 'tool' && tool) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name[locale],
      url,
      description: tool.description[locale],
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any modern web browser',
      inLanguage: locale,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
    });
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: locale === 'zh-CN' ? '首页' : 'Home',
          item: origin + `/${locale}/`
        },
        { '@type': 'ListItem', position: 2, name: tool.name[locale], item: url }
      ]
    });
  }
  return {
    url,
    alternates,
    graph: JSON.stringify(graph).replace(/</g, '\\u003c'),
    image: origin + '/social-card.svg',
    robots: siteConfig.indexable && kind !== 'error' ? 'index, follow' : 'noindex, nofollow',
    title,
    description
  };
}
