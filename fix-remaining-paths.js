const fs = require('fs');
const path = require('path');

const gamesJsonPath = path.join(__dirname, 'interstellar-static', 'assets', 'json', 'g.min.json');

console.log('Reading games JSON...');
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

let fixed = 0;
let removed = 0;
const gamesToKeep = [];

games.forEach(game => {
  if (game.link && game.link.startsWith('/e/') && !game.link.startsWith('/e/load/')) {
    // Extract game name from various path formats
    let gameName = null;
    
    if (game.link.startsWith('/e/1/')) {
      gameName = game.link.split('/e/1/')[1].split('/')[0];
    } else if (game.link.startsWith('/e/2/')) {
      gameName = game.link.split('/e/2/')[1].split('/')[0];
    } else if (game.link === '/e/index.html') {
      // Web Retro - check if it exists
      const testPath = path.join(__dirname, 'html5', 'load', 'webretro', 'index.html');
      if (fs.existsSync(testPath)) {
        game.link = '/e/load/webretro/index.html';
        fixed++;
        gamesToKeep.push(game);
        return;
      } else {
        // Remove if not found
        removed++;
        return;
      }
    } else {
      // Regular /e/gamename/index.html
      const parts = game.link.split('/');
      if (parts.length >= 4 && parts[1] === 'e') {
        gameName = parts[2];
      }
    }
    
    if (gameName) {
      // Check if it exists in html5/load/
      const testPath = path.join(__dirname, 'html5', 'load', gameName, 'index.html');
      if (fs.existsSync(testPath)) {
        game.link = `/e/load/${gameName}/index.html`;
        fixed++;
        gamesToKeep.push(game);
      } else {
        // Check if it exists in html5/ directly
        const altPath = path.join(__dirname, 'html5', gameName, 'index.html');
        if (fs.existsSync(altPath)) {
          game.link = `/e/${gameName}/index.html`;
          fixed++;
          gamesToKeep.push(game);
        } else {
          console.log(`Removing ${game.name} - not found anywhere`);
          removed++;
          return; // Don't add to gamesToKeep
        }
      }
    } else {
      gamesToKeep.push(game);
    }
  } else {
    gamesToKeep.push(game);
  }
});

console.log(`Fixed ${fixed} game paths`);
console.log(`Removed ${removed} games that don't exist`);

// Write updated JSON
fs.writeFileSync(gamesJsonPath, JSON.stringify(gamesToKeep, null, 2));
console.log(`Total games: ${gamesToKeep.length} (was ${games.length})`);
console.log('Games JSON updated successfully!');

