const cacheVersion = "1.0.2";
const cachePrefix = "excel-gen";
const cacheStore = `${cachePrefix}-${cacheVersion}`;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fromNetwork(e.request, 10000).catch(() => fromCache(e.request))
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

// fetch the resource from the network
const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      !request.url.startsWith("chrome") && update(request, response.clone());
      fulfill(response);
    }, reject);
  });

// fetch the resource from the browser cache
const fromCache = (request) =>
  caches
    .open(cacheStore)
    .then((cache) => cache.match(request).then((matching) => matching));

const update = (request, response) =>
  caches.open(cacheStore).then((cache) => {
    response && cache.put(request, response);
  });
