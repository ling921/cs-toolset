import * as universal from '../entries/pages/_locale_/_layout.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/[locale]/+layout.ts";
export const imports = ["_app/immutable/nodes/2.5UKhNUW5.js","_app/immutable/chunks/RNgElSY1.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/chunks/B0XwC4Ot.js","_app/immutable/chunks/CeVF68qc.js","_app/immutable/chunks/B--_103R.js","_app/immutable/chunks/Ca2W0V82.js","_app/immutable/chunks/B_e80F_2.js","_app/immutable/chunks/BWhcg05g.js"];
export const stylesheets = [];
export const fonts = [];
