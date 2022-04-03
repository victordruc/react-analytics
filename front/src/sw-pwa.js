const appVersionID = "app-shop-v0.1.0";

const CACHE_OFFLINE_ASSETS = [
    "/", 
    "/static/js/bundle.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(appVersionID).then((cache) => {
      cache.addAll(CACHE_OFFLINE_ASSETS);
    })
  );
  console.info("pwa: SW installed");
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key != appVersionID)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
      caches
        .match(e.request)
        .then((asset) => asset));
});
