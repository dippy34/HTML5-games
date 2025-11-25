const fs = require('fs');
const path = require('path');

const gamesJsonPath = path.join(__dirname, 'interstellar-static', 'assets', 'json', 'g.min.json');
const sourcePath = path.join(__dirname, '3kh0-assets', 'stickman-hook');
const destPath = path.join(__dirname, 'html5', 'load', 'stickman-hook');

console.log('Reading games JSON...');
const games = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));

// Fix stickman hook - copy from 3kh0-assets if it exists
if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
  console.log('Copying stickman-hook from 3kh0-assets...');
  copyRecursiveSync(sourcePath, destPath);
  console.log('Stickman hook copied successfully!');
}

// Remove duplicates - prioritize local games
console.log('\nFinding and removing duplicates...');
const gameMap = new Map();
const duplicates = [];

games.forEach((game, index) => {
  const normalizedName = game.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  if (gameMap.has(normalizedName)) {
    const existing = gameMap.get(normalizedName);
    const existingIsLocal = existing.link?.includes('/e/') && !existing.link?.includes('http');
    const currentIsLocal = game.link?.includes('/e/') && !game.link?.includes('http');
    
    // Prioritize local games
    if (currentIsLocal && !existingIsLocal) {
      duplicates.push(existing.index);
      gameMap.set(normalizedName, { ...game, index });
    } else {
      duplicates.push(index);
    }
  } else {
    gameMap.set(normalizedName, { ...game, index });
  }
});

// Remove duplicates (in reverse order to maintain indices)
const uniqueGames = games.filter((game, index) => !duplicates.includes(index));

console.log(`Removed ${duplicates.length} duplicate games`);
console.log(`Total games: ${uniqueGames.length} (was ${games.length})`);

// Write updated JSON
fs.writeFileSync(gamesJsonPath, JSON.stringify(uniqueGames, null, 2));
console.log('\nGames JSON updated successfully!');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      if (childItemName !== '.git') {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      }
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

