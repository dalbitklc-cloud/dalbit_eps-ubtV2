const CACHE_NAME = 'dalbit_eps-ubtV2'; // Tumaas ang version
const ASSETS = [
  './',
  'index.html', // Tinanggal ang ./ para mas safe sa GitHub
  'manifest.json',
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './audio_21.mp3',
  './audio_22.mp3',
  './audio_23.mp3',
  './audio_24.mp3',
  './audio_25.mp3',
  './audio_26.mp3',
  './audio_27.mp3',
  './audio_28.mp3',
  './audio_29.mp3',
  './audio_30.mp3',
  './audio_31.mp3',
  './audio_32.mp3',
  './audio_33.mp3',
  './audio_34.mp3',
  './audio_35.mp3',
  './audio_36.mp3',
  './audio_37.mp3',
  './audio_38.mp3',
  './audio_39.mp3',
  './audio_40.mp3',
  'https://cdn-icons-png.flaticon.com/512/3062/3062634.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      // Ginawang map para ma-detect kung anong specific na file ang nag-error
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.error(`Failed to cache: ${url}`, err));
        })
      );
    })
  );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // Kung audio ang request, mas safe na hayaan muna ang network kung may issue ang cache
      if (e.request.url.includes('.mp3')) {
        return res || fetch(e.request);
      }
      return res || fetch(e.request);
    })
  );
});

// Activate - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
