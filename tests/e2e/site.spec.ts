import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { tools } from '../../src/lib/catalog';

test('localized static pages have metadata and a working generator', async ({ page }) => {
  await page.goto('/zh-CN/gen/string/');
  await expect(page).toHaveTitle(/随机字符串/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    /\/zh-CN\/gen\/string\/$/
  );
  await expect(page.getByRole('heading', { level: 1 })).toContainText('随机字符串');
  await page.getByRole('button', { name: '运行工具' }).click();
  await expect(page.locator('.result-output')).not.toBeEmpty();
  await page.getByRole('button', { name: '选择语言' }).click();
  await page.getByRole('menuitemradio', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/gen\/string\/$/);
});

test('search palette and favorites are functional', async ({ page }) => {
  await page.goto('/en/');
  if (test.info().project.name.startsWith('mobile')) {
    await page.locator('.mobile-search').click();
  } else {
    await page.locator('.search-shortcut').click();
  }
  await page.getByRole('dialog').getByRole('textbox').fill('json');
  await expect(page.getByRole('dialog').getByRole('option').first()).toContainText('JSON');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/en\/format\/json\/$/);
  await page.goto('/en/');
  await page.getByRole('button', { name: 'Add favorite' }).first().click();
  await page.getByRole('button', { name: /Favorites/ }).click();
  await expect(page.locator('.tool-card')).toHaveCount(1);
});

test('tag search and compact card layout work together', async ({ page }) => {
  await page.goto('/zh-CN/');
  await page.getByRole('searchbox').fill('tag:hash');
  await expect(page.locator('.tool-card')).toHaveCount(1);
  const card = page.locator('.tool-card');
  await expect(card.locator('.card-tag')).toHaveCount(3);
  await expect(card.locator('.tag-overflow')).toContainText('+2');
  const positions = await card.evaluate((element) => {
    const open = element.querySelector('.card-open')!.getBoundingClientRect();
    const tags = element.querySelector('.card-tags')!.getBoundingClientRect();
    const icon = element.querySelector('.card-icon')!.getBoundingClientRect();
    const category = element.querySelector('.card-category')!.getBoundingClientRect();
    return {
      bottomAligned: Math.abs(open.top - tags.top) < 12,
      topAligned: Math.abs(icon.top - category.top) < 18
    };
  });
  expect(positions).toEqual({ bottomAligned: true, topAligned: true });
});

test('pages stay functional offline after service-worker precache', async ({ page, context }) => {
  await page.goto('/en/');
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== null, {
    timeout: 15_000
  });
  await context.setOffline(true);
  await page.goto('/en/gen/hex/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Random hexadecimal');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect(page.locator('.result-output')).not.toBeEmpty();
});

test('home has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('/en/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((violation) =>
      ['critical', 'serious'].includes(violation.impact ?? '')
    )
  ).toEqual([]);
});

