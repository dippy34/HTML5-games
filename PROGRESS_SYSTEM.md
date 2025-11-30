# Game Progress System

Nova Hub includes a built-in progress saving system that allows games to save and load player progress using localStorage.

## How It Works

Progress is automatically saved in the browser's localStorage with keys like `nova_hub_progress_[gameName]`. Games can use the `NovaHubProgress` API to save and load their state.

## For Game Developers

### Including the Progress Manager

Add this script to your game's HTML file (before your game code):

```html
<script src="../game-progress.js"></script>
```

Or if your game is in a subdirectory:
```html
<script src="../../game-progress.js"></script>
```

### Using the Progress API

Once included, games can use `window.NovaHubProgress`:

#### Save Progress
```javascript
// Save game state
const gameState = {
    level: 5,
    score: 1000,
    inventory: ['sword', 'potion'],
    // ... any game data
};

NovaHubProgress.save(gameState);
```

#### Load Progress
```javascript
// Load saved progress
const savedState = NovaHubProgress.load();

if (savedState) {
    // Restore game state
    player.level = savedState.level;
    player.score = savedState.score;
    player.inventory = savedState.inventory;
    // ...
}
```

#### Check if Progress Exists
```javascript
if (NovaHubProgress.hasProgress()) {
    // Show "Continue" button
}
```

#### Get Progress Info
```javascript
const info = NovaHubProgress.getInfo();
if (info.exists) {
    console.log('Progress saved on:', info.date);
}
```

#### Clear Progress
```javascript
NovaHubProgress.clear();
```

#### Auto-Save
```javascript
// Auto-save every 30 seconds
NovaHubProgress.autoSave(() => {
    return {
        level: currentLevel,
        score: currentScore,
        // ... current game state
    };
}, 30); // Save every 30 seconds

// Stop auto-save
NovaHubProgress.stopAutoSave();
```

## Example Implementation

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Game</title>
    <script src="../game-progress.js"></script>
</head>
<body>
    <div id="game"></div>
    <script>
        // Load saved progress on game start
        const savedState = NovaHubProgress.load();
        
        let gameState = savedState || {
            level: 1,
            score: 0,
            lives: 3
        };
        
        // Save progress when level completes
        function onLevelComplete() {
            gameState.level++;
            NovaHubProgress.save(gameState);
        }
        
        // Auto-save every 60 seconds
        NovaHubProgress.autoSave(() => gameState, 60);
    </script>
</body>
</html>
```

## Progress Indicators

Games with saved progress will automatically show a 💾 badge on their game card in Nova Hub. The badge appears when progress is saved.

## Progress Management

Users can manage their saved progress in Settings:
- View all games with saved progress
- Clear individual game progress
- Clear all progress at once
- Refresh progress indicators

## Storage Format

Progress is stored as JSON in localStorage:
```json
{
    "gameName": "mygame",
    "data": { /* your game data */ },
    "timestamp": 1234567890,
    "version": "1.0"
}
```

## Notes

- Progress is stored per browser (localStorage is browser-specific)
- Progress persists across sessions
- Each game has its own storage key
- Maximum storage: ~5-10MB per browser (localStorage limit)

