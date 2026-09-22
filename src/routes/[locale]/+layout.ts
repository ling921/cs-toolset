import { error } from '@sveltejs/kit';
import { isLocale } from '$lib/i18n';
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = ({ params }) => {
  if (!isLocale(params.locale)) error(404, 'Language not found');
  return { locale: params.locale };
};
