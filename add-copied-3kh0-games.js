const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoPath = path.join(__dirname, '3kh0-assets');
const targetPath = path.join(__dirname, 'html5', 'load');
const gamesJsonPath = path.join(__dirname, 'interstellar-static', 'assets', 'json', 'g.min.json');

console.log('Finding games that were successfully copied...');

// Get all directories that exist in both source and destination
const sourceDirs = fs.readdirSync(repoPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && dirent.name !== 'js')
  .map(dirent => dirent.name);

const destDirs = new Set();
if (fs.existsSync(targetPath)) {
  fs.readdirSync(targetPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .forEach(dirent => destDirs.add(dirent.name));
}

// Find games that exist in both and have index.html in destination
const gamesToAdd = sourceDirs.filter(dir => {
  if (!destDirs.has(dir)) return false;
  const indexPath = path.join(targetPath, dir, 'index.html');
  return fs.existsSync(indexPath);
});

console.log(`Found ${gamesToAdd.length} successfully copied games`);

// Read current games
const currentGames = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
const existingGameDirs = new Set();
currentGames.forEach(g => {
  if (g.link) {
    // Extract directory name from /e/load/{dirname}/index.html
    const match = g.link.match(/\/e\/load\/([^\/]+)\/index\.html$/);
    if (match) {
      existingGameDirs.add(match[1].toLowerCase());
    }
  }
});
console.log(`Found ${existingGameDirs.size} existing games in JSON with /e/load/ links`);

// Add games that don't already exist
const newGames = [];
gamesToAdd.forEach(gameDir => {
  const normalizedDir = gameDir.toLowerCase();
  
  // Skip if already exists
  if (existingGameDirs.has(normalizedDir)) {
    return;
  }
  
  // Add to games list
  const gameName = gameDir.split(/[-_]/).map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
  
  newGames.push({
    name: gameName,
    link: `/e/load/${gameDir}/index.html`,
    image: '',
    categories: ['all', 'local'],
    local: true,
    description: `Experience ${gameName}, a fun and engaging game.`
  });
});

if (newGames.length === 0) {
  console.log('No new games to add.');
  process.exit(0);
}

// Add new games to the list
const updatedGames = [...currentGames, ...newGames];

// Try to write updated JSON
try {
  fs.writeFileSync(gamesJsonPath, JSON.stringify(updatedGames, null, 2));
  console.log(`\nSuccessfully added ${newGames.length} games to JSON`);
  console.log(`Total games now: ${updatedGames.length}`);
} catch (error) {
  console.error(`\nError writing JSON file: ${error.message}`);
  console.log(`\nWould have added ${newGames.length} games`);
  console.log(`Total would be: ${updatedGames.length}`);
  console.log('\nFirst 10 games that would be added:');
  newGames.slice(0, 10).forEach(g => console.log(`  - ${g.name}`));
  process.exit(1);
}

