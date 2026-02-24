const CACHE_NAME = 'dalbit_eps-ubt_v4'; // Iniba ang version para mag-refresh
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  // 'styles.css', // I-comment out kung wala kang hiwalay na file nito
  // 'script.js', // I-comment out kung wala kang hiwalay na file nito
  'audio_21.mp3', 'audio_22.mp3', 'audio_23.mp3', 'audio_24.mp3', 'audio_25.mp3',
  'audio_26.mp3', 'audio_27.mp3', 'audio_28.mp3', 'audio_29.mp3', 'audio_30.mp3',
  'audio_31.mp3', 'audio_32.mp3', 'audio_33.mp3', 'audio_34.mp3', 'audio_35.mp3',
  'audio_36.mp3', 'audio_37.mp3', 'audio_38.mp3', 'audio_39.mp3', 'audio_40.mp3'
];

// Install - Mas pinatibay na caching
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Para mag-take effect agad ang bagong version
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching Files');
      return Promise.all(
        ASSETS.map(url => {
          return fetch(url).then(res => {
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            return cache.put(url, res);
          }).catch(err => console.error(`Error caching ${url}:`, err));
        })
      );
    })
  );
});

// Activate - Clean up old cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Fetch - Strategy: Cache First, fallback to Network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});
