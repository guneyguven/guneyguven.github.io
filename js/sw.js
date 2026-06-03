const CACHE_NAME = 'site-shell-v2';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/profile.html',
  '/gallery.html',
  '/contact.html',
  '/content.html',
  '/css/style.css',
  '/css/colors/dark-mode.css',
  '/css/colors/light-mode.css',
  '/js/custom.js',
  '/js/pjax.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  const req = event.request;

  // Navigation requests: try cache first, then network (keep offline fallback)
  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
const CACHE_NAME = 'site-shell-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/profile.html',
  '/gallery.html',
  '/contact.html',
  '/content.html',
  '/css/style.css',
  '/css/colors/dark-mode.css',
  '/css/colors/light-mode.css',
  '/js/custom.js',
  '/js/pjax.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
