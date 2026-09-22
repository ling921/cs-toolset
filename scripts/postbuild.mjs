import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const directory = resolve('build');
// Discover the actual prerendered pages rather than maintaining a second route catalog.
const { readdir, stat } = await import('node:fs/promises');
async function pages(dir, prefix = '') {
  const found = [];
  for (const item of await readdir(dir)) {
    const path = resolve(dir, item);
    if ((await stat(path)).isDirectory()) found.push(...(await pages(path, `${prefix}${item}/`)));
    else if (item === 'index.html') found.push(`/${prefix}`);
  }
  return found;
}
const origin = (process.env.SITE_URL || 'http://localhost:4173').replace(/\/$/, '');
const paths = (await pages(directory))
  .filter((path) => path.startsWith('/en/') || path.startsWith('/zh-CN/'))
  .sort();
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${paths
  .map((path) => {
    const alternate = path.startsWith('/en/')
      ? path.replace(/^\/en\//, '/zh-CN/')
      : path.startsWith('/zh-CN/')
        ? path.replace(/^\/zh-CN\//, '/en/')
        : null;
    const links = alternate
      ? `<xhtml:link rel="alternate" hreflang="en" href="${escape(origin + (path.startsWith('/en/') ? path : alternate))}"/><xhtml:link rel="alternate" hreflang="zh-CN" href="${escape(origin + (path.startsWith('/zh-CN/') ? path : alternate))}"/>`
      : '';
    return `<url><loc>${escape(origin + path)}</loc>${links}</url>`;
  })
  .join('\n')}\n</urlset>\n`;
await writeFile(resolve(directory, 'sitemap.xml'), xml);
await writeFile(
  resolve(directory, 'robots.txt'),
  process.env.DEPLOY_CONTEXT === 'production'
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n'
);
await writeFile(
  resolve(directory, '404.html'),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Page not found · CS Toolset</title><style>body{font:16px system-ui;background:#f6faf8;color:#16342d;display:grid;place-items:center;min-height:90vh;text-align:center}a{color:#047865}</style></head><body><main><h1>404 · Page not found / 页面不存在</h1><p><a href="/en/">English home</a> · <a href="/zh-CN/">中文首页</a></p></main></body></html>'
);
console.log(`Static build: ${paths.length} pages, sitemap and robots.txt generated.`);
