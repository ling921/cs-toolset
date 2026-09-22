const localeConfig = {
  en: { label: "English", htmlLang: "en", ogLocale: "en_US" },
  "zh-CN": { label: "简体中文", htmlLang: "zh-CN", ogLocale: "zh_CN" }
};
const locales = Object.keys(localeConfig);
const defaultLocale = "en";
function isLocale(value) {
  return value in localeConfig;
}
function localeFromPath(pathname, fallback = defaultLocale) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : fallback;
}
function t(locale, messages) {
  return messages[locale];
}
function otherLocale(locale) {
  return locales.find((candidate) => candidate !== locale) ?? defaultLocale;
}
export {
  localeFromPath as a,
  locales as b,
  defaultLocale as d,
  isLocale as i,
  localeConfig as l,
  otherLocale as o,
  t
};
