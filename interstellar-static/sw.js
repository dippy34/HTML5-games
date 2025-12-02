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

// Helper function to check if URL is a CAPTCHA resource that should bypass proxy
function isCaptchaResource(url) {
  try {
    let urlStr = url.toString();
    
    // Check if it's a proxied URL and decode it first
    if (urlStr.includes('/a/') && !urlStr.includes('/a/q/')) {
      try {
        const urlObj = new URL(url);
        const pathMatch = urlObj.pathname.match(/\/a\/(.+?)(?:\?|$)/);
        if (pathMatch) {
          const encoded = pathMatch[1];
          try {
            const decoded = __uv$config.decodeUrl(encoded);
            urlStr = decoded;
          } catch (e) {
            // If decoding fails, continue with original URL
          }
        }
      } catch (e) {
        // Continue with original URL
      }
    }
    
    // Check for CAPTCHA-related domains and paths
    const captchaDomains = [
      'www.gstatic.com',
      'gstatic.com',
      'recaptcha.net',
      'www.recaptcha.net',
      'google.com/recaptcha',
      'accounts.google.com',
      'www.google.com/recaptcha',
      'apis.google.com'
    ];
    
    const captchaPaths = [
      '/recaptcha',
      '/recaptcha/api',
      '/recaptcha/enterprise',
      '/recaptcha/api.js',
      '/recaptcha/api2/',
      '/_/recaptcha',
      '/accounts/static',
      '/accounts/iframe'
    ];
    
    const captchaFilePatterns = [
      'recaptcha',
      'challenge',
      'anchor'
    ];
    
    // Check if URL contains CAPTCHA domain
    for (const domain of captchaDomains) {
      if (urlStr.includes(domain)) {
        return true;
      }
    }
    
    // Check if URL contains CAPTCHA path (and is from Google)
    for (const path of captchaPaths) {
      if (urlStr.includes(path)) {
        // Check if it's from a Google domain or if path is specific enough
        if (urlStr.includes('google.com') || urlStr.includes('gstatic.com') || path.startsWith('/recaptcha')) {
          return true;
        }
      }
    }
    
    // Check for CAPTCHA file patterns in Google domains
    for (const pattern of captchaFilePatterns) {
      if (urlStr.includes(pattern) && (urlStr.includes('google.com') || urlStr.includes('gstatic.com'))) {
        return true;
      }
    }
    
    return false;
  } catch {
    return false;
  }
}

// Helper function to get direct URL for CAPTCHA resources
function getDirectUrl(url) {
  try {
    let urlStr = url.toString();
    
    // Check if it's already a direct URL (starts with http/https)
    if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
      try {
        const urlObj = new URL(urlStr);
        // If it's already a full URL, return it
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
          return urlStr;
        }
      } catch {
        // Continue processing
      }
    }
    
    // If it's a proxied URL, decode it
    if (urlStr.includes('/a/') && !urlStr.includes('/a/q/')) {
      try {
        const urlObj = new URL(urlStr);
        const pathMatch = urlObj.pathname.match(/\/a\/(.+?)(?:\?|$)/);
        if (pathMatch) {
          const encoded = pathMatch[1];
          try {
            const decoded = __uv$config.decodeUrl(encoded);
            // Ensure it's a full URL
            if (decoded.startsWith('http://') || decoded.startsWith('https://')) {
              // Add query string if present
              const fullUrl = decoded + (urlObj.search || '');
              return fullUrl;
            } else {
              // If decoded URL is relative, try to construct full URL
              const fullUrl = 'https://' + decoded + (urlObj.search || '');
              return fullUrl;
            }
          } catch (e) {
            console.error('[SW] Error decoding CAPTCHA URL:', e);
          }
        }
      } catch (e) {
        console.error('[SW] Error parsing CAPTCHA URL:', e);
      }
    }
    
    // If it doesn't start with http/https, try to construct full URL
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
      return 'https://' + urlStr;
    }
    
    return urlStr;
  } catch {
    return url.toString();
  }
}

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      const requestUrl = event.request.url;
      
      // Check if this is a CAPTCHA resource - bypass proxy for direct access
      if (isCaptchaResource(requestUrl)) {
        try {
          const directUrl = getDirectUrl(requestUrl);
          console.log('[SW] Bypassing proxy for CAPTCHA resource:', directUrl);
          
          // Create headers for direct request (copy from original but remove proxy-specific ones)
          const headers = new Headers();
          const originalHeaders = event.request.headers;
          
          // Copy relevant headers, skipping proxy-specific ones
          for (const [key, value] of originalHeaders.entries()) {
            const lowerKey = key.toLowerCase();
            if (!['host', 'referer', 'origin', 'x-bare-protocol', 'x-bare-host', 'x-bare-path', 'x-bare-port', 'x-bare-headers'].includes(lowerKey)) {
              headers.set(key, value);
            }
          }
          
          // Create a direct fetch request bypassing the proxy
          const directRequest = new Request(directUrl, {
            method: event.request.method,
            headers: headers,
            body: event.request.body ? await event.request.clone().arrayBuffer() : null,
            mode: 'cors', // Use CORS for cross-origin requests
            credentials: 'include', // Include credentials for CAPTCHA
            cache: event.request.cache,
            redirect: 'follow' // Follow redirects
          });
          
          // Fetch directly and return response
          return await fetch(directRequest);
        } catch (e) {
          console.error('[SW] Error fetching CAPTCHA resource directly:', e);
          // Fall through to normal processing - let proxy handle it as fallback
        }
      }
      
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
