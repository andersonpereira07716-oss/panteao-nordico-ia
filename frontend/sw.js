self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', (e) => {
  // Passa os pedidos normalmente pela rede
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
