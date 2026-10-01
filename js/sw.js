// Legacy service-worker cleanup.
//
// The old site cached Bootstrap/PJAX assets that no longer exist.
// Keep this tiny worker temporarily so returning visitors can shed stale
// caches and registrations instead of being trapped on the legacy shell.

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.clients.claim();
    await self.registration.unregister();
  })());
});

self.addEventListener('fetch', event => {
  // Never serve the legacy cache. Always use the network.
  event.respondWith(fetch(event.request));
});
