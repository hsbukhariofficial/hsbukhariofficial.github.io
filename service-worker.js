const CACHE_NAME = "hs-bukhari-v1";

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {

      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json"
      ]);

    })
  );

});


self.addEventListener("activate", event => {

  event.waitUntil(
    self.clients.claim()
  );

});


self.addEventListener("fetch", event => {

  if(event.request.method !== "GET"){
    return;
  }

  event.respondWith(

    fetch(event.request).catch(() => {

      return caches.match(event.request);

    })

  );

});
