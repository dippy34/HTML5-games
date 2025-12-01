// index.js
// Store the origin early, before any redirects happen (important for about:blank)
let storedOrigin = '';
try {
  storedOrigin = window.location.origin;
  // Store in sessionStorage as backup
  if (storedOrigin && storedOrigin !== 'about:') {
    sessionStorage.setItem('proxyOrigin', storedOrigin);
  }
} catch (e) {
  // If we can't get origin now, try to get it from sessionStorage
  storedOrigin = sessionStorage.getItem('proxyOrigin') || '';
}

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
  
  // Update stored origin if we can get it now
  try {
    const currentOrigin = window.location.origin;
    if (currentOrigin && currentOrigin !== 'about:' && currentOrigin.includes('://')) {
      storedOrigin = currentOrigin;
      sessionStorage.setItem('proxyOrigin', currentOrigin);
    }
  } catch (e) {
    // Ignore
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
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://duckduckgo.com/?q=";

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url));
  
  // Auto-detect YouTube and use Dynamic, otherwise use Ultraviolet
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  
  // Detect if we're in an iframe (like in about:blank context)
  let inFrame = false;
  try {
    inFrame = window !== window.top;
  } catch (e) {
    inFrame = true;
  }
  
  // Get the correct origin for navigation
  // First try to use stored origin (set before about:blank redirect)
  let origin = storedOrigin || sessionStorage.getItem('proxyOrigin') || '';
  
  // If stored origin is invalid or missing, try to get from current window
  if (!origin || origin === 'about:' || !origin.includes('://')) {
    try {
      origin = window.location.origin;
      
      // If origin is invalid (like "about:"), try to construct it
      if (!origin || origin === 'null' || origin === 'undefined' || origin === 'about:' || !origin.includes('://')) {
        // Try to construct from protocol and host
        if (window.location.protocol && window.location.host) {
          origin = `${window.location.protocol}//${window.location.host}`;
        } else {
          // If that fails, try to get from document.referrer
          try {
            const referrer = document.referrer;
            if (referrer) {
              const referrerUrl = new URL(referrer);
              origin = referrerUrl.origin;
            }
          } catch (e) {
            // If all else fails, use empty string (will use relative URLs)
            origin = '';
          }
        }
      }
      
      // If we got a valid origin, store it for future use
      if (origin && origin !== 'about:' && origin.includes('://')) {
        storedOrigin = origin;
        sessionStorage.setItem('proxyOrigin', origin);
      }
    } catch (e) {
      // If we can't get origin, we'll use relative URLs
      origin = '';
    }
  }
  
  // Construct the navigation URL
  let navUrl;
  if (isYouTube) {
    // YouTube: Use Dynamic transport (/a/q/)
    navUrl = origin && origin !== 'about:' ? `${origin}/a/q/${__uv$config.encodeUrl(url)}` : `/a/q/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    // Other sites: Use Ultraviolet (default)
    if (path.startsWith('http://') || path.startsWith('https://')) {
      navUrl = path;
    } else {
      navUrl = origin && origin !== 'about:' ? `${origin}${path}` : path;
    }
  } else {
    // Other sites: Use Ultraviolet (default)
    navUrl = origin && origin !== 'about:' ? `${origin}/a/${__uv$config.encodeUrl(url)}` : `/a/${__uv$config.encodeUrl(url)}`;
  }
  
  // Check if we're in an iframe and about:blank is enabled
  // If so, open a new about:blank tab with the target URL
  const abEnabled = localStorage.getItem("ab") === "true";
  if (inFrame && abEnabled && !navigator.userAgent.includes("Firefox")) {
    openAboutBlankTab(navUrl);
    return;
  }
  
  // Normal navigation
  window.location.href = navUrl;
}

// Helper function to open a new about:blank tab with the target URL
function openAboutBlankTab(targetUrl) {
  const popup = window.open("about:blank", "_blank");
  
  if (!popup || popup.closed) {
    // If popup was blocked, fall back to normal navigation
    alert("Please allow popups for this site. Falling back to normal navigation.");
    window.location.href = targetUrl;
    return;
  }
  
  setTimeout(() => {
    if (popup.closed) {
      window.location.href = targetUrl;
      return;
    }
    
    try {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");

      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

      doc.title = name;
      link.rel = "icon";
      link.href = icon;

      // Ensure targetUrl is an absolute URL for about:blank context
      let absoluteUrl = targetUrl;
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        // It's a relative URL, need to make it absolute
        let baseOrigin = storedOrigin || sessionStorage.getItem('proxyOrigin') || '';
        
        // If we still don't have a valid origin, try multiple methods
        if (!baseOrigin || baseOrigin === 'about:' || !baseOrigin.includes('://')) {
          try {
            // Method 1: Try to get from current window location (if not in about:blank)
            if (window.location.origin && window.location.origin !== 'null' && 
                window.location.origin !== 'undefined' && window.location.origin !== 'about:' &&
                window.location.origin.includes('://')) {
              baseOrigin = window.location.origin;
            }
            // Method 2: Try to get from top window (if we're in an iframe)
            else if (window.top && window.top !== window) {
              try {
                const topOrigin = window.top.location.origin;
                if (topOrigin && topOrigin !== 'null' && topOrigin !== 'about:' && topOrigin.includes('://')) {
                  baseOrigin = topOrigin;
                }
              } catch (e) {
                // Cross-origin, can't access
              }
            }
            // Method 3: Try document.referrer
            if ((!baseOrigin || baseOrigin === 'about:' || !baseOrigin.includes('://')) && document.referrer) {
              try {
                const referrerUrl = new URL(document.referrer);
                baseOrigin = referrerUrl.origin;
              } catch (e) {
                // Invalid referrer
              }
            }
          } catch (e) {
            console.error("Could not determine origin:", e);
          }
        }
        
        // Construct absolute URL
        if (baseOrigin && baseOrigin !== 'about:' && baseOrigin.includes('://')) {
          // Ensure targetUrl starts with /
          if (!targetUrl.startsWith('/')) {
            targetUrl = '/' + targetUrl;
          }
          absoluteUrl = baseOrigin + targetUrl;
        } else {
          console.error("Cannot create absolute URL - no valid origin found. targetUrl:", targetUrl);
          // Fall back to normal navigation in the current window
          try {
            window.location.href = targetUrl;
          } catch (e) {
            console.error("Fallback navigation also failed:", e);
          }
          return;
        }
      }

      // Set the iframe src to the absolute proxied URL
      iframe.src = absoluteUrl;
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";

      doc.head.appendChild(link);
      doc.body.appendChild(iframe);

      const script = doc.createElement("script");
      script.textContent = `
        window.onbeforeunload = function (event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `;
      doc.head.appendChild(script);
    } catch (e) {
      console.error("Error creating about:blank tab:", e);
      // If there's an error, try normal navigation
      window.location.href = targetUrl;
    }
  }, 100);
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
