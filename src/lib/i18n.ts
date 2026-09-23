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

export const errorCopy = {
  en: {
    title: 'Page not found',
    description: 'This page does not exist. Return to the tool directory.',
    heading: 'Nothing here yet',
    body: 'Check the address or head home to find the tool you need.',
    back: 'Back to tools'
  },
  'zh-CN': {
    title: '页面未找到',
    description: '这个页面不存在，请返回工具首页。',
    heading: '这里没有找到工具',
    body: '检查一下地址，或者回到首页搜索需要的工具。',
    back: '返回首页'
  }
} satisfies Record<Locale, Record<'title' | 'description' | 'heading' | 'body' | 'back', string>>;

export const layoutCopy = {
  en: {
    brandHome: 'CS Toolset home',
    siteNavigation: 'Site navigation',
    searchAllTools: 'Search all tools',
    searchTools: 'Search tools',
    changeLanguage: 'Change language',
    chooseLanguage: 'Choose language',
    theme: 'Theme',
    lightTheme: 'Light theme',
    systemTheme: 'System theme',
    darkTheme: 'Dark theme',
    footer: 'Footer',
    about: 'About',
    privacy: 'Privacy',
    offline: 'You’re offline. Your tools still work.',
    dismiss: 'Dismiss',
    commandDialog: 'Search tools',
    searchPlaceholder: 'Search developer tools; try tag:hash...',
    searchResults: 'Search results',
    noMatchingTools: 'No matching tools. Try another keyword.',
    navigate: 'navigate',
    open: 'open',
    close: 'close',
    updateStatus: {
      failed: 'The update did not finish. Reload this page to try again.',
      applying: 'Switching to the new version…',
      ready: 'A new version is ready. Update when you’re done.'
    },
    updateAction: { failed: 'Reload page', applying: 'Updating…', ready: 'Update & refresh' }
  },
  'zh-CN': {
    brandHome: 'CS Toolset 首页',
    siteNavigation: '网站导航',
    searchAllTools: '搜索全部工具',
    searchTools: '搜索工具',
    changeLanguage: '切换语言',
    chooseLanguage: '选择语言',
    theme: '主题',
    lightTheme: '浅色主题',
    systemTheme: '系统主题',
    darkTheme: '深色主题',
    footer: '页脚',
    about: '关于',
    privacy: '隐私',
    offline: '当前离线，工具仍可使用。',
    dismiss: '关闭',
    commandDialog: '搜索工具',
    searchPlaceholder: '搜索开发者工具，支持 tag:hash...',
    searchResults: '搜索结果',
    noMatchingTools: '没有匹配的工具，试试其他关键词。',
    navigate: '选择',
    open: '打开',
    close: '关闭',
    updateStatus: {
      failed: '更新未完成，可重新加载本页。',
      applying: '正在切换到新版本…',
      ready: '有新版本可用。完成当前操作后更新。'
    },
    updateAction: { failed: '重新加载', applying: '正在更新…', ready: '更新并刷新' }
  }
} satisfies Record<
  Locale,
  Record<
    | 'brandHome'
    | 'siteNavigation'
    | 'searchAllTools'
    | 'searchTools'
    | 'changeLanguage'
    | 'chooseLanguage'
    | 'theme'
    | 'lightTheme'
    | 'systemTheme'
    | 'darkTheme'
    | 'footer'
    | 'about'
    | 'privacy'
    | 'offline'
    | 'dismiss'
    | 'commandDialog'
    | 'searchPlaceholder'
    | 'searchResults'
    | 'noMatchingTools'
    | 'navigate'
    | 'open'
    | 'close',
    string
  > & {
    updateStatus: Record<'failed' | 'applying' | 'ready', string>;
    updateAction: Record<'failed' | 'applying' | 'ready', string>;
  }
>;
