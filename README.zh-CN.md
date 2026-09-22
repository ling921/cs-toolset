# CS Toolset

**[English](README.md) / [简体中文](README.zh-CN.md)**

> 无需登录、完全在浏览器本地运行的开发者工具集。

[示例站点](https://tools.csors.com) · [报告问题](https://github.com/ling921/cs-toolset/issues) · [查看工作流](https://github.com/ling921/cs-toolset/actions)

CS Toolset 是一个双语、可静态部署的开发者工具站，使用 **Svelte 5、SvelteKit、TypeScript** 构建。工具输入、计算与结果均在浏览器中处理。

## 特性

- **完全静态**：构建产物为 `build/` 目录，可部署到任意静态托管服务。
- **本地优先**：工具计算不会发送到服务端。搜索、语言、主题、收藏和最近访问只使用浏览器 `localStorage` 保存。
- **中英文支持**：首次访问依据浏览器语言选择，英语兜底；语言和主题偏好会持久化。
- **快速搜索**：支持 `Ctrl + K` / `⌘ K`，可按关键词、`tag:json` 过滤，或用 `-tag:security` 排除标签。
- **代码与文本友好**：JSON、YAML、XML 结果提供语法高亮和行号；文本差异比较支持字符、单词、行级比较、内联、并排和全屏视图。
- **SEO 与离线访问**：每页预渲染独立元数据、canonical、hreflang、Open Graph 与结构化数据；构建生成 sitemap 和 robots 文件。Service Worker 缓存已访问的静态资源。

## 工具一览

| 类别 | 包含工具 |
| --- | --- |
| 生成 | 随机字符串、随机十六进制、随机数、UUID v4、密码、ULID / NanoID、Lorem Ipsum、中国身份证测试数据 |
| 格式与转换 | JSON、YAML ↔ JSON、CSV ↔ JSON、XML、Base64 / Base64URL、图片 ↔ Base64、Base32、URL 编解码、HTML 实体、Unicode、大小写、Slug、进制转换 |
| 安全与验证 | 哈希、HMAC、PBKDF2、JWT 编码与验签、正则表达式 |
| 文本与开发 | 文本差异、文本统计、行排序与去重、二维码、Cron 表达式、时间戳、颜色与对比度、HTTP 状态码、URL 解析 |

## 本地开发

需要 **Node.js 24** 与 npm。仓库中的 [`.nvmrc`](.nvmrc) 记录了推荐版本。

```bash
npm ci
npm run dev
```

常用命令：

```bash
npm run check             # 类型与 Svelte 检查
npm run lint              # ESLint
npm test                  # Vitest 单元测试
npm run build             # 生成 build/ 静态站点
npm run verify:build      # 校验路由与 SEO 产物
npm run preview           # 本地预览生产构建
npx playwright install chromium
npm run test:e2e          # 桌面与移动端浏览器测试
```

## 构建域名

`SITE_URL` 决定 canonical URL、Open Graph 元数据、sitemap 和 `robots.txt` 使用的站点来源。该值必须是完整来源地址，不能包含路径、查询参数、片段或认证信息。

本地开发使用默认值 `http://localhost:4173`。生产构建时，请传入公开的 HTTPS 域名：

```bash
SITE_URL=https://tools.example.com DEPLOY_CONTEXT=production npm run build
```

GitHub Actions 支持在手动运行时填写 `site_url` 参数；否则读取仓库的 Actions 变量 `SITE_URL`，未设置时使用 `https://example.com`。用于公开生产构建前，请配置该变量。

## 路由、SEO 与 PWA

- `/en/` 和 `/zh-CN/` 是双语入口；根路径会依据浏览器语言跳转。
- 工具页面使用稳定的双语 URL，例如 `/en/format/json/` 和 `/zh-CN/format/json/`。
- 每个页面生成独立标题、描述、canonical、语言 alternate、Open Graph/Twitter 元数据、`WebApplication` 与 `BreadcrumbList` 结构化数据。
- 构建时生成 `sitemap.xml`、`robots.txt` 和无索引 404 页面；预览构建使用 `noindex`。
- Service Worker 会提示用户在合适时机刷新到新版本。

## 贡献流程

1. 从 `master` 创建功能分支。
2. 提交前运行 `npm run check && npm run lint && npm test`；涉及界面或路由时也运行 `npm run build && npm run test:e2e`。
3. 通过 Pull Request 合并回 `master`，并等待 `test` 检查通过。

## 许可证

本项目使用 [Apache License 2.0](LICENSE)。
