import { s as spread_props, d as derived } from "./index.js";
import { I as Icon } from "./Icon.js";
import { L as Languages } from "./languages.js";
function Arrow_left_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "arrow-left-right",
    "size": 24,
    "node": [
      ["path", { "d": "M8 3 4 7l4 4" }],
      ["path", { "d": "M4 7h16" }],
      ["path", { "d": "m16 21 4-4-4-4" }],
      ["path", { "d": "M20 17H4" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Binary($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "binary",
    "size": 24,
    "node": [
      [
        "rect",
        { "x": "14", "y": "14", "width": "4", "height": "6", "rx": "2" }
      ],
      [
        "rect",
        { "x": "6", "y": "4", "width": "4", "height": "6", "rx": "2" }
      ],
      ["path", { "d": "M6 20h4" }],
      ["path", { "d": "M14 10h4" }],
      ["path", { "d": "M6 14h2v6" }],
      ["path", { "d": "M14 4h2v6" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Braces($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "braces",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"
        }
      ],
      [
        "path",
        {
          "d": "M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
        }
      ]
    ],
    "aliases": ["curly-braces"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Calendar_clock($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "calendar-clock",
    "size": 24,
    "node": [
      ["path", { "d": "M16 14v2.2l1.6 1" }],
      ["path", { "d": "M16 2v3" }],
      [
        "path",
        {
          "d": "M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"
        }
      ],
      ["path", { "d": "M3 9h5.859" }],
      ["path", { "d": "M8 2v3" }],
      ["circle", { "cx": "16", "cy": "16", "r": "6" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Case_sensitive($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "case-sensitive",
    "size": 24,
    "node": [
      ["path", { "d": "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" }],
      ["path", { "d": "M22 9v7" }],
      ["path", { "d": "M3.304 13h6.392" }],
      ["circle", { "cx": "18.5", "cy": "12.5", "r": "3.5" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Chart_no_axes_column($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "chart-no-axes-column",
    "size": 24,
    "node": [
      ["path", { "d": "M5 21v-6" }],
      ["path", { "d": "M12 21V3" }],
      ["path", { "d": "M19 21V9" }]
    ],
    "aliases": ["bar-chart-2"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Clock($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "clock",
    "size": 24,
    "node": [
      ["circle", { "cx": "12", "cy": "12", "r": "10" }],
      ["path", { "d": "M12 6v6l4 2" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Code($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "code",
    "size": 24,
    "node": [
      ["path", { "d": "m16 18 6-6-6-6" }],
      ["path", { "d": "m8 6-6 6 6 6" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function File_code_corner($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "file-code-corner",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"
        }
      ],
      ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
      ["path", { "d": "m5 16-3 3 3 3" }],
      ["path", { "d": "m9 22 3-3-3-3" }]
    ],
    "aliases": ["file-code-2"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Fingerprint_pattern($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "fingerprint-pattern",
    "size": 24,
    "node": [
      ["path", { "d": "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" }],
      ["path", { "d": "M14 13.12c0 2.38 0 6.38-1 8.88" }],
      ["path", { "d": "M17.29 21.02c.12-.6.43-2.3.5-3.02" }],
      ["path", { "d": "M2 12a10 10 0 0 1 18-6" }],
      ["path", { "d": "M2 16h.01" }],
      ["path", { "d": "M21.8 16c.2-2 .131-5.354 0-6" }],
      ["path", { "d": "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" }],
      ["path", { "d": "M8.65 22c.21-.66.45-1.32.57-2" }],
      ["path", { "d": "M9 6.8a6 6 0 0 1 9 5.2v2" }]
    ],
    "aliases": ["fingerprint"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Git_compare_arrows($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "git-compare-arrows",
    "size": 24,
    "node": [
      ["circle", { "cx": "5", "cy": "6", "r": "3" }],
      ["path", { "d": "M12 6h5a2 2 0 0 1 2 2v7" }],
      ["path", { "d": "m15 9-3-3 3-3" }],
      ["circle", { "cx": "19", "cy": "18", "r": "3" }],
      ["path", { "d": "M12 18H7a2 2 0 0 1-2-2V9" }],
      ["path", { "d": "m9 15 3 3-3 3" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Globe($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "globe",
    "size": 24,
    "node": [
      ["circle", { "cx": "12", "cy": "12", "r": "10" }],
      [
        "path",
        { "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }
      ],
      ["path", { "d": "M2 12h20" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Hash($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "hash",
    "size": 24,
    "node": [
      ["line", { "x1": "4", "x2": "20", "y1": "9", "y2": "9" }],
      ["line", { "x1": "4", "x2": "20", "y1": "15", "y2": "15" }],
      ["line", { "x1": "10", "x2": "8", "y1": "3", "y2": "21" }],
      ["line", { "x1": "16", "x2": "14", "y1": "3", "y2": "21" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Id_card($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "id-card",
    "size": 24,
    "node": [
      ["path", { "d": "M13 19a4 4 0 00-8 0" }],
      ["path", { "d": "M16 10h2" }],
      ["path", { "d": "M16 14h2" }],
      ["circle", { "cx": "9", "cy": "12", "r": "3" }],
      [
        "rect",
        { "x": "2", "y": "5", "width": "20", "height": "14", "rx": "2" }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Image($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "image",
    "size": 24,
    "node": [
      [
        "rect",
        {
          "width": "18",
          "height": "18",
          "x": "3",
          "y": "3",
          "rx": "2",
          "ry": "2"
        }
      ],
      ["circle", { "cx": "9", "cy": "9", "r": "2" }],
      ["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Key_round($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "key-round",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
        }
      ],
      [
        "circle",
        { "cx": "16.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Link_2($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "link-2",
    "size": 24,
    "node": [
      ["path", { "d": "M9 17H7A5 5 0 0 1 7 7h2" }],
      ["path", { "d": "M15 7h2a5 5 0 1 1 0 10h-2" }],
      ["line", { "x1": "8", "x2": "16", "y1": "12", "y2": "12" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Link($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "link",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        }
      ],
      [
        "path",
        {
          "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function List_filter($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "list-filter",
    "size": 24,
    "node": [
      ["path", { "d": "M2 5h20" }],
      ["path", { "d": "M6 12h12" }],
      ["path", { "d": "M9 19h6" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Palette($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "palette",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"
        }
      ],
      [
        "circle",
        { "cx": "13.5", "cy": "6.5", "r": ".5", "fill": "currentColor" }
      ],
      [
        "circle",
        {
          "cx": "17.5",
          "cy": "10.5",
          "r": ".5",
          "fill": "currentColor"
        }
      ],
      [
        "circle",
        { "cx": "6.5", "cy": "12.5", "r": ".5", "fill": "currentColor" }
      ],
      [
        "circle",
        { "cx": "8.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Qr_code($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "qr-code",
    "size": 24,
    "node": [
      [
        "rect",
        { "width": "5", "height": "5", "x": "3", "y": "3", "rx": "1" }
      ],
      [
        "rect",
        { "width": "5", "height": "5", "x": "16", "y": "3", "rx": "1" }
      ],
      [
        "rect",
        { "width": "5", "height": "5", "x": "3", "y": "16", "rx": "1" }
      ],
      ["path", { "d": "M21 16h-3a2 2 0 0 0-2 2v3" }],
      ["path", { "d": "M21 21v.01" }],
      ["path", { "d": "M12 7v3a2 2 0 0 1-2 2H7" }],
      ["path", { "d": "M3 12h.01" }],
      ["path", { "d": "M12 3h.01" }],
      ["path", { "d": "M12 16v.01" }],
      ["path", { "d": "M16 12h1" }],
      ["path", { "d": "M21 12v.01" }],
      ["path", { "d": "M12 21v-1" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Regex($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "regex",
    "size": 24,
    "node": [
      ["path", { "d": "M17 3v10" }],
      ["path", { "d": "m12.67 5.5 8.66 5" }],
      ["path", { "d": "m12.67 10.5 8.66-5" }],
      [
        "path",
        {
          "d": "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"
        }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Shield_check($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "shield-check",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        }
      ],
      ["path", { "d": "m9 12 2 2 4-4" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Shuffle($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "shuffle",
    "size": 24,
    "node": [
      ["path", { "d": "m18 14 4 4-4 4" }],
      ["path", { "d": "m18 2 4 4-4 4" }],
      [
        "path",
        {
          "d": "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"
        }
      ],
      ["path", { "d": "M2 6h1.972a4 4 0 0 1 3.6 2.2" }],
      ["path", { "d": "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Table($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "table",
    "size": 24,
    "node": [
      ["path", { "d": "M12 3v18" }],
      [
        "rect",
        { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
      ],
      ["path", { "d": "M3 9h18" }],
      ["path", { "d": "M3 15h18" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Text_align_start($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "text-align-start",
    "size": 24,
    "node": [
      ["path", { "d": "M21 5H3" }],
      ["path", { "d": "M15 12H3" }],
      ["path", { "d": "M17 19H3" }]
    ],
    "aliases": ["text", "align-left"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function ToolIcon($$renderer, $$props) {
  let { id, size = 22 } = $$props;
  const icons = {
    string: Shuffle,
    hex: Binary,
    number: Hash,
    uuid: Fingerprint_pattern,
    password: Key_round,
    ids: Fingerprint_pattern,
    lorem: Text_align_start,
    json: Braces,
    yaml: File_code_corner,
    base64: Binary,
    url: Link,
    html: Code,
    hash: Shield_check,
    timestamp: Clock,
    jwt: Key_round,
    color: Palette,
    regex: Regex,
    diff: Git_compare_arrows,
    qr: Qr_code,
    cron: Calendar_clock,
    case: Case_sensitive,
    imageBase64: Image,
    radix: Binary,
    cnId: Id_card,
    csv: Table,
    unicode: Languages,
    urlInspect: Link,
    textStats: Chart_no_axes_column,
    lines: List_filter,
    slug: Link_2,
    base32: Binary,
    httpStatus: Globe,
    xml: File_code_corner
  };
  const Icon2 = derived(() => icons[id] || Arrow_left_right);
  if (Icon2()) {
    $$renderer.push("<!--[-->");
    Icon2()($$renderer, { size, strokeWidth: 1.75 });
    $$renderer.push("<!--]-->");
  } else {
    $$renderer.push("<!--[!-->");
    $$renderer.push("<!--]-->");
  }
}
export {
  Shield_check as S,
  ToolIcon as T
};
