// @ts-nocheck
import { error } from '@sveltejs/kit';
import { isLocale } from '$lib/i18n';
import type { LayoutLoad } from './$types';
export const load = ({ params }: Parameters<LayoutLoad>[0]) => {
  if (!isLocale(params.locale)) error(404, 'Language not found');
  return { locale: params.locale };
};
