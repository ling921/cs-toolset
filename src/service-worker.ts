/// <reference lib="webworker" />
import { build, files, prerendered, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

const cacheName = `cs-toolset-${version}`;
const precache = [...new Set([...build, ...files, ...prerendered])].filter(
  (path) => !path.endsWith('staticwebapp.config.json')
);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precache)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .keys()
        .then((names) =>
          Promise.all(
            names
              .filter((name) => name.startsWith('cs-toolset-') && name !== cacheName)
              .map((name) => caches.delete(name))
          )
        ),
      self.clients.claim()
    ])
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'SKIP_WAITING') return;
  event.ports[0]?.postMessage({ type: 'SKIP_WAITING_ACCEPTED' });
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      if (request.mode === 'navigate') {
        try {
          const response = await fetch(request);
          if (response.ok) await cache.put(request, response.clone());
          return response;
        } catch {
          return (
            (await cache.match(request)) ??
            (await cache.match(url.pathname)) ??
            (await cache.match('/')) ??
            Response.error()
          );
        }
      }
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (
        response.ok &&
        (url.pathname.startsWith('/_app/') ||
          url.pathname.endsWith('.svg') ||
          url.pathname.endsWith('.png'))
      )
        await cache.put(request, response.clone());
      return response;
    })()
  );
});
