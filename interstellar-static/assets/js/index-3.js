// index.js
window.addEventListener("load", () => {
  // Register Mathematics/Ultraviolet service worker
  navigator.serviceWorker.register("../sw.js?v=2025-04-15", {
    scope: "/a/",
  });
  
  // Register Nova Hub cache service worker for site caching
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/cache-sw.js?v=1", {
      scope: "/",
    }).then((registration) => {
      console.log('[Nova Hub] Cache service worker registered:', registration.scope);
    }).catch((error) => {
      console.error('[Nova Hub] Cache service worker registration failed:', error);
    });
  }
});

let xl;

try {
  xl = window.top.location.pathname === "/d";
} catch {
  try {
    xl = window.parent.location.pathname === "/d";
  } catch {
    xl = false;
  }
}

const form = document.getElementById("fv");
const input = document.getElementById("input");

// Generate or retrieve session ID (for other tracking features if needed)
function getSessionId() {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

// Extract domain from URL
function extractDomain(url) {
  try {
    if (!url) return null;
    
    // Remove protocol if present
    let cleanUrl = url.replace(/^https?:\/\//, '');
    // Remove path, query, hash
    cleanUrl = cleanUrl.split('/')[0].split('?')[0].split('#')[0];
    // Remove port if present
    cleanUrl = cleanUrl.split(':')[0];
    // Remove www. prefix
    cleanUrl = cleanUrl.replace(/^www\./, '');
    
    return cleanUrl || null;
  } catch {
    return null;
  }
}

// Track visited URL (using Google Analytics if available)
async function trackVisitedUrl(finalUrl) {
  try {
    const domain = extractDomain(finalUrl);
    if (!domain || domain === window.location.hostname) {
      return; // Skip tracking same-origin or invalid URLs
    }
    
    // Use Google Analytics tracking if available
    if (window.trackVisitedUrl) {
      window.trackVisitedUrl(finalUrl, domain);
    }
  } catch (e) {
    // Silently fail
  }
}

if (form && input) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    try {
      if (xl) processUrl(input.value, "");
      else processUrl(input.value, "/d");
    } catch {
      processUrl(input.value, "/d");
    }
  });
}
function processUrl(value, path) {
  let url = value.trim();
  let engine = localStorage.getItem("engine");
  
  // If no engine is set, default to DuckDuckGo (more proxy-friendly than Google)
  if (!engine) {
    engine = "https://duckduckgo.com/?q=";
    localStorage.setItem("engine", engine);
    localStorage.setItem("enginename", "DuckDuckGo");
  }
  
  const searchUrl = engine;

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  // Track visited URL (non-blocking)
  trackVisitedUrl(url);

  sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url));
  
  // Auto-detect YouTube and use Dynamic, otherwise use Ultraviolet
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  
  if (isYouTube) {
    // YouTube: Use Dynamic transport (/a/q/)
    window.location.href = `/a/q/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    // Other sites: Use Ultraviolet (default)
    location.href = path;
  } else {
    // Other sites: Use Ultraviolet (default)
    window.location.href = `/a/${__uv$config.encodeUrl(url)}`;
  }
}

function go(value) {
  processUrl(value, "/d");
}

function blank(value) {
  processUrl(value);
}

function dy(value) {
  processUrl(value, `/a/q/${__uv$config.encodeUrl(value)}`);
}

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
    return true;
  }
  return false;
}
