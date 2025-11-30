const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoPath = path.join(__dirname, '3kh0-assets');
const targetPath = path.join(__dirname, 'html5', 'load');
const gamesJsonPath = path.join(__dirname, 'interstellar-static', 'assets', 'json', 'g.min.json');

console.log('Scanning 3kh0-assets repository...');

// Get all directories
const existingDirs = fs.readdirSync(repoPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && dirent.name !== 'js')
  .map(dirent => dirent.name);

console.log(`Found ${existingDirs.length} directories`);

// Check each directory to see if it has index.html and was added in a "done" commit
const gamesToAdd = [];
const skipped = [];

existingDirs.forEach(dir => {
  const indexPath = path.join(repoPath, dir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    return; // Skip if no index.html
  }
  
  // Check the commit that added this file
  try {
    const logOutput = execSync(`git log --oneline --follow -- "${dir}/index.html" -1`, {
      cwd: repoPath,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024
    });
    
    const commitLine = logOutput.trim().split('\n')[0]; // Get first line only
    if (commitLine) {
      const commitMsg = commitLine.toLowerCase();
      // Check if commit message contains "done" and not "push files"
      if (commitMsg.includes('done') && !commitMsg.includes('push files')) {
        gamesToAdd.push(dir);
      } else if (!commitMsg.includes('push files') && (commitMsg.includes('add') || commitMsg.includes('update'))) {
        // Also include if it says "add" or "update" but not "push files"
        gamesToAdd.push(dir);
      } else {
        skipped.push({ dir, reason: commitMsg });
      }
    } else {
      // If we can't find commit, check if it's a valid game directory
      gamesToAdd.push(dir);
    }
  } catch (error) {
    // If git log fails, assume it's a valid game
    gamesToAdd.push(dir);
  }
});

console.log(`\nGames to add: ${gamesToAdd.length}`);
console.log(`Skipped (push files): ${skipped.length}`);

// Read current games
const currentGames = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
const existingGameNames = new Set(currentGames.map(g => g.name.toLowerCase().replace(/[^a-z0-9]/g, '')));

// Copy games and add to JSON
let copiedCount = 0;
let addedCount = 0;
const newGames = [];

gamesToAdd.forEach(gameDir => {
  const normalizedName = gameDir.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Skip if already exists
  if (existingGameNames.has(normalizedName)) {
    return;
  }
  
  const sourcePath = path.join(repoPath, gameDir);
  const destPath = path.join(targetPath, gameDir);
  
  try {
    // Copy directory
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursiveSync(sourcePath, destPath);
      copiedCount++;
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
    addedCount++;
  } catch (error) {
    console.error(`Error processing ${gameDir}:`, error.message);
  }
});

// Add new games to the list
const updatedGames = [...currentGames, ...newGames];

// Write updated JSON
fs.writeFileSync(gamesJsonPath, JSON.stringify(updatedGames, null, 2));

console.log(`\nSummary:`);
console.log(`  Copied: ${copiedCount} games`);
console.log(`  Added to JSON: ${addedCount} games`);
console.log(`  Total games now: ${updatedGames.length}`);

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


