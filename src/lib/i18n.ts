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

export const homeCopy = {
  en: {
    allTools: 'All tools',
    favorites: 'Favorites',
    title: 'Free online developer tools for encoding, generating and converting',
    description:
      'Search free developer tools including JSON, Base64, passwords, regex, Cron and QR codes. Private browser-side processing and offline support.',
    eyebrow: 'A little toolkit for big ideas',
    heroStart: 'The small tools',
    heroEnd: 'that make a difference.',
    heroDescription:
      'Useful utilities in one place. Fast, thoughtfully made, and processed entirely in your browser.',
    privateByDefault: 'Private by default',
    worksOffline: 'Works offline',
    quickSearch: 'quick search',
    codeComment: 'save time for the good stuff',
    ready: 'ready when you are',
    directoryLabel: 'Tool directory',
    exploreEyebrow: 'EXPLORE THE TOOLS',
    exploreHeading: 'Explore the tools',
    exploreDescription: 'Find what you need and get going.',
    searchPlaceholder: 'Search tools, e.g. MD5 tag:hash',
    searchLabel: 'Search all tools',
    searchHelp: 'Use tag:hash to filter, -tag:hash to exclude, and combine tags.',
    categoriesLabel: 'Tool categories',
    openTool: 'Open tool',
    tagsLabel: 'Tool tags',
    addFavorite: 'Add favorite',
    removeFavorite: 'Remove favorite',
    noResultsHeading: 'No tools found',
    noResultsDescription: 'Try a different keyword or browse all categories.',
    showAll: 'Show all tools'
  },
  'zh-CN': {
    allTools: '全部工具',
    favorites: '已收藏',
    title: '免费在线开发者工具：编码、生成与转换',
    description:
      '搜索免费的开发者工具：JSON、Base64、密码、正则、Cron、二维码等。纯静态网站，数据在浏览器本地处理，并支持离线使用。',
    eyebrow: '为开发者准备的轻量工具箱',
    heroStart: '开发日常，',
    heroEnd: '从这里开始。',
    heroDescription:
      '用得上的工具，集中在这里。快速查找、即开即用，所有数据都在你的浏览器中完成处理。',
    privateByDefault: '隐私优先',
    worksOffline: '离线可用',
    quickSearch: '快捷搜索',
    codeComment: '为灵感腾出空间',
    ready: '准备就绪',
    directoryLabel: '全部工具',
    exploreEyebrow: '探索工具',
    exploreHeading: '探索工具',
    exploreDescription: '找到需要的，直接开始。',
    searchPlaceholder: '搜索工具，例如 MD5 tag:hash',
    searchLabel: '搜索所有工具',
    searchHelp: '支持 tag:hash 精确筛选、-tag:hash 排除；可组合多个标签。',
    categoriesLabel: '工具分类',
    openTool: '打开工具',
    tagsLabel: '工具标签',
    addFavorite: '收藏工具',
    removeFavorite: '取消收藏',
    noResultsHeading: '暂时没有匹配的工具',
    noResultsDescription: '试试其他关键词，或查看全部分类。',
    showAll: '查看全部工具'
  }
} satisfies Record<Locale, Record<string, string>>;

export const toolPageCopy = {
  en: {
    breadcrumbs: 'Breadcrumb',
    home: 'Home',
    guideEyebrow: 'GUIDE & CONTEXT',
    aboutHeading: 'About this tool',
    howToHeading: 'How to use it',
    example: 'Example',
    relatedEyebrow: 'RELATED TOOLS',
    relatedHeading: 'Related tools',
    privacyPromise: 'Your inputs are processed on this device only.',
    backToTools: 'Back to all tools'
  },
  'zh-CN': {
    breadcrumbs: '面包屑导航',
    home: '首页',
    guideEyebrow: '使用说明',
    aboutHeading: '关于这个工具',
    howToHeading: '如何使用',
    example: '示例',
    relatedEyebrow: '接下来试试',
    relatedHeading: '相关工具',
    privacyPromise: '所有输入只在此设备处理，不会上传。',
    backToTools: '返回工具首页'
  }
} satisfies Record<Locale, Record<string, string>>;
