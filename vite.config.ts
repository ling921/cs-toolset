import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const context = env.DEPLOY_CONTEXT || 'preview';
  const raw = env.SITE_URL || 'http://localhost:4173';
  const parsed = new URL(raw);
  if (parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.username || parsed.password)
    throw new Error(
      'SITE_URL must be a site origin without a path, credentials, query or fragment.'
    );
  if (
    context === 'production' &&
    (!env.SITE_URL ||
      parsed.protocol !== 'https:' ||
      /^(localhost|127\.0\.0\.1)$|(^|\.)example\.(com|org|net)$|\.(example|test|invalid)$/.test(
        parsed.hostname
      ))
  )
    throw new Error(
      'Set the GitHub Actions SITE_URL variable to the real HTTPS production origin before deploying.'
    );
  let commit = 'local';
  try {
    commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    /* local archive */
  }
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  return {
    plugins: [sveltekit()],
    define: {
      __SITE_CONFIG__: JSON.stringify({
        origin: parsed.origin,
        indexable: context === 'production',
        version: pkg.version,
        commit
      })
    }
  };
});
