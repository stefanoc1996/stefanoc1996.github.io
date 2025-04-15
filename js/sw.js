// Nuovo file service-worker.js
const CACHE_NAME = 'cct-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/treasure-hunt.html',
  '/css/style.css',
  '/css/styleTreasureHunt.css',
  '/js/main.js',
  '/js/meteo.js',
  '/js/scriptTreasureHunt.js',
  '/css/images/logo.png',
  '/data/program.json',
  '/data/places.json',
  '/data/treasure-hunt-data.json',
  '/iconmap/point.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        );
      })
  );
});