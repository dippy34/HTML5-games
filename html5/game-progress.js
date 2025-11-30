// Nova Hub Game Progress Manager
// This script can be included in game pages to save/load progress

(function() {
    'use strict';
    
    // Get game name from URL or page
    function getGameName() {
        const path = window.location.pathname;
        const match = path.match(/html5\/([^\/]+)\/index\.html/);
        if (match) {
            return match[1].replace('load/', '');
        }
        // Fallback: try to get from page title or other sources
        const title = document.title.toLowerCase();
        return title.split(' ')[0] || 'unknown';
    }
    
    const gameName = getGameName();
    const STORAGE_KEY = `nova_hub_progress_${gameName}`;
    
    // Progress Manager API
    window.NovaHubProgress = {
        // Save progress data
        save: function(data) {
            try {
                const progress = {
                    gameName: gameName,
                    data: data,
                    timestamp: Date.now(),
                    version: '1.0'
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
                
                // Notify parent window if in iframe
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
        
        // Load progress data
        load: function() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const progress = JSON.parse(stored);
                    return progress.data || null;
                }
                return null;
            } catch (e) {
                console.error('Failed to load progress:', e);
                return null;
            }
        },
        
        // Clear progress
        clear: function() {
            try {
                localStorage.removeItem(STORAGE_KEY);
                
                // Notify parent window
                if (window.parent !== window) {
                    window.parent.postMessage({
                        type: 'nova_hub_progress_cleared',
                        gameName: gameName
                    }, '*');
                }
                
                return true;
            } catch (e) {
                console.error('Failed to clear progress:', e);
                return false;
            }
        },
        
        // Check if progress exists
        hasProgress: function() {
            return localStorage.getItem(STORAGE_KEY) !== null;
        },
        
        // Get progress info
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
        },
        
        // Auto-save helper (saves every N seconds)
        autoSave: function(getDataCallback, intervalSeconds = 30) {
            if (this._autoSaveInterval) {
                clearInterval(this._autoSaveInterval);
            }
            
            this._autoSaveInterval = setInterval(() => {
                if (typeof getDataCallback === 'function') {
                    const data = getDataCallback();
                    if (data) {
                        this.save(data);
                    }
                }
            }, intervalSeconds * 1000);
        },
        
        // Stop auto-save
        stopAutoSave: function() {
            if (this._autoSaveInterval) {
                clearInterval(this._autoSaveInterval);
                this._autoSaveInterval = null;
            }
        }
    };
    
    // Listen for messages from parent (if in iframe)
    window.addEventListener('message', function(event) {
        if (event.data && event.data.type === 'nova_hub_request_progress') {
            const progress = window.NovaHubProgress.load();
            if (window.parent !== window) {
                window.parent.postMessage({
                    type: 'nova_hub_progress_response',
                    gameName: gameName,
                    progress: progress
                }, '*');
            }
        }
    });
    
    // Auto-detect common game save patterns and auto-save
    if (typeof window.gameSave !== 'undefined') {
        // If game has a gameSave function, wrap it
        const originalSave = window.gameSave;
        window.gameSave = function(data) {
            window.NovaHubProgress.save(data);
            if (originalSave) return originalSave(data);
        };
    }
    
    // Try to detect Unity games and hook into their save system
    if (typeof gameInstance !== 'undefined' && gameInstance.SendMessage) {
        // Unity game detected - try to hook into save system
        const originalSendMessage = gameInstance.SendMessage;
        // This is game-specific and may need customization per game
    }
    
    console.log('Nova Hub Progress Manager loaded for:', gameName);
})();

