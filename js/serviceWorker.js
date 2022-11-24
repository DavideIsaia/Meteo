self.addEventListener('fetch',() => console.log("fetch"));

self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

const urlsToCache = ["/", "js/script.js", "css/style.css", "icon.png"];
   self.addEventListener("install", event => {
   event.waitUntil(
      caches.open("pwa-assets")
         .then(cache => {
            return cache.addAll(urlsToCache);
         })
   );
});
 