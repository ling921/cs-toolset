import { s as spread_props, ab as run, a as attr, e as escape_html, f as ensure_array_like, b as attr_class, d as derived, c as stringify } from "../../../../chunks/index.js";
import { S as Seo } from "../../../../chunks/Seo.js";
import { S as Shield_check, T as ToolIcon } from "../../../../chunks/ToolIcon.js";
import { t, o as otherLocale } from "../../../../chunks/i18n.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { C as Chevron_down, X, A as Arrow_up_right } from "../../../../chunks/x.js";
import { t as toolUrl, c as categories, a as tools } from "../../../../chunks/catalog.js";
import { A as Arrow_left } from "../../../../chunks/arrow-left.js";
function Book_open($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "book-open",
    "size": 24,
    "node": [
      ["path", { "d": "M12 5v16" }],
      [
        "path",
        {
          "d": "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"
        }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Chevron_right($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "chevron-right",
    "size": 24,
    "node": [["path", { "d": "m9 18 6-6-6-6" }]]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Columns_2($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "columns-2",
    "size": 24,
    "node": [
      [
        "rect",
        { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
      ],
      ["path", { "d": "M12 3v18" }]
    ],
    "aliases": ["columns"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Eye_off($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "eye-off",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
        }
      ],
      ["path", { "d": "M14.084 14.158a3 3 0 0 1-4.242-4.242" }],
      [
        "path",
        {
          "d": "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
        }
      ],
      ["path", { "d": "m2 2 20 20" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Eye($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "eye",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
        }
      ],
      ["circle", { "cx": "12", "cy": "12", "r": "3" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Lightbulb($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "lightbulb",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"
        }
      ],
      ["path", { "d": "M9 18h6" }],
      ["path", { "d": "M10 22h4" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Play($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "play",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
        }
      ]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Rotate_ccw($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "rotate-ccw",
    "size": 24,
    "node": [
      [
        "path",
        { "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }
      ],
      ["path", { "d": "M3 3v5h5" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Rows_3($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "rows-3",
    "size": 24,
    "node": [
      [
        "rect",
        { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }
      ],
      ["path", { "d": "M21 9H3" }],
      ["path", { "d": "M21 15H3" }]
    ],
    "aliases": ["panels-top-bottom"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Sliders_horizontal($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "sliders-horizontal",
    "size": 24,
    "node": [
      ["path", { "d": "M10 5H3" }],
      ["path", { "d": "M12 19H3" }],
      ["path", { "d": "M14 3v4" }],
      ["path", { "d": "M16 17v4" }],
      ["path", { "d": "M21 12h-9" }],
      ["path", { "d": "M21 19h-5" }],
      ["path", { "d": "M21 5h-7" }],
      ["path", { "d": "M8 10v4" }],
      ["path", { "d": "M8 12H3" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Terminal($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "terminal",
    "size": 24,
    "node": [
      ["path", { "d": "M12 19h8" }],
      ["path", { "d": "m4 17 6-6-6-6" }]
    ]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
function Triangle_alert($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconData = {
    "name": "triangle-alert",
    "size": 24,
    "node": [
      [
        "path",
        {
          "d": "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
        }
      ],
      ["path", { "d": "M12 9v4" }],
      ["path", { "d": "M12 17h.01" }]
    ],
    "aliases": ["alert-triangle"]
  };
  Icon($$renderer, spread_props([props, { icon: iconData }]));
}
const l = (en, zh) => ({ en, "zh-CN": zh });
const field = (key, en, zh, type, value, extra = {}) => ({ key, label: l(en, zh), type, default: value, ...extra });
const num = (key, en, zh, value, min, max) => field(key, en, zh, "number", value, { min, max });
const select = (key, en, zh, value, values) => field(key, en, zh, "select", value, {
  options: values.map(([value2, en2, zh2]) => ({ value: value2, label: l(en2, zh2) }))
});
const check = (key, en, zh, checked = true) => field(key, en, zh, "checkbox", String(checked));
const input = (value = "") => field("input", "Input", "输入", "textarea", value);
const count = () => num("count", "Quantity", "数量", "1", 1, 1e3);
const length = (value = "16", max = 4096) => num("length", "Length", "长度", value, 1, max);
const charset = () => [
  check("lower", "Lowercase a–z", "小写 a–z"),
  check("upper", "Uppercase A–Z", "大写 A–Z"),
  check("digits", "Digits 0–9", "数字 0–9"),
  check("symbols", "Symbols", "符号", false)
];
const encoding = () => select("encoding", "Output encoding", "输出编码", "hex", [
  ["hex", "Hex", "十六进制"],
  ["base64", "Base64", "Base64"]
]);
const direction = () => select("mode", "Operation", "操作", "encode", [
  ["encode", "Encode", "编码"],
  ["decode", "Decode", "解码"]
]);
const toolFields = {
  string: [
    length(),
    count(),
    ...charset(),
    field("custom", "Additional characters", "追加自定义字符", "text", ""),
    check(
      "ambiguous",
      "Exclude visually similar characters (0O1Il)",
      "排除易混淆字符（0O1Il）",
      false
    )
  ],
  hex: [length("32"), count(), check("uppercase", "Uppercase", "大写", false)],
  number: [
    select("mode", "Number type", "数字类型", "integer", [
      ["integer", "Integer", "整数"],
      ["decimal", "Decimal", "小数"]
    ]),
    field("min", "Minimum", "最小值", "number", "0", { step: "any" }),
    field("max", "Maximum", "最大值", "number", "100", { step: "any" }),
    check("includeMin", "Include minimum", "包含最小值"),
    check("includeMax", "Include maximum", "包含最大值"),
    num("precision", "Decimal places (decimal mode)", "小数位数（小数模式）", "2", 0, 10),
    count()
  ],
  uuid: [
    count(),
    check("uppercase", "Uppercase", "大写", false),
    check("hyphens", "Include hyphens", "保留连字符")
  ],
  password: [
    length("24", 256),
    count(),
    ...charset(),
    field("exclude", "Exclude characters", "排除字符", "text", ""),
    check(
      "ambiguous",
      "Exclude visually similar characters (0O1Il)",
      "排除易混淆字符（0O1Il）",
      true
    )
  ],
  ids: [
    select("mode", "Identifier type", "标识符类型", "ulid", [
      ["ulid", "ULID", "ULID"],
      ["nanoid", "NanoID", "NanoID"]
    ]),
    length("21", 256),
    field(
      "alphabet",
      "NanoID alphabet",
      "NanoID 字母表",
      "text",
      "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      {
        hint: l(
          "Used only for NanoID; ULIDs always contain 26 characters.",
          "仅用于 NanoID；ULID 固定为 26 个字符。"
        )
      }
    ),
    count()
  ],
  lorem: [
    select("mode", "Generate", "生成单位", "paragraphs", [
      ["words", "Words", "单词"],
      ["sentences", "Sentences", "句子"],
      ["paragraphs", "Paragraphs", "段落"]
    ]),
    num("count", "Quantity", "数量", "3", 1, 1e3)
  ],
  json: [
    input('{"name":"Ling.Tools","features":["private","offline"],"ready":true}'),
    select("mode", "Operation", "操作", "pretty", [
      ["pretty", "Format", "格式化"],
      ["minify", "Minify", "压缩"],
      ["sort", "Sort keys recursively", "递归排序键"],
      ["validate", "Validate", "校验"]
    ]),
    num("indent", "Indent spaces", "缩进空格", "2", 1, 8)
  ],
  yaml: [
    input("name: Ling.Tools\nfeatures:\n  - private\n  - offline"),
    select("mode", "Direction", "转换方向", "toJson", [
      ["toJson", "YAML → JSON", "YAML → JSON"],
      ["toYaml", "JSON → YAML", "JSON → YAML"]
    ])
  ],
  base64: [
    input("Hello, 世界 👋"),
    direction(),
    check(
      "urlSafe",
      "Base64URL alphabet (omit padding on encode)",
      "Base64URL 字母表（编码时省略填充）",
      false
    )
  ],
  url: [
    input("Hello 世界 & tools"),
    direction(),
    select("scope", "Encoding scope", "编码范围", "component", [
      ["component", "URI component", "URI 组件"],
      ["uri", "Complete URI", "完整 URI"]
    ])
  ],
  html: [input('<div title="Hello">Tom & Jerry</div>'), direction()],
  hash: [
    input("Hello, world!"),
    select("mode", "Operation", "操作", "hash", [
      ["hash", "Hash", "哈希"],
      ["hmac", "HMAC", "HMAC"],
      ["pbkdf2", "PBKDF2", "PBKDF2"]
    ]),
    select("algorithm", "Algorithm", "算法", "sha256", [
      ["md5", "MD5 — compatibility only", "MD5 — 仅兼容用途"],
      ["sha1", "SHA-1 — compatibility only", "SHA-1 — 仅兼容用途"],
      ["sha256", "SHA-256", "SHA-256"],
      ["sha384", "SHA-384", "SHA-384"],
      ["sha512", "SHA-512", "SHA-512"]
    ]),
    field("key", "HMAC secret key (UTF-8)", "HMAC 密钥（UTF-8）", "password", ""),
    field("salt", "PBKDF2 salt (UTF-8)", "PBKDF2 盐（UTF-8）", "text", "change-this-salt"),
    num("iterations", "PBKDF2 iterations", "PBKDF2 迭代次数", "600000", 1, 2e6),
    num("bytes", "PBKDF2 output bytes", "PBKDF2 输出字节数", "32", 1, 256),
    encoding()
  ],
  timestamp: [
    field(
      "input",
      "Timestamp or date (leave blank for now)",
      "时间戳或日期（留空使用当前时间）",
      "text",
      ""
    ),
    select("mode", "Input type", "输入类型", "seconds", [
      ["seconds", "Unix seconds", "Unix 秒"],
      ["milliseconds", "Unix milliseconds", "Unix 毫秒"],
      ["date", "Date / ISO 8601", "日期 / ISO 8601"]
    ]),
    select("zone", "Interpret dates without an offset as", "无偏移日期的解析时区", "utc", [
      ["utc", "UTC", "UTC"],
      ["local", "Browser local time", "浏览器本地时间"]
    ])
  ],
  jwt: [
    select("mode", "Operation", "操作", "decode", [
      ["decode", "Decode / verify", "解码 / 验签"],
      ["encode", "Sign / encode", "签发 / 编码"]
    ]),
    input(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxpbmciLCJpYXQiOjE1MTYyMzkwMjJ9.signature"
    ),
    field(
      "header",
      "Extra header JSON (encode only)",
      "额外 Header JSON（仅编码）",
      "textarea",
      '{"typ":"JWT"}'
    ),
    field(
      "payload",
      "Payload JSON (encode only)",
      "Payload JSON（仅编码）",
      "textarea",
      '{"sub":"123","name":"Ling"}'
    ),
    select("algorithm", "Signing algorithm (encode only)", "签名算法（仅编码）", "HS256", [
      ["HS256", "HS256", "HS256"],
      ["HS384", "HS384", "HS384"],
      ["HS512", "HS512", "HS512"]
    ]),
    field(
      "secret",
      "HMAC secret (at least 32/48/64 UTF-8 bytes)",
      "HMAC 密钥（至少 32/48/64 UTF-8 字节）",
      "password",
      ""
    )
  ],
  color: [
    field("input", "Color", "颜色", "text", "#6366f1", {
      hint: l(
        "HEX, rgb(), hsl(), hsv(), or cmyk(). HSV/CMYK components use percentages.",
        "支持 HEX、rgb()、hsl()、hsv()、cmyk()；HSV/CMYK 分量使用百分比。"
      )
    }),
    field("background", "Contrast background", "对比度背景颜色", "color", "#ffffff")
  ],
  regex: [
    field(
      "pattern",
      "Regular expression (without / delimiters)",
      "正则表达式（不含 / 分隔符）",
      "text",
      "(?<word>\\w+)"
    ),
    field("flags", "Flags", "标志", "text", "g"),
    input("Hello world 123"),
    field("replacement", "Replacement pattern", "替换模式", "text", "[$&]", {
      hint: l(
        "JavaScript replacement syntax supports $&, $1, and $<name>.",
        "支持 JavaScript 替换语法 $&、$1、$<name>。"
      )
    })
  ],
  diff: [
    field("before", "Original text", "原始文本", "textarea", "Hello world\nA developer toolkit."),
    field(
      "after",
      "Changed text",
      "修改后文本",
      "textarea",
      "Hello Ling\nA private developer toolkit."
    ),
    select("mode", "Compare by", "比较粒度", "lines", [
      ["chars", "Characters", "字符"],
      ["words", "Words", "单词"],
      ["lines", "Lines", "行"]
    ]),
    select("language", "Code language", "代码语言", "plain", [
      ["plain", "Plain text", "纯文本"],
      ["javascript", "JavaScript", "JavaScript"],
      ["typescript", "TypeScript", "TypeScript"],
      ["json", "JSON", "JSON"],
      ["yaml", "YAML", "YAML"],
      ["xml", "HTML / XML", "HTML / XML"],
      ["css", "CSS", "CSS"],
      ["sql", "SQL", "SQL"]
    ])
  ],
  qr: [
    input("https://example.com"),
    num("size", "Image width (px)", "图像宽度（px）", "320", 128, 2048),
    select("level", "Error correction", "纠错等级", "M", [
      ["L", "L — 7%", "L — 7%"],
      ["M", "M — 15%", "M — 15%"],
      ["Q", "Q — 25%", "Q — 25%"],
      ["H", "H — 30%", "H — 30%"]
    ]),
    field("foreground", "Foreground", "前景色", "color", "#111827"),
    field("background", "Background", "背景色", "color", "#ffffff")
  ],
  cron: [
    field(
      "input",
      "Cron expression (5 or 6 fields)",
      "Cron 表达式（5 或 6 个字段）",
      "text",
      "*/15 * * * *"
    ),
    select("zone", "Schedule timezone", "计划时区", "local", [
      ["local", "Browser local timezone", "浏览器本地时区"],
      ["utc", "UTC", "UTC"]
    ]),
    field(
      "start",
      "Start from (ISO 8601, blank for now)",
      "起算时间（ISO 8601，留空使用当前时间）",
      "text",
      ""
    ),
    num("count", "Upcoming executions", "后续执行次数", "10", 1, 100)
  ],
  case: [
    input("hello world developer tools"),
    select("mode", "Output case", "转换格式", "camel", [
      ["camel", "camelCase", "camelCase"],
      ["pascal", "PascalCase", "PascalCase"],
      ["snake", "snake_case", "snake_case"],
      ["kebab", "kebab-case", "kebab-case"],
      ["constant", "CONSTANT_CASE", "CONSTANT_CASE"],
      ["title", "Title Case", "Title Case"],
      ["lower", "lowercase", "小写"],
      ["upper", "UPPERCASE", "大写"],
      ["sentence", "Sentence case", "句首大写"]
    ])
  ],
  imageBase64: [
    select("mode", "Operation", "操作", "decode", [
      ["encode", "Image → Base64", "图片 → Base64"],
      ["decode", "Base64 → image", "Base64 → 图片"]
    ]),
    input("data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=")
  ],
  radix: [
    input("FF"),
    num("from", "Source base", "原始进制", "16", 2, 36),
    num("to", "Target base", "目标进制", "10", 2, 36)
  ],
  cnId: [
    select("mode", "Operation", "操作", "generate", [
      ["generate", "Generate test numbers", "生成测试号码"],
      ["validate", "Validate a number", "校验号码"]
    ]),
    field("input", "Number to validate", "待校验号码", "text", "11010519491231002X"),
    field("region", "Six-digit region code", "六位地区代码", "text", "110105"),
    field("birth", "Birth date (YYYY-MM-DD)", "出生日期（YYYY-MM-DD）", "text", "1990-01-01"),
    select("sex", "Sequence parity", "顺序码性别", "random", [
      ["random", "Random", "随机"],
      ["male", "Odd / male", "奇数 / 男"],
      ["female", "Even / female", "偶数 / 女"]
    ]),
    num("count", "Quantity", "数量", "1", 1, 100)
  ],
  csv: [
    input("name,age\nAda,36"),
    select("mode", "Direction", "转换方向", "toJson", [
      ["toJson", "CSV → JSON", "CSV → JSON"],
      ["toCsv", "JSON → CSV", "JSON → CSV"]
    ])
  ],
  unicode: [input("Hello, 世界 👋")],
  urlInspect: [input("https://example.com/path?q=hello&q=world#top")],
  textStats: [input("Hello world!\n你好，世界。")],
  lines: [
    input("pear\napple\npear"),
    select("mode", "Operation", "操作", "unique", [
      ["unique", "Remove duplicates", "去重"],
      ["sort", "Sort A–Z", "升序排序"],
      ["reverseSort", "Sort Z–A", "降序排序"],
      ["reverse", "Reverse lines", "反转行顺序"]
    ]),
    check("ignoreCase", "Ignore case", "忽略大小写"),
    check("removeEmpty", "Remove empty lines", "移除空行", false)
  ],
  slug: [
    input("Hello, World!"),
    select("separator", "Separator", "分隔符", "-", [
      ["-", "Hyphen (-)", "连字符 (-)"],
      ["_", "Underscore (_)", "下划线 (_)"]
    ]),
    check("unicode", "Keep non-Latin letters", "保留非拉丁文字")
  ],
  base32: [input("foo"), direction(), check("padding", "Include padding", "包含填充")],
  httpStatus: [
    field("input", "HTTP status code", "HTTP 状态码", "number", "404", { min: 100, max: 599 })
  ],
  xml: [
    input("<root><item>Hi</item></root>"),
    select("mode", "Operation", "操作", "format", [
      ["format", "Format XML", "格式化 XML"],
      ["validate", "Validate XML", "校验 XML"]
    ])
  ]
};
function getDefaults(id) {
  return Object.fromEntries(toolFields[id].map((field2) => [field2.key, field2.default]));
}
function ToolWorkbench($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const copyMessages = {
      updated: { en: "Your result is ready.", "zh-CN": "结果已更新。" },
      defaultsRestored: {
        en: "Defaults restored and result cleared.",
        "zh-CN": "已恢复默认设置并清除结果。"
      },
      copied: {
        en: "Result copied to your clipboard.",
        "zh-CN": "结果已复制到剪贴板。"
      },
      imageTooLarge: {
        en: "Image must be 2 MiB or smaller.",
        "zh-CN": "图片不能超过 2 MiB。"
      },
      imageDownloaded: { en: "Image download started.", "zh-CN": "图片下载已开始。" },
      downloadStarted: { en: "Download started.", "zh-CN": "下载已开始。" },
      svgDownloaded: { en: "SVG download started.", "zh-CN": "SVG 下载已开始。" },
      pngDownloaded: { en: "PNG download started.", "zh-CN": "PNG 下载已开始。" },
      diffView: { en: "Diff view", "zh-CN": "差异视图" },
      inline: { en: "Inline", "zh-CN": "内联" },
      sideBySide: { en: "Side by side", "zh-CN": "并排" },
      viewFullscreen: { en: "View diff full screen", "zh-CN": "全屏查看差异" },
      added: { en: "Added", "zh-CN": "新增" },
      removed: { en: "Removed", "zh-CN": "删除" },
      diffResult: { en: "Difference comparison", "zh-CN": "差异比较结果" },
      splitDiffResult: {
        en: "Side-by-side difference comparison",
        "zh-CN": "并排差异比较结果"
      },
      original: { en: "Original", "zh-CN": "原始文本" },
      changed: { en: "Changed", "zh-CN": "修改后文本" },
      emptyResult: { en: "(Empty result)", "zh-CN": "（空结果）" },
      structuredResult: {
        en: "Structured result, select to copy",
        "zh-CN": "结构化结果，可选中复制"
      },
      fullscreenDiff: { en: "Full-screen difference comparison", "zh-CN": "全屏差异比较" },
      differenceComparison: { en: "Difference comparison", "zh-CN": "差异比较" },
      close: { en: "Close", "zh-CN": "关闭" },
      workspace: { en: "Tool workspace", "zh-CN": "工具工作区" },
      inputSettings: { en: "Input & settings", "zh-CN": "输入与设置" },
      configureInput: { en: "Configure tool input", "zh-CN": "配置工具输入" },
      hideValue: { en: "Hide value", "zh-CN": "隐藏内容" },
      showValue: { en: "Show value", "zh-CN": "显示内容" },
      chooseImage: {
        en: "Choose a local image (up to 2 MiB)",
        "zh-CN": "选择本地图片（最大 2 MiB）"
      },
      jwtNotice: {
        en: "Without a secret, decoding does not verify the signature. A valid signature alone does not establish trust. Secrets stay on this device.",
        "zh-CN": "未填写密钥时仅解码；验签成功也不代表签发者可信。密钥只在本机使用，不会保存。"
      },
      hashNotice: {
        en: "MD5 and SHA-1 are for legacy compatibility only. Do not use them for security or password storage.",
        "zh-CN": "MD5 和 SHA-1 仅适用于旧系统兼容，不适合安全保护或密码存储。"
      },
      working: { en: "Working…", "zh-CN": "处理中…" },
      runTool: { en: "Run tool", "zh-CN": "运行工具" },
      reset: { en: "Reset", "zh-CN": "重置" },
      localPrivacy: {
        en: "Processed in your browser. Your input is never uploaded or saved.",
        "zh-CN": "在你的浏览器本地处理，输入不会被上传或保存。"
      },
      result: { en: "Result", "zh-CN": "结果" },
      characters: { en: "characters", "zh-CN": "字符" },
      line: { en: "line", "zh-CN": "行" },
      lines: { en: "lines", "zh-CN": "行" },
      downloadResult: { en: "Download result", "zh-CN": "下载结果" },
      colorPreview: { en: "Color preview", "zh-CN": "颜色预览" },
      contrast: { en: "Contrast", "zh-CN": "对比度" },
      aaLarge: { en: "AA large text", "zh-CN": "大字 AA" },
      belowAa: { en: "Below AA", "zh-CN": "未达标" },
      convertedImage: { en: "Converted image preview", "zh-CN": "转换后的图片预览" },
      bytes: { en: "bytes", "zh-CN": "字节" },
      downloadImage: { en: "Download image", "zh-CN": "下载图片" },
      qrImage: { en: "Generated QR code", "zh-CN": "生成的二维码" },
      downloadPng: { en: "Download PNG", "zh-CN": "下载 PNG" },
      downloadSvg: { en: "Download SVG", "zh-CN": "下载 SVG" },
      toolResult: { en: "Tool result, select to copy", "zh-CN": "工具结果，可选中复制" },
      ready: { en: "Ready to use", "zh-CN": "准备就绪" },
      copiedButton: { en: "Copied!", "zh-CN": "已复制" },
      copyAll: { en: "Copy all", "zh-CN": "复制全部" },
      readyHeading: { en: "Ready when you are", "zh-CN": "让灵感开始运行" },
      emptyHint: {
        en: "Set up your input and run the tool. Your result will appear right here.",
        "zh-CN": "调整左侧的输入与设置，点击「运行工具」，结果就会显示在这里。"
      },
      localTag: { en: "Private · Instant · Local", "zh-CN": "私密 · 即时 · 本地" },
      pngFailure: {
        en: "Could not create a PNG. Try downloading the SVG instead.",
        "zh-CN": "无法生成 PNG，请尝试下载 SVG。"
      },
      processingFailure: {
        en: "Something went wrong. Check your input and try again.",
        "zh-CN": "处理失败，请检查输入后重试。"
      },
      clipboardUnavailable: {
        en: "Clipboard access is unavailable. Select the result and copy it manually.",
        "zh-CN": "无法访问剪贴板，请选中结果并手动复制。"
      },
      unsupportedImage: {
        en: "Only PNG, JPEG, GIF and WebP are supported.",
        "zh-CN": "仅支持 PNG、JPEG、GIF 与 WebP。"
      }
    };
    let { tool, locale } = $$props;
    let input2 = run(() => getDefaults(tool.id));
    let status = "";
    let busy = false;
    let revealPasswords = {};
    let diffView = "inline";
    const fields = derived(() => toolFields[tool.id]);
    const message = (key) => t(locale, copyMessages[key]);
    $$renderer2.push(`<div class="workbench svelte-1pw1utv"${attr("aria-label", message("workspace"))}><form class="panel input-panel svelte-1pw1utv"><div class="panel-heading svelte-1pw1utv"><div class="heading-label svelte-1pw1utv">`);
    Sliders_horizontal($$renderer2, { size: 17, strokeWidth: 1.8 });
    $$renderer2.push(`<!----> <h2 class="svelte-1pw1utv">${escape_html(message("inputSettings"))}</h2></div> <span class="step-label svelte-1pw1utv">01</span></div> <fieldset${attr("disabled", busy, true)} class="svelte-1pw1utv"><legend class="sr-only svelte-1pw1utv">${escape_html(message("configureInput"))}</legend> <div class="fields svelte-1pw1utv"><!--[-->`);
    const each_array = ensure_array_like(fields());
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let field2 = each_array[$$index_1];
      if (field2.type === "checkbox") {
        $$renderer2.push(`<!--[0--><div class="field checkbox-field svelte-1pw1utv"><label class="checkbox-label svelte-1pw1utv"${attr("for", `input-${tool.id}-${field2.key}`)}><input${attr("id", `input-${tool.id}-${field2.key}`)} type="checkbox"${attr("checked", input2[field2.key] === "true", true)}${attr("aria-describedby", field2.hint ? `hint-${tool.id}-${field2.key}` : void 0)} class="svelte-1pw1utv"/> <span class="svelte-1pw1utv">${escape_html(field2.label[locale])}</span></label> `);
        if (field2.hint) {
          $$renderer2.push(`<!--[0--><p class="field-hint svelte-1pw1utv"${attr("id", `hint-${tool.id}-${field2.key}`)}>${escape_html(field2.hint[locale])}</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push(`<!--[-1--><div${attr_class("field svelte-1pw1utv", void 0, { "wide": field2.type === "textarea" })}><label class="field-label svelte-1pw1utv"${attr("for", `input-${tool.id}-${field2.key}`)}>${escape_html(field2.label[locale])}</label> `);
        if (field2.type === "textarea") {
          $$renderer2.push(`<!--[0--><textarea${attr("id", `input-${tool.id}-${field2.key}`)}${attr("rows", tool.id === "diff" ? 7 : 9)} spellcheck="false" autocomplete="off" autocapitalize="off"${attr("aria-describedby", field2.hint ? `hint-${tool.id}-${field2.key}` : void 0)} class="svelte-1pw1utv">`);
          const $$body = escape_html(input2[field2.key]);
          if ($$body) {
            $$renderer2.push(`${$$body}`);
          }
          $$renderer2.push(`</textarea>`);
        } else if (field2.type === "select") {
          $$renderer2.push(`<!--[1--><div class="select-control svelte-1pw1utv">`);
          $$renderer2.select(
            {
              id: `input-${tool.id}-${field2.key}`,
              value: input2[field2.key],
              "aria-describedby": field2.hint ? `hint-${tool.id}-${field2.key}` : void 0,
              class: ""
            },
            ($$renderer3) => {
              $$renderer3.push(`<!--[-->`);
              const each_array_1 = ensure_array_like(field2.options ?? []);
              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                let option = each_array_1[$$index];
                $$renderer3.option(
                  { value: option.value, class: "" },
                  ($$renderer4) => {
                    $$renderer4.push(`${escape_html(option.label[locale])}`);
                  },
                  "svelte-1pw1utv"
                );
              }
              $$renderer3.push(`<!--]-->`);
            },
            "svelte-1pw1utv"
          );
          $$renderer2.push(` `);
          Chevron_down($$renderer2, { size: 16, "aria-hidden": "true" });
          $$renderer2.push(`<!----></div>`);
        } else if (field2.type === "password") {
          $$renderer2.push(`<!--[2--><div class="password-wrap svelte-1pw1utv"><input${attr("id", `input-${tool.id}-${field2.key}`)}${attr("type", revealPasswords[field2.key] ? "text" : "password")}${attr("value", input2[field2.key])} autocomplete="off" spellcheck="false"${attr("aria-describedby", field2.hint ? `hint-${tool.id}-${field2.key}` : void 0)} class="svelte-1pw1utv"/> <button class="reveal-button svelte-1pw1utv" type="button"${attr("aria-label", message(revealPasswords[field2.key] ? "hideValue" : "showValue"))}${attr("aria-pressed", !!revealPasswords[field2.key])}>`);
          if (revealPasswords[field2.key]) {
            $$renderer2.push("<!--[0-->");
            Eye_off($$renderer2, { size: 17 });
          } else {
            $$renderer2.push("<!--[-1-->");
            Eye($$renderer2, { size: 17 });
          }
          $$renderer2.push(`<!--]--></button></div>`);
        } else if (field2.type === "number") {
          $$renderer2.push(`<!--[3--><input${attr("id", `input-${tool.id}-${field2.key}`)} type="number"${attr("value", input2[field2.key])}${attr("min", field2.min)}${attr("max", field2.max)}${attr("step", field2.step ?? "any")}${attr("aria-describedby", field2.hint ? `hint-${tool.id}-${field2.key}` : void 0)} class="svelte-1pw1utv"/>`);
        } else if (field2.type === "color") {
          $$renderer2.push(`<!--[4--><div class="color-input svelte-1pw1utv"><input${attr("id", `input-${tool.id}-${field2.key}`)} type="color"${attr("value", input2[field2.key])}${attr("aria-describedby", field2.hint ? `hint-${tool.id}-${field2.key}` : void 0)} class="svelte-1pw1utv"/> <span class="svelte-1pw1utv">${escape_html(input2[field2.key])}</span></div>`);
        } else {
          $$renderer2.push(`<!--[-1--><input${attr("id", `input-${tool.id}-${field2.key}`)} type="text"${attr("value", input2[field2.key])} autocomplete="off" autocapitalize="off" spellcheck="false"${attr("aria-describedby", field2.hint ? `hint-${tool.id}-${field2.key}` : void 0)} class="svelte-1pw1utv"/>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (field2.hint) {
          $$renderer2.push(`<!--[0--><p class="field-hint svelte-1pw1utv"${attr("id", `hint-${tool.id}-${field2.key}`)}>${escape_html(field2.hint[locale])}</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></fieldset> `);
    if (tool.id === "imageBase64") {
      $$renderer2.push(`<!--[0--><div class="upload-field svelte-1pw1utv"><label for="image-upload" class="svelte-1pw1utv">${escape_html(message("chooseImage"))}</label> <input id="image-upload" type="file" accept="image/png,image/jpeg,image/gif,image/webp" class="svelte-1pw1utv"/></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (tool.id === "jwt") {
      $$renderer2.push(`<!--[0--><div class="notice svelte-1pw1utv">`);
      Triangle_alert($$renderer2, { size: 17 });
      $$renderer2.push(`<!----> <p class="svelte-1pw1utv">${escape_html(message("jwtNotice"))}</p></div>`);
    } else if (tool.id === "hash") {
      $$renderer2.push(`<!--[1--><div class="notice svelte-1pw1utv">`);
      Triangle_alert($$renderer2, { size: 17 });
      $$renderer2.push(`<!----> <p class="svelte-1pw1utv">${escape_html(message("hashNotice"))}</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="input-actions svelte-1pw1utv"><button class="button primary svelte-1pw1utv" type="submit"${attr("disabled", busy, true)}>`);
    {
      $$renderer2.push("<!--[-1-->");
      Play($$renderer2, { size: 16, fill: "currentColor" });
    }
    $$renderer2.push(`<!--]--> ${escape_html(message("runTool"))}</button> <button class="button secondary svelte-1pw1utv" type="button">`);
    Rotate_ccw($$renderer2, { size: 16 });
    $$renderer2.push(`<!---->${escape_html(message("reset"))}</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="privacy-note svelte-1pw1utv">`);
    Shield_check($$renderer2, { size: 14 });
    $$renderer2.push(`<!----><span class="svelte-1pw1utv">${escape_html(message("localPrivacy"))}</span></div></form> <section class="panel result-panel svelte-1pw1utv" aria-labelledby="result-heading"${attr("aria-busy", busy)}><div class="panel-heading svelte-1pw1utv"><div class="heading-label svelte-1pw1utv">`);
    Terminal($$renderer2, { size: 18, strokeWidth: 1.8 });
    $$renderer2.push(`<!----> <h2 id="result-heading" class="svelte-1pw1utv">${escape_html(message("result"))}</h2></div> <span class="step-label svelte-1pw1utv">02</span></div> `);
    {
      $$renderer2.push(`<!--[-1--><div class="empty-result svelte-1pw1utv"><div class="empty-symbol svelte-1pw1utv">`);
      Terminal($$renderer2, { size: 30, strokeWidth: 1.3 });
      $$renderer2.push(`<!----></div> <h3 class="svelte-1pw1utv">${escape_html(message("readyHeading"))}</h3> <p class="svelte-1pw1utv">${escape_html(message("emptyHint"))}</p> <span class="empty-tag svelte-1pw1utv">`);
      Shield_check($$renderer2, { size: 13 });
      $$renderer2.push(`<!---->${escape_html(message("localTag"))}</span></div>`);
    }
    $$renderer2.push(`<!--]--> <p class="status-message svelte-1pw1utv" role="status" aria-live="polite" aria-atomic="true">${escape_html(status)}</p></section></div> <dialog class="diff-dialog svelte-1pw1utv"${attr("aria-label", message("fullscreenDiff"))}><div class="diff-dialog-heading svelte-1pw1utv"><strong class="svelte-1pw1utv">${escape_html(message("differenceComparison"))}</strong> <div class="svelte-1pw1utv"><div class="diff-view-switch svelte-1pw1utv"${attr("aria-label", message("diffView"))}><button type="button"${attr_class("svelte-1pw1utv", void 0, { "active": diffView === "inline" })}>`);
    Rows_3($$renderer2, { size: 15 });
    $$renderer2.push(`<!---->${escape_html(message("inline"))}</button> <button type="button"${attr_class("svelte-1pw1utv", void 0, { "active": diffView === "split" })}>`);
    Columns_2($$renderer2, { size: 15 });
    $$renderer2.push(`<!---->${escape_html(message("sideBySide"))}</button></div> <button class="icon-button svelte-1pw1utv" type="button"${attr("aria-label", message("close"))}>`);
    X($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></dialog>`);
  });
}
const contentPages = {
  about: {
    en: {
      title: "About Ling.Tools",
      description: "What Ling.Tools is, how its browser-based utilities work, and where to find the open-source code.",
      intro: "A small, considered home for the little tasks that interrupt a good flow.",
      sections: [
        {
          heading: "Built for everyday development",
          paragraphs: [
            "Ling.Tools brings common generators, encoders, converters and testers into one searchable space. Open a tool, do the task, and move on. You can use every tool without creating an account.",
            "The site is made with Svelte 5 and SvelteKit. Every page is generated as static HTML during the build and served through Azure Static Web Apps. The tools run in your browser, including when the installed site is offline after its assets have been cached."
          ]
        },
        {
          heading: "Tools with honest boundaries",
          paragraphs: [
            "Random identifiers and passwords use the browser cryptographic random source. JWT signatures can be checked when you supply a key, but issuer, audience and claims still need your review. MD5 and SHA-1 exist for legacy compatibility, not new security designs. Cron preview follows the implemented parser and should be compared against the scheduler you deploy.",
            "Each tool page explains its inputs, gives an example and shows related tools. If you notice a problem or have a useful tool idea, open an issue in the public repository."
          ]
        },
        {
          heading: "Open source",
          paragraphs: [
            "The source is published at github.com/ling921/ling-tools under the MIT license. The version and short Git commit shown in the footer help identify the precise build you are viewing."
          ]
        }
      ]
    },
    "zh-CN": {
      title: "关于 Ling.Tools",
      description: "了解 Ling.Tools 的浏览器端工具、静态站点架构、能力边界与开源仓库。",
      intro: "把开发过程中的小事放在一个安静、顺手的地方。",
      sections: [
        {
          heading: "为日常开发而做",
          paragraphs: [
            "Ling.Tools 将常用生成、编码、转换与测试工具放在一个可搜索的地方。打开工具，处理问题，然后继续工作。使用所有工具都不需要注册账号。",
            "本站使用 Svelte 5 和 SvelteKit，在构建时将每个页面生成静态 HTML，并通过 Azure Static Web Apps 托管。工具在浏览器内运行；安装后缓存完成的页面也可以离线使用。"
          ]
        },
        {
          heading: "清楚说明能力边界",
          paragraphs: [
            "随机标识和密码使用浏览器的加密安全随机源。JWT 可在提供密钥后验证签名，但签发者、受众及声明仍需自行核对。MD5 和 SHA-1 仅供旧系统兼容，不适合新的安全设计。Cron 预览遵循本站解析器规则，正式配置前请与实际调度器核对。",
            "每个工具页提供输入说明、示例与相关工具。发现问题或想到新的实用工具，欢迎在公开仓库提交 issue。"
          ]
        },
        {
          heading: "开源项目",
          paragraphs: [
            "源码托管于 github.com/ling921/ling-tools，遵循 MIT 许可证。页脚中的版本号和 Git 短提交号可以帮助确认当前站点的具体构建版本。"
          ]
        }
      ]
    }
  },
  privacy: {
    en: {
      title: "Privacy",
      description: "How Ling.Tools handles your tool inputs, local preferences, offline cache and hosting requests.",
      intro: "The useful thing about a local tool is that your working data can stay local.",
      sections: [
        {
          heading: "Tool inputs stay in your browser",
          paragraphs: [
            "The generators, parsers, formatters and converters process data on your device. Tool inputs and results are not sent to an application server, saved to an account or stored in browser storage. The site does not include analytics, ads or remote fonts.",
            "Copying a result happens only when you press a copy button. Downloading a result creates a local file through your browser. As with any website, do not paste secrets into tools unless you trust your browser, device and extensions."
          ]
        },
        {
          heading: "Preferences on this device",
          paragraphs: [
            "We use localStorage for your theme, language, favorite tools and a short list of recently visited tools. Those settings do not contain tool inputs or outputs. Clear this site’s browser data to remove them.",
            "To make the installed site work offline, a service worker caches the static HTML, scripts, styles and icons. It does not cache submitted values or generated results. The cache is refreshed when you accept an available update."
          ]
        },
        {
          heading: "Hosting and external links",
          paragraphs: [
            "Azure Static Web Apps serves the static files and may process standard request metadata, such as IP addresses, URLs and timestamps, in infrastructure logs under its own policies. Following the GitHub link takes you to a separate website with its own privacy practices."
          ]
        }
      ]
    },
    "zh-CN": {
      title: "隐私说明",
      description: "了解 Ling.Tools 如何处理工具输入、本地偏好、离线缓存以及托管请求。",
      intro: "本地工具最可贵的一点，是让你的工作数据留在自己的设备上。",
      sections: [
        {
          heading: "工具输入留在浏览器",
          paragraphs: [
            "生成、解析、格式化和转换均在你的设备上执行。工具输入与输出不会上传到应用服务器、保存到账号，或写入浏览器存储。本站不接入统计分析、广告或远程字体。",
            "只有点击复制按钮时才会写入剪贴板。下载结果通过浏览器在本地创建文件。与任何网站一样，处理秘密信息前仍应确认你信任自己的浏览器、设备和扩展程序。"
          ]
        },
        {
          heading: "保存在本机的偏好",
          paragraphs: [
            "localStorage 只保存主题、语言、收藏的工具和近期访问的工具列表，不保存工具输入或输出。清除本站的浏览器数据即可删除这些设置。",
            "为了离线使用，Service Worker 会缓存静态 HTML、脚本、样式和图标，不缓存你提交的值或生成的结果。发现新版本后，只有在你接受更新时才切换缓存。"
          ]
        },
        {
          heading: "托管与外部链接",
          paragraphs: [
            "Azure Static Web Apps 提供静态文件服务，基础设施可能根据其政策在日志中处理 IP 地址、请求路径和时间等常规请求信息。点击 GitHub 链接会前往另一个网站，适用其自身的隐私实践。"
          ]
        }
      ]
    }
  }
};
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const locale = derived(() => data.locale);
    const zh = derived(() => locale() === "zh-CN");
    const tool = derived(() => data.tool);
    const content = derived(() => data.kind === "about" || data.kind === "privacy" ? contentPages[data.kind][locale()] : null);
    const alternate = derived(() => `/${otherLocale(locale())}/${tool() ? tool().path : data.kind}/`);
    if (tool()) {
      $$renderer2.push("<!--[0-->");
      Seo($$renderer2, {
        title: tool().name[locale()],
        description: tool().description[locale()],
        locale: locale(),
        path: toolUrl(tool(), locale()),
        alternatePath: alternate(),
        kind: "tool",
        tool: tool()
      });
      $$renderer2.push(`<!----> <nav class="breadcrumbs svelte-1ez6oxh"${attr("aria-label", zh() ? "面包屑导航" : "Breadcrumb")}><a${attr("href", `/${stringify(locale())}/`)} class="svelte-1ez6oxh">${escape_html(zh() ? "首页" : "Home")}</a>`);
      Chevron_right($$renderer2, { size: 14 });
      $$renderer2.push(`<!----><a${attr("href", `/${stringify(locale())}/`)} class="svelte-1ez6oxh">${escape_html(categories[tool().category][locale()])}</a>`);
      Chevron_right($$renderer2, { size: 14 });
      $$renderer2.push(`<!----><span aria-current="page" class="svelte-1ez6oxh">${escape_html(tool().name[locale()])}</span></nav> <div class="tool-hero svelte-1ez6oxh"><div class="tool-hero-icon svelte-1ez6oxh">`);
      ToolIcon($$renderer2, { id: tool().id, size: 31 });
      $$renderer2.push(`<!----></div> <div><p class="eyebrow svelte-1ez6oxh">${escape_html(categories[tool().category][locale()])} / LING.TOOLS</p> <h1 class="svelte-1ez6oxh">${escape_html(tool().name[locale()])}</h1> <p class="tool-description svelte-1ez6oxh">${escape_html(tool().description[locale()])}</p></div></div> `);
      ToolWorkbench($$renderer2, { tool: tool(), locale: locale() });
      $$renderer2.push(`<!----> <section class="guide svelte-1ez6oxh"><div class="guide-main svelte-1ez6oxh"><p class="eyebrow svelte-1ez6oxh">`);
      Book_open($$renderer2, { size: 15 });
      $$renderer2.push(`<!---->${escape_html(zh() ? "使用说明" : "GUIDE & CONTEXT")}</p> <h2 class="svelte-1ez6oxh">${escape_html(zh() ? "关于这个工具" : "About this tool")}</h2> <p class="svelte-1ez6oxh">${escape_html(tool().intro[locale()])}</p> <h3 class="svelte-1ez6oxh">${escape_html(zh() ? "如何使用" : "How to use it")}</h3> <ol class="svelte-1ez6oxh"><!--[-->`);
      const each_array = ensure_array_like(tool().instructions[locale()]);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let step = each_array[$$index];
        $$renderer2.push(`<li class="svelte-1ez6oxh">${escape_html(step)}</li>`);
      }
      $$renderer2.push(`<!--]--></ol> <div class="example svelte-1ez6oxh">`);
      Lightbulb($$renderer2, { size: 19 });
      $$renderer2.push(`<!----> <div><strong class="svelte-1ez6oxh">${escape_html(zh() ? "示例" : "Example")}</strong> <p class="svelte-1ez6oxh">${escape_html(tool().example[locale()])}</p></div></div></div> <aside class="svelte-1ez6oxh"><p class="eyebrow svelte-1ez6oxh">${escape_html(zh() ? "接下来试试" : "RELATED TOOLS")}</p> <h3 class="svelte-1ez6oxh">${escape_html(zh() ? "相关工具" : "Related tools")}</h3> <!--[-->`);
      const each_array_1 = ensure_array_like(tool().related);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let id = each_array_1[$$index_1];
        const related = tools.find((x) => x.id === id);
        if (related) {
          $$renderer2.push(`<!--[0--><a class="related-card svelte-1ez6oxh"${attr("href", toolUrl(related, locale()))}><span class="related-icon svelte-1ez6oxh">`);
          ToolIcon($$renderer2, { id: related.id, size: 19 });
          $$renderer2.push(`<!----></span><span class="svelte-1ez6oxh"><strong class="svelte-1ez6oxh">${escape_html(related.name[locale()])}</strong><small class="svelte-1ez6oxh">${escape_html(related.description[locale()])}</small></span>`);
          Arrow_up_right($$renderer2, { size: 15 });
          $$renderer2.push(`<!----></a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> <p class="privacy-promise svelte-1ez6oxh">`);
      Shield_check($$renderer2, { size: 17 });
      $$renderer2.push(`<!---->${escape_html(zh() ? "所有输入只在此设备处理，不会上传。" : "Your inputs are processed on this device only.")}</p></aside></section>`);
    } else if (content()) {
      $$renderer2.push("<!--[1-->");
      Seo($$renderer2, {
        title: content().title,
        description: content().description,
        locale: locale(),
        path: `/${locale()}/${data.kind}/`,
        alternatePath: alternate(),
        kind: data.kind
      });
      $$renderer2.push(`<!----> <nav class="breadcrumbs svelte-1ez6oxh"${attr("aria-label", zh() ? "面包屑导航" : "Breadcrumb")}><a${attr("href", `/${stringify(locale())}/`)} class="svelte-1ez6oxh">${escape_html(zh() ? "首页" : "Home")}</a>`);
      Chevron_right($$renderer2, { size: 14 });
      $$renderer2.push(`<!----><span aria-current="page" class="svelte-1ez6oxh">${escape_html(content().title)}</span></nav> <article class="editorial svelte-1ez6oxh"><p class="eyebrow svelte-1ez6oxh">LING.TOOLS / ${escape_html(data.kind.toUpperCase())}</p> <h1 class="svelte-1ez6oxh">${escape_html(content().title)}</h1> <p class="editorial-intro svelte-1ez6oxh">${escape_html(content().intro)}</p> <!--[-->`);
      const each_array_2 = ensure_array_like(content().sections);
      for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
        let section = each_array_2[$$index_3];
        $$renderer2.push(`<section class="svelte-1ez6oxh"><h2 class="svelte-1ez6oxh">${escape_html(section.heading)}</h2> <!--[-->`);
        const each_array_3 = ensure_array_like(section.paragraphs);
        for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
          let paragraph = each_array_3[$$index_2];
          $$renderer2.push(`<p class="svelte-1ez6oxh">${escape_html(paragraph)}</p>`);
        }
        $$renderer2.push(`<!--]--></section>`);
      }
      $$renderer2.push(`<!--]--><a class="back-link svelte-1ez6oxh"${attr("href", `/${stringify(locale())}/`)}>`);
      Arrow_left($$renderer2, { size: 17 });
      $$renderer2.push(`<!---->${escape_html(zh() ? "返回工具首页" : "Back to all tools")}</a></article>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
