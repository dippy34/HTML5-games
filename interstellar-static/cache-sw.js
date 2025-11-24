// Nova Hub Site Cache Service Worker
// Caches proxied sites for instant loading for all users

const CACHE_NAME = 'nova-hub-site-cache-v1';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_CACHE_SIZE = 500 * 1024 * 1024; // 500MB max cache

// Cache strategies
const CACHEABLE_TYPES = [
  'text/html',
  'text/css',
  'application/javascript',
  'text/javascript',
  'application/json',
  'image/',
  'font/',
  'application/font'
];

// Check if response should be cached
function shouldCache(request, response) {
  // Only cache proxied content (from /a/ path)
  if (!request.url.includes('/a/')) {
    return false;
  }

  // Don't cache if response is not OK
  if (!response || !response.ok) {
    return false;
  }

  // Don't cache YouTube video content or streaming
  const urlStr = request.url.toString();
  if (urlStr.includes('youtube.com') || urlStr.includes('youtu.be') || urlStr.includes('googlevideo.com')) {
    return false; // Never cache YouTube videos
  }

  // Don't cache range requests (video streaming)
  if (request.headers.get('range')) {
    return false; // Range requests are for streaming, don't cache
  }

  // Don't cache video/audio streaming content
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('video/') || contentType.includes('audio/') || contentType.includes('application/x-mpegURL')) {
    return false; // Don't cache streaming media
  }

  // Check content type
  const isCacheable = CACHEABLE_TYPES.some(type => contentType.includes(type));
  
  return isCacheable;
}

// Get cache size (approximate)
async function getCacheSize() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  let size = 0;
  
  for (const key of keys) {
    const response = await cache.match(key);
    if (response) {
      const blob = await response.blob();
      size += blob.size;
    }
  }
  
  return size;
}

// Clean old cache entries if needed
async function cleanCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  const cacheSize = await getCacheSize();
  
  if (cacheSize > MAX_CACHE_SIZE && keys.length > 0) {
    // Remove oldest 20% of entries
    const toRemove = Math.floor(keys.length * 0.2);
    for (let i = 0; i < toRemove; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// Install event - set up cache
self.addEventListener('install', (event) => {
  console.log('[Cache SW] Installing cache service worker...');
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Cache SW] Activating cache service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[Cache SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - implement cache-first strategy for proxied sites
// This runs AFTER the Mathematics service worker, so we cache the final proxied responses
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const urlStr = request.url.toString();
  
  // Only handle proxied content (from /a/ path)
  // This service worker has scope "/" so it can intercept after Mathematics processes it
  if (!url.pathname.startsWith('/a/')) {
    return; // Let other handlers process it
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Don't intercept if it's a service worker script or config
  if (url.pathname.includes('sw.js') || url.pathname.includes('config.js') || url.pathname.includes('bundle.js')) {
    return;
  }

  // Don't intercept YouTube video requests or range requests (streaming)
  if (urlStr.includes('youtube.com') || urlStr.includes('youtu.be') || urlStr.includes('googlevideo.com')) {
    return; // Let YouTube requests pass through without caching
  }

  // Don't intercept range requests (used for video/audio streaming)
  if (request.headers.get('range')) {
    return; // Range requests need to pass through directly
  }

  // Don't intercept YouTube video requests or range requests (streaming)
  if (urlStr.includes('youtube.com') || urlStr.includes('youtu.be') || urlStr.includes('googlevideo.com')) {
    return; // Let YouTube requests pass through without caching
  }

  // Don't intercept range requests (used for video/audio streaming)
  if (request.headers.get('range')) {
    return; // Range requests need to pass through directly
  }

  event.respondWith(
    (async () => {
      try {
        // Try cache first
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request, { ignoreSearch: false });
        
        if (cachedResponse) {
          // Check if cache is still valid (within duration)
          const cachedDate = cachedResponse.headers.get('x-cached-date');
          if (cachedDate) {
            const cacheAge = Date.now() - parseInt(cachedDate);
            if (cacheAge < CACHE_DURATION) {
              console.log('[Cache SW] ✅ Serving from cache:', url.pathname.substring(0, 50));
              // Return cached response with fresh headers
              return new Response(cachedResponse.body, {
                status: cachedResponse.status,
                statusText: cachedResponse.statusText,
                headers: cachedResponse.headers
              });
            } else {
              // Cache expired, delete it
              console.log('[Cache SW] ⏰ Cache expired, removing:', url.pathname.substring(0, 50));
              await cache.delete(request);
            }
          } else {
            // No date header, serve anyway (legacy cache)
            console.log('[Cache SW] ✅ Serving from cache (legacy):', url.pathname.substring(0, 50));
            return cachedResponse;
          }
        }

        // Not in cache or expired, fetch from network (this will go through Mathematics SW first)
        console.log('[Cache SW] 🌐 Fetching from network:', url.pathname.substring(0, 50));
        const networkResponse = await fetch(request);
        
        // Clone response for caching
        const responseToCache = networkResponse.clone();
        
        // Cache if appropriate
        if (shouldCache(request, networkResponse)) {
          // Add cache date header
          const headers = new Headers(responseToCache.headers);
          headers.set('x-cached-date', Date.now().toString());
          
          const cachedResponse = new Response(responseToCache.body, {
            status: responseToCache.status,
            statusText: responseToCache.statusText,
            headers: headers
          });
          
          await cache.put(request, cachedResponse);
          console.log('[Cache SW] 💾 Cached:', url.pathname.substring(0, 50));
          
          // Clean cache if needed (async, don't wait)
          cleanCache().catch(err => console.error('[Cache SW] Cache cleanup error:', err));
        }
        
        return networkResponse;
      } catch (error) {
        console.error('[Cache SW] ❌ Fetch error:', error);
        
        // Try to serve from cache even on error
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          console.log('[Cache SW] 🔄 Serving stale cache on error:', url.pathname.substring(0, 50));
          return cachedResponse;
        }
        
        throw error;
      }
    })()
  );
});

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      event.ports[0].postMessage({ success: true });
    });
  } else if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ size: size });
    });
  }
});

console.log('[Cache SW] Cache service worker loaded');

