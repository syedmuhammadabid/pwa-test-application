self.skipWaiting();

const staticCacheName = `site-static-v${
    Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100)
}`;
const assets = ["/", "/index.html", "/logo192.png", "/logo512.png"];

// install event
self.addEventListener("install", (evt) => {
    console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log("caching shell assets");
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener("activate", (evt) => {
    console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then((keys) => {
            //console.log(keys);
            return Promise.all(
                keys
                    .filter((key) => key !== staticCacheName)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener("fetch", (evt) => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then((cacheRes) => {
            return cacheRes || fetch(evt.request);
        })
    );
});
