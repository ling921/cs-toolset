import type { Locale, ToolId } from './types';
import { tools } from './catalog';
import { defaultLocale, isLocale, localeFromLanguageTag } from './i18n';
const KEY = 'cs-toolset:preferences:v1';
export const preferences = $state({
  theme: 'system' as 'system' | 'light' | 'dark',
  locale: defaultLocale as Locale,
  favorites: [] as ToolId[],
  recent: [] as ToolId[],
  ready: false
});
export function loadPreferences() {
  if (preferences.ready) return;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    preferences.theme = ['light', 'dark', 'system'].includes(raw.theme) ? raw.theme : 'system';
    preferences.locale = isLocale(raw.locale)
      ? raw.locale
      : localeFromLanguageTag(navigator.language);
    preferences.favorites = Array.isArray(raw.favorites)
      ? raw.favorites
          .filter((x: unknown) => tools.some((tool) => tool.id === x))
          .slice(0, tools.length)
      : [];
    preferences.recent = Array.isArray(raw.recent)
      ? raw.recent.filter((x: unknown) => typeof x === 'string').slice(0, 6)
      : [];
  } catch {
    /* Storage may be unavailable or stale. Preferences remain usable in memory. */
  }
  preferences.ready = true;
  applyTheme();
}
export function savePreferences() {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        theme: preferences.theme,
        locale: preferences.locale,
        favorites: preferences.favorites,
        recent: preferences.recent
      })
    );
  } catch {
    /* private mode */
  }
}
export function applyTheme() {
  const dark =
    preferences.theme === 'dark' ||
    (preferences.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}
export function toggleFavorite(id: ToolId) {
  preferences.favorites = preferences.favorites.includes(id)
    ? preferences.favorites.filter((x) => x !== id)
    : [...preferences.favorites, id];
  savePreferences();
}
export function visitTool(id: ToolId) {
  preferences.recent = [id, ...preferences.recent.filter((x) => x !== id)].slice(0, 6);
  savePreferences();
}
