import type { Locale, Localized } from './types';

export const localeConfig = {
  en: { label: 'English', htmlLang: 'en', ogLocale: 'en_US' },
  'zh-CN': { label: '简体中文', htmlLang: 'zh-CN', ogLocale: 'zh_CN' }
} satisfies Record<Locale, { label: string; htmlLang: string; ogLocale: string }>;

export const locales = Object.keys(localeConfig) as Locale[];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return value in localeConfig;
}

export function localeFromPath(pathname: string, fallback: Locale = defaultLocale): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : fallback;
}

/** Resolve a browser language tag against configured site locales, with English as fallback. */
export function localeFromLanguageTag(languageTag: string): Locale {
  const normalized = languageTag.toLowerCase();
  return (
    locales.find(
      (locale) =>
        normalized === locale.toLowerCase() ||
        normalized.startsWith(`${locale.slice(0, 2).toLowerCase()}-`)
    ) ?? defaultLocale
  );
}

/** Select localized content with a single, type-checked extension point for new languages. */
export function t<T>(locale: Locale, messages: Record<Locale, T>): T {
  return messages[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locales.find((candidate) => candidate !== locale) ?? defaultLocale;
}

export const localize = (locale: Locale, messages: Localized): string => t(locale, messages);
