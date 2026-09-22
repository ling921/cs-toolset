import { error } from "@sveltejs/kit";
import { i as isLocale } from "../../../chunks/i18n.js";
const load = ({ params }) => {
  if (!isLocale(params.locale)) error(404, "Language not found");
  return { locale: params.locale };
};
export {
  load
};
