// Progress Injector - Automatically injects progress manager into game pages
// This script should be included in game HTML files or injected via a wrapper

(function() {
    'use strict';
    
    // Only run if not already loaded
    if (window.NovaHubProgress) {
        return;
    }
    
    // Create script element to load progress manager
    const script = document.createElement('script');
    script.src = '../game-progress.js';
    script.onerror = function() {
        // Try alternative path
        const script2 = document.createElement('script');
        script2.src = './game-progress.js';
        document.head.appendChild(script2);
    };
    document.head.appendChild(script);
    
    // Also create inline version as fallback
    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
        (function() {
            function getGameName() {
                const path = window.location.pathname;
                const match = path.match(/html5\\/([^\\/]+)\\/index\\.html/);
                if (match) return match[1].replace('load/', '');
                const title = document.title.toLowerCase();
                return title.split(' ')[0] || 'unknown';
            }
            
            const gameName = getGameName();
            const STORAGE_KEY = 'nova_hub_progress_' + gameName;
            
            window.NovaHubProgress = {
                save: function(data) {
                    try {
                        const progress = {
                            gameName: gameName,
                            data: data,
                            timestamp: Date.now(),
                            version: '1.0'
                        };
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
                        if (window.parent !== window) {
                            window.parent.postMessage({
                                type: 'nova_hub_progress_saved',
                                gameName: gameName,
                                timestamp: progress.timestamp
                            }, '*');
                        }
                        return true;
                    } catch (e) {
                        console.error('Failed to save progress:', e);
                        return false;
                    }
                },
                load: function() {
                    try {
                        const stored = localStorage.getItem(STORAGE_KEY);
                        if (stored) {
                            const progress = JSON.parse(stored);
                            return progress.data || null;
                        }
                        return null;
                    } catch (e) {
                        return null;
                    }
                },
                clear: function() {
                    try {
                        localStorage.removeItem(STORAGE_KEY);
                        if (window.parent !== window) {
                            window.parent.postMessage({
                                type: 'nova_hub_progress_cleared',
                                gameName: gameName
                            }, '*');
                        }
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
                hasProgress: function() {
                    return localStorage.getItem(STORAGE_KEY) !== null;
                },
                getInfo: function() {
                    try {
                        const stored = localStorage.getItem(STORAGE_KEY);
                        if (stored) {
                            const progress = JSON.parse(stored);
                            return {
                                exists: true,
                                timestamp: progress.timestamp,
                                date: new Date(progress.timestamp).toLocaleString()
                            };
                        }
                        return { exists: false };
                    } catch (e) {
                        return { exists: false };
                    }
                }
            };
        })();
    `;
    document.head.appendChild(inlineScript);
})();

