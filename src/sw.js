const CACHE_STATIC_NAME = 'static-cache-v2'; // Updated cache name for new version
const CACHE_DYNAMIC_NAME = 'dynamic-cache-v1';
const OFFLINE_URL = '/'; // The main page

// List of static assets to pre-cache
const staticAssets = [
  OFFLINE_URL,
  '/global.css', // Assuming global.css is directly accessible
  '/build/bundle.js', // Example SvelteKit build output (adjust as needed)
  '/build/bundle.css', // Example SvelteKit build output (adjust as needed)
  '/ElecCalc/', // Base path for the app
  '/ElecCalc/index.html',
  '/ElecCalc/icons/history.svg',
  '/ElecCalc/icons/plus.svg',
  '/ElecCalc/icons/settings.svg',
  '/ElecCalc/icons/icon-192x192.png', // From manifest
  '/ElecCalc/icons/icon-512x512.png', // From manifest
  // Add other critical static assets here (e.g., fonts, images)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching App Shell');
      return cache.addAll(staticAssets.map(url => new Request(url, { cache: 'no-cache' }))); // Ensure fresh assets
    }).catch(err => {
      console.error('[Service Worker] Pre-caching failed:', err);
    })
  );
  self.skipWaiting(); // Force activation
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim(); // Take control of clients immediately
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const requestUrl = new URL(event.request.url);

  // Serve pre-cached offline page for navigation requests if offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log('[Service Worker] Network failed for navigation, serving offline page.');
          const cache = await caches.open(CACHE_STATIC_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse || new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } });
        }
      })()
    );
    return; // Exit early for navigation requests
  }

  // Cache-First strategy for static assets
  if (staticAssets.includes(requestUrl.pathname) || requestUrl.pathname.startsWith('/_app/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_STATIC_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return; // Exit early for static assets
  }

  // Network-First strategy for other requests (e.g., API calls, dynamic content)
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      // Cache successful network responses
      return caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
    }).catch(() => {
      // Fallback to cache if network fails
      return caches.match(event.request).then((response) => {
        return response || new Response('<h1>Offline - Content not available</h1>', { headers: { 'Content-Type': 'text/html' } });
      });
    })
  );
});