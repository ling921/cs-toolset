# CS Toolset

**[English](README.md) / [简体中文](README.zh-CN.md)**

> Private browser-based developer tools for encoding, generating, converting, and testing.

[Open the example site](https://tools.csors.com) · [Report an issue](https://github.com/ling921/cs-toolset/issues) · [GitHub Actions](https://github.com/ling921/cs-toolset/actions)

CS Toolset is a bilingual collection of statically generated developer utilities built with **Svelte 5, SvelteKit, and TypeScript**. Tool inputs and results are processed in the browser.

## What it provides

- **Static by design**: the `build/` directory works with any static hosting provider.
- **Local-first processing**: tool operations run in the browser. Search, language, theme, favorites, and recently visited tools are stored in browser `localStorage`.
- **English and Simplified Chinese**: the first visit follows the browser language, with English as the fallback.
- **Fast search**: use `Ctrl + K` or `⌘ K`, keyword search, `tag:json`, and exclusions such as `-tag:security`.
- **Readable output**: JSON, YAML, and XML results have syntax highlighting and line numbers. Diff supports character, word, and line comparisons with inline, side-by-side, and full-screen views.
- **SEO and offline support**: routes are prerendered with localized metadata, canonical URLs, hreflang, Open Graph data, structured data, sitemap, and robots files. The service worker caches visited static resources.

## Tools

| Area | Tools |
| --- | --- |
| Generators | Random strings, hexadecimal, numbers, UUID v4, passwords, ULID / NanoID, Lorem Ipsum, Chinese resident-ID test data |
| Formatting and conversion | JSON, YAML ↔ JSON, CSV ↔ JSON, XML, Base64 / Base64URL, image ↔ Base64, Base32, URL encoding and inspection, HTML entities, Unicode, case conversion, Slug, radix conversion |
| Security and validation | Hashes, HMAC, PBKDF2, JWT encoding and verification, regular expressions |
| Text and developer utilities | Text diff, text statistics, line sorting and deduplication, QR codes, Cron expressions, timestamps, color and contrast, HTTP status, URL inspection |

## Local development

Use **Node.js 24** and npm. The recommended version is recorded in [`.nvmrc`](.nvmrc).

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run check             # Svelte and TypeScript diagnostics
npm run lint              # ESLint
npm test                  # Vitest unit tests
npm run build             # Generate the static site in build/
npm run verify:build      # Validate generated routes and SEO artifacts
npm run preview           # Preview the production build
npx playwright install chromium
npm run test:e2e          # Desktop and mobile browser tests
```

## Build origin

`SITE_URL` determines the origin used for canonical URLs, Open Graph metadata, the sitemap, and `robots.txt`. It must be an origin without a path, query, fragment, or credentials.

For local development, use the default `http://localhost:4173`. For a production build, pass the public HTTPS origin:

```bash
SITE_URL=https://tools.example.com DEPLOY_CONTEXT=production npm run build
```

The Azure deployment workflows set this value explicitly for each environment: `master` builds with `https://tools.csors.com` and `DEPLOY_CONTEXT=production`; `develop` builds with `https://test.tools.csors.com` and `DEPLOY_CONTEXT=preview`. This keeps generated canonical URLs, Open Graph metadata, sitemaps, and robots directives aligned with the deployed site.

## Routing, SEO, and PWA

- `/en/` and `/zh-CN/` are localized entry points. The root route chooses a locale from the browser language.
- Tool URLs are stable and localized, for example `/en/format/json/` and `/zh-CN/format/json/`.
- Pages include localized titles and descriptions, canonical and alternate-language links, Open Graph/Twitter metadata, `WebApplication` JSON-LD, and `BreadcrumbList` JSON-LD.
- Builds generate `sitemap.xml`, `robots.txt`, and a no-index 404 page. Preview builds are marked `noindex`.
- The service worker announces updates and lets users refresh when convenient.

## Contributing

1. Create a feature branch from `master`.
2. Run `npm run check && npm run lint && npm test`; for UI or routing changes also run `npm run build && npm run test:e2e`.
3. Open a pull request against `master` and wait for the required `test` check.

## License

This project is licensed under the [Apache License 2.0](LICENSE).
