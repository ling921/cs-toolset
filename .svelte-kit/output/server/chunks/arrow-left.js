import { s as spread_props } from "./index.js";
import { I as Icon } from "./Icon.js";
function Arrow_left($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "arrow-left",
    "size": 24,
    "node": [
      ["path", { "d": "m12 19-7-7 7-7" }],
      ["path", { "d": "M19 12H5" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
export {
  Arrow_left as A
};