test('all catalog tools execute in the browser', async ({ page }) => {
  test.setTimeout(120_000);
  for (const tool of tools) {
    await page.goto(`/en/${tool.path}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(tool.name.en);
    await page.getByRole('button', { name: 'Run tool' }).click();
    await expect(
      page.locator('.result-output'),
      `${tool.id} did not produce output`
    ).not.toBeEmpty();
  }
});

test('directional tools use matching examples, preserve user input, and transfer results', async ({
  page
}) => {
  await page.goto('/en/convert/yaml/');
  await expect(page.getByLabel('YAML input')).toHaveValue('name: Ada\nage: 36');
  await page.getByLabel('Direction').selectOption('toYaml');
  await expect(page).toHaveURL(/\?mode=toYaml$/);
  await expect(page.getByLabel('JSON input')).toHaveValue('{"name":"Ada","age":36}');
  await page.getByLabel('JSON input').fill('{"name":"Grace","age":37}');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'YAML output' })).toBeVisible();
  await page.getByRole('button', { name: 'Use output as input & switch' }).click();
  await expect(page.getByLabel('Direction')).toHaveValue('toJson');
  await expect(page.getByLabel('YAML input')).toHaveValue(/name: Grace/);

  await page.goto('/en/security/jwt/');
  await expect(page.getByLabel('Extra header JSON')).toHaveCount(0);
  await page.getByLabel('Operation').selectOption('encode');
  await expect(page.getByLabel('Input')).toHaveCount(0);
  await expect(page.getByLabel('Extra header JSON')).toBeVisible();
  await expect(page.getByLabel('Payload JSON')).toBeVisible();
});

test('tool secrets do not opt into credential autofill', async ({ page }) => {
  await page.goto('/en/security/hash/');
  await page.getByLabel('Operation').selectOption('hmac');
  const hmacKey = page.getByLabel('HMAC secret key (UTF-8)');
  await expect(hmacKey).toHaveAttribute('autocomplete', 'new-password');
  await expect(hmacKey).toHaveAttribute('name', 'tool-hash-key');
  await expect(hmacKey).toHaveAttribute('data-1p-ignore', 'true');
  await expect(hmacKey).toHaveAttribute('data-lpignore', 'true');
  await expect(hmacKey).toHaveAttribute('data-bwignore', 'true');

  await page.goto('/en/security/jwt/');
  const jwtSecret = page.getByLabel('HMAC secret (optional for verification)');
  await expect(jwtSecret).toHaveAttribute('autocomplete', 'new-password');
  await expect(jwtSecret).toHaveAttribute('name', 'tool-jwt-secret');
});

test('search modal locks the page and keeps only its results scrollable', async ({ page }) => {
  await page.goto('/en/');
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
  const before = await page.evaluate(() => window.scrollY);
  expect(before).toBeGreaterThan(0);
  if (test.info().project.name.startsWith('mobile')) {
    await page.locator('.mobile-search').click();
  } else {
    await page.locator('.search-shortcut').click();
  }
  await expect(page.getByRole('dialog')).toBeVisible();
  const lockedPosition = await page.evaluate(() => window.scrollY);
  const layout = await page.evaluate(() => {
    const dialog = document.querySelector<HTMLDialogElement>('.command-dialog')!;
    const results = document.querySelector<HTMLElement>('.command-results')!;
    return {
      pageOverflow: document.documentElement.style.overflow,
      dialogOverflow: getComputedStyle(dialog).overflowY,
      resultsOverflow: getComputedStyle(results).overflowY,
      resultsScrollable: results.scrollHeight > results.clientHeight
    };
  });
  expect(layout).toEqual({
    pageOverflow: 'hidden',
    dialogOverflow: 'hidden',
    resultsOverflow: 'auto',
    resultsScrollable: true
  });
  await page.mouse.wheel(0, 500);
  expect(await page.evaluate(() => window.scrollY)).toBe(lockedPosition);
  await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('');
});

test('one copy action, readable content and compact footer', async ({ page }) => {
  await page.goto('/en/gen/string/');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect(page.getByRole('button', { name: 'Copy all' })).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Copy result' })).toHaveCount(0);
  const sizes = await page.evaluate(() => ({
    label: parseFloat(getComputedStyle(document.querySelector('.field-label')!).fontSize),
    result: parseFloat(getComputedStyle(document.querySelector('.result-output')!).fontSize),
    guide: parseFloat(
      getComputedStyle(document.querySelector('.guide-main > p:not(.eyebrow)')!).fontSize
    ),
    footer: document.querySelector('.footer-inner')!.getBoundingClientRect().height
  }));
  expect(sizes.label).toBeGreaterThanOrEqual(14);
  expect(sizes.result).toBeGreaterThanOrEqual(14);
  expect(sizes.guide).toBeGreaterThanOrEqual(15);
  if (test.info().project.name.startsWith('desktop')) expect(sizes.footer).toBeLessThanOrEqual(70);
});

test('root uses the browser language and falls back to English', async ({ browser }) => {
  const chinese = await browser.newContext({ locale: 'zh-CN' });
  const fallback = await browser.newContext({ locale: 'fr-FR' });
  try {
    const chinesePage = await chinese.newPage();
    await chinesePage.goto('http://127.0.0.1:4173/');
    await expect(chinesePage).toHaveURL(/\/zh-CN\/$/);
    const fallbackPage = await fallback.newPage();
    await fallbackPage.goto('http://127.0.0.1:4173/');
    await expect(fallbackPage).toHaveURL(/\/en\/$/);
  } finally {
    await chinese.close();
    await fallback.close();
  }
});

test('saved language takes precedence over the browser language', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' });
  try {
    const page = await context.newPage();
    await page.addInitScript(() =>
      localStorage.setItem('cs-toolset:preferences:v1', JSON.stringify({ locale: 'zh-CN' }))
    );
    await page.goto('http://127.0.0.1:4173/');
    await expect(page).toHaveURL(/\/zh-CN\/$/);
  } finally {
    await context.close();
  }
});

test('language selector persists the selected language and theme controls have titles', async ({
  page
}) => {
  await page.goto('/en/');
  const language = page.getByRole('button', { name: 'Choose language' });
  await language.click();
  await expect(page.getByRole('menu')).toBeVisible();
  await expect(page.getByRole('menuitemradio')).toHaveCount(2);
  await expect(page.getByRole('menuitemradio').first()).toHaveCSS('min-height', '38px');
  await page.getByRole('menuitemradio', { name: '简体中文' }).click();
  await expect(page).toHaveURL(/\/zh-CN\/$/);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('cs-toolset:preferences:v1')))
    .toContain('zh-CN');
  await expect(page.getByTitle('浅色主题')).toHaveCount(1);
  await expect(page.getByTitle('系统主题')).toHaveCount(1);
  await expect(page.getByTitle('深色主题')).toHaveCount(1);
});

test('tool errors use only the active locale', async ({ page }) => {
  await page.goto('/zh-CN/format/json/');
  await page.getByLabel('输入').fill('{');
  await page.getByRole('button', { name: '运行工具' }).click();
  const error = page.locator('.error-box p');
  await expect(error).toHaveText('JSON 格式无效。');
  await expect(error).not.toContainText('Invalid JSON');
  await expect(error).not.toContainText(' / ');
});

test('structured output and diff views keep clipboard content as plain text', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/format/json/');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect(page.locator('.structured-output .code-line[data-line]')).toHaveCount(8);
  await expect
    .poll(() => page.locator('.structured-output [class^="hljs-"]').count())
    .toBeGreaterThan(0);
  const jsonTokenColors = await page
    .locator('.structured-output .hljs-attr, .structured-output .hljs-string')
    .evaluateAll((tokens) => [...new Set(tokens.map((token) => getComputedStyle(token).color))]);
  expect(jsonTokenColors).toHaveLength(2);

  await page.goto('/en/convert/yaml/');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect(page.locator('.structured-output .hljs-attr')).toHaveCount(2);
  await expect
    .poll(() => page.locator('.structured-output .hljs-punctuation').count())
    .toBeGreaterThan(0);

  await page.goto('/en/convert/csv-json/');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect
    .poll(() => page.locator('.structured-output .code-line[data-line]').count())
    .toBeGreaterThan(0);
  await expect.poll(() => page.locator('.structured-output .hljs-attr').count()).toBeGreaterThan(0);

  await page.goto('/en/format/xml/');
  await page.getByRole('button', { name: 'Run tool' }).click();
  await expect(page.locator('.structured-output .code-line[data-line]')).toHaveCount(3);
  await expect.poll(() => page.locator('.structured-output .hljs-tag').count()).toBeGreaterThan(0);

  await page.goto('/en/text/diff/');
  await page.getByLabel('Original text').fill('const message = "before";\nreturn message;');
  await page.getByLabel('Changed text').fill('const message = "after";\nreturn message;');
  await page.getByLabel('Code language').selectOption('javascript');
  await page.getByLabel('Compare by').selectOption('lines');
  await page.getByRole('button', { name: 'Run tool' }).click();
  const inlineResult = page.locator('.result-panel .diff-inline');
  await expect(inlineResult.locator('.diff-inline-line')).toHaveCount(3);
  await expect(inlineResult.locator('.diff-inline-line.diff-removed')).toContainText(
    'const message = "before";'
  );
  await expect(inlineResult.locator('.diff-inline-line.diff-added')).toContainText(
    'const message = "after";'
  );
  await page.getByRole('button', { name: 'Side by side' }).click();
  const diffResult = page.locator('.result-panel .diff-split');
  await expect(diffResult.locator('.diff-split-row')).toHaveCount(2);
  await expect(diffResult.locator('.diff-side-line[data-line="1"]').first()).toHaveCount(1);
  await expect
    .poll(() => diffResult.locator('.diff-side-line .hljs-keyword').count())
    .toBeGreaterThan(0);

  await page.getByRole('button', { name: 'View diff full screen' }).click();
  await expect(page.locator('.diff-dialog[open]')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('.diff-dialog')).not.toHaveAttribute('open', '');

  await page.getByRole('button', { name: 'Copy all' }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('--- before');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).not.toContain('<span');
  expect(copied).not.toContain('1 const');

  await diffResult.evaluate((element) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);
  });
  await page.keyboard.press('Control+C');
  const manuallyCopied = await page.evaluate(() => navigator.clipboard.readText());
  expect(manuallyCopied).not.toContain('1 const');
});

test('shortcut hint uses the platform modifier', async ({ page, browser }) => {
  await page.goto('/en/');
  const apple = await page.evaluate(() =>
    /Mac|iPhone|iPad|iPod/i.test(navigator.platform + navigator.userAgent)
  );
  await expect(page.locator('.search-shortcut kbd')).toHaveText(apple ? '⌘ K' : 'Ctrl K');
  const macContext = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 Safari/605.1.15'
  });
  try {
    const macPage = await macContext.newPage();
    await macPage.goto('http://127.0.0.1:4173/en/');
    await expect(macPage.locator('.search-shortcut kbd')).toHaveText('⌘ K');
  } finally {
    await macContext.close();
  }
});
