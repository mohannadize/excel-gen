const cacheVersion = 4;
const cachePrefix = "excel-gen";
const cacheStore = `${cachePrefix}-${cacheVersion}`;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return fetch(e.request)
          .then((netres) => {
            return caches.open(cacheStore).then((x) => {
              x.put(e.request.url, netres.clone());
              return netres;
            }) || res;
          })
          .catch(() => res);
      })
      .catch(() => {
        return fetch(e.request).then((netres) => {
          return caches.open(cacheStore).then((x) => {
            x.put(e.request.url, netres.clone());
            return netres;
          });
        });
      })
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName.startsWith(cachePrefix) && cacheStore != cacheName;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
