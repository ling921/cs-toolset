import { s as spread_props } from "./index.js";
import { I as Icon } from "./Icon.js";
function Arrow_up_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "arrow-up-right",
    "size": 24,
    "node": [
      ["path", { "d": "M7 7h10v10" }],
      ["path", { "d": "M7 17 17 7" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Chevron_down($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "chevron-down",
    "size": 24,
    "node": [["path", { "d": "m6 9 6 6 6-6" }]]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function X($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "x",
    "size": 24,
    "node": [
      ["path", { "d": "M18 6 6 18" }],
      ["path", { "d": "m6 6 12 12" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
export {
  Arrow_up_right as A,
  Chevron_down as C,
  X
};
