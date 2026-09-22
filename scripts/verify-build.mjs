import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { load } from 'cheerio';

const output = resolve('build');
const problems = [];
async function findPages(directory, prefix = '') {
  const result = [];
  for (const name of await readdir(directory)) {
    const path = resolve(directory, name);
    if ((await stat(path)).isDirectory())
      result.push(...(await findPages(path, `${prefix}${name}/`)));
    else if (name === 'index.html') result.push({ path: `/${prefix}`, file: path });
  }
  return result;
}
const pages = await findPages(output);
const origin = (process.env.SITE_URL || 'http://localhost:4173').replace(/\/$/, '');
if (pages.length !== 73) problems.push(`Expected 73 static HTML pages, got ${pages.length}.`);
const urls = new Set(pages.map(({ path }) => path));
for (const { path, file } of pages) {
  const $ = load(await readFile(file, 'utf8'));
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content');
  const canonical = $('link[rel="canonical"]').attr('href');
  const robots = $('meta[name="robots"]').attr('content');
  const image = $('meta[property="og:image"]').attr('content');
  if (path === '/') {
    if (robots !== 'noindex') problems.push(`${path}: gateway should not be indexed.`);
    continue;
  }
  if (!title || !description || !image)
    problems.push(`${path}: missing title, description or social image.`);
  if (canonical !== origin + path) problems.push(`${path}: canonical mismatch (${canonical}).`);
  if (
    robots !== (process.env.DEPLOY_CONTEXT === 'production' ? 'index, follow' : 'noindex, nofollow')
  )
    problems.push(`${path}: wrong robots directive.`);
  if ($('html').attr('lang') !== (path.startsWith('/zh-CN/') ? 'zh-CN' : 'en'))
    problems.push(`${path}: wrong html lang.`);
  if ($('h1').length !== 1) problems.push(`${path}: expected exactly one h1.`);
  const alternates = $('link[rel="alternate"][hreflang]');
  if (path !== '/') {
    if (alternates.length !== 3) problems.push(`${path}: missing hreflang alternates.`);
    for (const locale of ['en', 'zh-CN']) {
      const href = alternates.filter(`[hreflang="${locale}"]`).attr('href');
      if (!href?.startsWith(origin + `/${locale}/`) || !urls.has(href.slice(origin.length)))
        problems.push(`${path}: invalid ${locale} alternate (${href}).`);
    }
  }
  const schema = $('script[type="application/ld+json"]').html();
  try {
    if (!Array.isArray(JSON.parse(schema ?? '')))
      problems.push(`${path}: JSON-LD should be an array.`);
  } catch {
    problems.push(`${path}: invalid JSON-LD.`);
  }
}
const required = [
  'service-worker.js',
  'manifest.webmanifest',
  'sitemap.xml',
  'robots.txt',
  '404.html'
];
for (const filename of required) {
  try {
    await stat(resolve(output, filename));
  } catch {
    problems.push(`Missing ${filename}.`);
  }
}
const sitemap = await readFile(resolve(output, 'sitemap.xml'), 'utf8');
for (const { path } of pages.filter((page) => page.path !== '/'))
  if (!sitemap.includes(`<loc>${origin + path}</loc>`))
    problems.push(`${path}: missing from sitemap.`);
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${pages.length} fully prerendered pages, SEO, sitemap, and PWA files.`
  );
