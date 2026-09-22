import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DnMhpus1.js","_app/immutable/chunks/B--_103R.js","_app/immutable/chunks/Ca2W0V82.js","_app/immutable/chunks/B-wqvQ_y.js","_app/immutable/chunks/BnSxoX16.js","_app/immutable/chunks/BWhcg05g.js","_app/immutable/chunks/aLNUih3P.js","_app/immutable/chunks/B_e80F_2.js","_app/immutable/chunks/a7WNzUqX.js","_app/immutable/chunks/brtglY9Z.js","_app/immutable/chunks/cm56Xfwa.js","_app/immutable/chunks/Ba-wBnwQ.js","_app/immutable/chunks/B0XwC4Ot.js","_app/immutable/chunks/XnPbdMYW.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/chunks/CgeCYdAE.js","_app/immutable/chunks/CeVF68qc.js","_app/immutable/chunks/3u2pSQhE.js","_app/immutable/chunks/KDKEVW8P.js"];
export const stylesheets = ["_app/immutable/assets/0.DSbeeI-i.css"];
export const fonts = [];
