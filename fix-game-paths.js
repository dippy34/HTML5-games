const fs = require('fs');
const path = require('path');

const gamesJsonPath = path.join(__dirname, 'interstellar-static', 'assets', 'json', 'g.min.json');

console.log('Reading games JSON...');
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

let fixed = 0;
games.forEach(game => {
  if (game.link && game.link.startsWith('/e/') && !game.link.startsWith('/e/load/')) {
    // Check if it's a special case like /e/index.html or /e/1/ or /e/2/
    if (game.link === '/e/index.html' || game.link.startsWith('/e/1/') || game.link.startsWith('/e/2/')) {
      // These are in html5 directory, not html5/load
      // Keep them as is or convert to /e/load/ if they exist there
      const gameName = game.link.split('/').filter(p => p && p !== 'e' && p !== 'index.html' && p !== '1' && p !== '2').pop();
      if (gameName) {
        const testPath = path.join(__dirname, 'html5', 'load', gameName, 'index.html');
        if (fs.existsSync(testPath)) {
          game.link = `/e/load/${gameName}/index.html`;
          fixed++;
        }
      }
    } else {
      // Regular /e/gamename/index.html -> /e/load/gamename/index.html
      const parts = game.link.split('/');
      if (parts.length >= 4 && parts[1] === 'e' && parts[parts.length - 1] === 'index.html') {
        const gameName = parts[2];
        const newLink = `/e/load/${gameName}/index.html`;
        const testPath = path.join(__dirname, 'html5', 'load', gameName, 'index.html');
        if (fs.existsSync(testPath)) {
          game.link = newLink;
          fixed++;
        } else {
          console.log(`Warning: ${game.name} - ${gameName} not found in html5/load/`);
        }
      }
    }
  }
});

console.log(`Fixed ${fixed} game paths`);

// Write updated JSON
fs.writeFileSync(gamesJsonPath, JSON.stringify(games, null, 2));
console.log('Games JSON updated successfully!');

