import { s as spread_props } from "./index.js";
import { I as Icon } from "./Icon.js";
function Languages($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "languages",
    "size": 24,
    "node": [
      ["path", { "d": "m5 8 6 6" }],
      ["path", { "d": "m4 14 6-6 2-3" }],
      ["path", { "d": "M2 5h12" }],
      ["path", { "d": "M7 2h1" }],
      ["path", { "d": "m22 22-5-10-5 10" }],
      ["path", { "d": "M14 18h6" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
export {
  Languages as L
};
