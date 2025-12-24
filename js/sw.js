const CACHE_NAME = 'site-shell-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/profile.html',
  // '/gallery.html', // Temporarily disabled caching for gallery page
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
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept') && req.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      caches.match(req).then(cached => {
        const networkFetch = fetch(req).then(resp => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return resp;
        }).catch(()=>null);
        return cached || networkFetch || caches.match('/index.html');
      })
    );
    return;
  }

  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
