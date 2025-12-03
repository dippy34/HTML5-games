// Google Analytics 4 Integration
// This script handles Google Analytics tracking across all pages

(function() {
    'use strict';
    
    // Get GA4 Measurement ID from meta tag or config
    function getGA4MeasurementId() {
        // Try to get from meta tag first (allows per-page configuration)
        const metaTag = document.querySelector('meta[name="ga4-measurement-id"]');
        if (metaTag && metaTag.content) {
            return metaTag.content.trim();
        }
        
        // Fallback to window config (set in HTML)
        if (window.GA4_MEASUREMENT_ID) {
            return window.GA4_MEASUREMENT_ID;
        }
        
        return null;
    }
    
    // Respect Do Not Track
    function shouldTrack() {
        // Check if user has Do Not Track enabled
        if (navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes') {
            return false;
        }
        return true;
    }
    
    // Initialize Google Analytics
    function initGA4() {
        const measurementId = getGA4MeasurementId();
        
        if (!measurementId) {
            console.warn('[GA4] Measurement ID not configured. Google Analytics will not track.');
            return;
        }
        
        if (!shouldTrack()) {
            console.log('[GA4] Do Not Track is enabled. Skipping analytics.');
            return;
        }
        
        // Load Google Analytics gtag.js
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script1);
        
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', measurementId, {
            // Privacy-friendly settings
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            page_path: window.location.pathname + window.location.search,
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Track page view
        trackPageView();
        
        console.log('[GA4] Google Analytics initialized with ID:', measurementId);
    }
    
    // Track page view
    function trackPageView() {
        if (!window.gtag) return;
        
        window.gtag('event', 'page_view', {
            page_path: window.location.pathname + window.location.search,
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track custom events (can be called from other scripts)
    window.trackGAEvent = function(eventName, eventParams) {
        if (!window.gtag || !shouldTrack()) return;
        
        window.gtag('event', eventName, eventParams || {});
    };
    
    // Track URL visits (for visited URLs feature)
    window.trackVisitedUrl = function(url, domain) {
        if (!window.gtag || !shouldTrack()) return;
        
        window.gtag('event', 'url_visit', {
            url: url,
            domain: domain,
            event_category: 'Navigation',
            event_label: domain
        });
    };
    
    // Track search events
    window.trackSearch = function(searchQuery, searchEngine) {
        if (!window.gtag || !shouldTrack()) return;
        
        window.gtag('event', 'search', {
            search_term: searchQuery,
            search_engine: searchEngine || 'unknown',
            event_category: 'Search'
        });
    };
    
    // Track game plays
    window.trackGamePlay = function(gameName) {
        if (!window.gtag || !shouldTrack()) return;
        
        window.gtag('event', 'game_play', {
            game_name: gameName,
            event_category: 'Games'
        });
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGA4);
    } else {
        initGA4();
    }
    
    // Track page views on navigation (for SPA-like behavior)
    let lastUrl = window.location.href;
    new MutationObserver(() => {
        const currentUrl = window.location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            // Small delay to ensure page has updated
            setTimeout(trackPageView, 100);
        }
    }).observe(document, { subtree: true, childList: true });
})();

