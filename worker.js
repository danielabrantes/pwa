// Establish a cache name
//Stale-while-revalidate
const cacheName = 'v1';
self.addEventListener('fetch', (event) => {  
    event.respondWith(caches.open(cacheName).then((cache) => {
      console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
      return cache.match(event.request).then((cachedResponse) => {
        console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cachedResponse || fetchedResponse;
      });
    }));
});
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
};
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Caching all: app shell and content");
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/index.html",
      "/style.css",
      "/main.js",
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/7.jpg",
      "/images/8.jpg",
      "/images/9.jpg",
      "/images/10.jpg",
      "/images/11.jpg",
      "/images/12.jpg",
      "/images/13.jpg",
      "/images/14.jpg",
      "/images/15.jpg",
      "/images/16.jpg",
    ]),
  );
});
onmessage = e => {
    const message = e.data;
    console.log(`[From Main]: ${message}`);  
    const reply = setTimeout(() => postMessage("Polo!"), 3000);
  };
