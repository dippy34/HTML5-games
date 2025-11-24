importScripts("/assets/history/config.js?v=2025-04-15");
importScripts("/assets/history/worker.js?v=2025-04-15");
importScripts("/assets/mathematics/bundle.js?v=2025-04-15");
importScripts("/assets/mathematics/config.js?v=2025-04-15");
importScripts(__uv$config.sw || "/assets/mathematics/sw.js?v=2025-04-15");

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

const userKey = new URL(location).searchParams.get("userkey");
self.dynamic = dynamic;

// Helper function to check if URL is YouTube
function isYouTubeUrl(url) {
  try {
    const urlStr = url.toString();
    
    // Check if it's already a Dynamic route (/a/q/) - these are YouTube
    if (urlStr.includes('/a/q/')) {
      return true; // Dynamic routes are used for YouTube
    }
    
    // Check if it's an Ultraviolet route (/a/) that might be YouTube
    if (urlStr.includes('/a/') && !urlStr.includes('/a/q/')) {
      try {
        const urlObj = new URL(url);
        const pathMatch = urlObj.pathname.match(/\/a\/(.+?)(?:\?|$)/);
        if (pathMatch) {
          const encoded = pathMatch[1];
          try {
            const decoded = __uv$config.decodeUrl(encoded);
            if (decoded.includes('youtube.com') || decoded.includes('youtu.be')) {
              return true;
            }
          } catch (e) {
            // If decoding fails, check the encoded path
            if (encoded.includes('youtube') || encoded.includes('youtu')) {
              return true;
            }
          }
        }
      } catch (e) {
        // Fallback: check if URL string contains YouTube
        if (urlStr.includes('youtube') || urlStr.includes('youtu')) {
          return true;
        }
      }
    }
    
    // Check direct YouTube URLs
    if (urlStr.includes('youtube.com') || urlStr.includes('youtu.be')) {
      return true;
    }
    
    return false;
  } catch {
    return false;
  }
}

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      const requestUrl = event.request.url;
      const isYouTube = isYouTubeUrl(requestUrl);
      
      // For YouTube: Always use Dynamic transport (/a/q/)
      if (isYouTube) {
        // If it's already a Dynamic route, use Dynamic
        if (requestUrl.includes('/a/q/')) {
          if (await dynamic.route(event)) {
            return await dynamic.fetch(event);
          }
        } else if (requestUrl.includes('/a/') && !requestUrl.includes('/a/q/')) {
          // If it's an Ultraviolet route but it's YouTube, redirect to Dynamic
          try {
            const url = new URL(requestUrl);
            const pathMatch = url.pathname.match(/\/a\/(.+?)(?:\?|$)/);
            if (pathMatch) {
              const encoded = pathMatch[1];
              const newUrl = `${location.origin}/a/q/${encoded}${url.search}`;
              // Create new request for Dynamic route
              const newRequest = new Request(newUrl, {
                method: event.request.method,
                headers: event.request.headers,
                body: event.request.body,
                mode: event.request.mode,
                credentials: event.request.credentials,
                cache: event.request.cache,
                redirect: event.request.redirect
              });
              if (await dynamic.route({ request: newRequest, ...event })) {
                return await dynamic.fetch({ request: newRequest, ...event });
              }
            }
          } catch (e) {
            console.error('[SW] Error redirecting YouTube to Dynamic:', e);
          }
        }
        // Try Dynamic route as fallback
        if (await dynamic.route(event)) {
          return await dynamic.fetch(event);
        }
      }
      
      // For all other sites: Use Ultraviolet (default)
      if (requestUrl.startsWith(`${location.origin}/a/`) && !requestUrl.includes('/a/q/')) {
        return await uv.fetch(event);
      }
      
      // Fallback: Try Dynamic if it routes (for non-YouTube sites that might need it)
      if (!isYouTube && await dynamic.route(event)) {
        return await dynamic.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
