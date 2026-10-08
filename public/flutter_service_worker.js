// The previous version of this site was a Flutter web app that registered a
// service worker at this path. This replacement removes it and its caches so
// returning visitors get the new site. Keep it here for a few months.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
      for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
    })(),
  );
});
