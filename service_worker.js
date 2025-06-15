// Nombre del caché
const CACHE_NAME = 'reloj-pwa-cache-v1';

// Archivos que se almacenarán en caché
const ARCHIVOS_A_CACHEAR = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-512.png'
];

// Evento de instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Archivos cacheados correctamente');
        return cache.addAll(ARCHIVOS_A_CACHEAR);
      })
  );
});

// Evento de activación
self.addEventListener('activate', event => {
  console.log('🔄 Service Worker activado');
});

// Evento de fetch para servir desde caché si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(respuesta => respuesta || fetch(event.request))
  );
});
