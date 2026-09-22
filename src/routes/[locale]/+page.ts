import type { EntryGenerator } from './$types';
import { locales } from '$lib/i18n';
export const entries: EntryGenerator = () => locales.map((locale) => ({ locale }));
