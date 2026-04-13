const CACHE_NAME = "ai-show-shell-v1";
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./css/tokens.css",
  "./css/base.css",
  "./css/layout.css",
  "./css/components.css",
  "./css/utilities.css",
  "./css/themes/ai-show-dark.css",
  "./js/app.js",
  "./js/config.js",
  "./js/components/header.js",
  "./js/components/mobile-nav.js",
  "./js/utils/dom.js",
  "./js/utils/storage.js",
  "./data/site.json",
  "./data/navigation.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
