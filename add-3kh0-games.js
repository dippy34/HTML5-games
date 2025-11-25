const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoPath = path.join(__dirname, '3kh0-assets');
const targetPath = path.join(__dirname, 'html5', 'load');
const gamesJsonPath = path.join(__dirname, 'interstellar-static', 'assets', 'json', 'g.min.json');

// Get all commits, filter for "done" (not "push files")
console.log('Finding commits marked as "done"...');
let doneCommits = [];
try {
  const allLogs = execSync('git log --oneline -200', { 
    cwd: repoPath,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
  const allCommits = allLogs.trim().split('\n').filter(line => line.trim());
  
  // Filter for commits that contain "done" but not "push files"
  doneCommits = allCommits.filter(line => {
    const msg = line.toLowerCase();
    return (msg.includes('done') || msg.includes('add') || msg.includes('update')) && 
           !msg.includes('push files');
  });
  
  console.log(`Found ${doneCommits.length} commits with "done" (out of ${allCommits.length} total)`);
  if (doneCommits.length === 0) {
    console.log('No "done" commits found. Will check all directories with index.html instead.');
  }
} catch (error) {
  console.log('Error reading git log:', error.message);
  console.log('Will check all directories with index.html instead.');
}

// Get all files changed in "done" commits
const gameDirs = new Set();
if (doneCommits.length > 0) {
  doneCommits.forEach(commit => {
    const hash = commit.split(' ')[0];
    try {
      const files = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
        cwd: repoPath,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024
      });
      files.trim().split('\n').forEach(file => {
        // Extract directory name (first part of path)
        const dir = file.split('/')[0];
        if (dir && dir !== '.' && !dir.includes('README') && !dir.includes('js')) {
          gameDirs.add(dir);
        }
      });
    } catch (error) {
      // Skip if commit doesn't exist
    }
  });
  console.log(`\nFound ${gameDirs.size} unique game directories from "done" commits`);
} else {
  console.log('\nNo "done" commits found. Will use all directories with index.html files.');
}

// Also check which directories actually exist
const existingDirs = fs.readdirSync(repoPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && dirent.name !== 'js')
  .map(dirent => dirent.name);

console.log(`Total directories in repo: ${existingDirs.length}`);

// Filter to only games that exist and were in "done" commits (or all if no done commits)
let gamesToAdd;
if (gameDirs.size > 0) {
  gamesToAdd = Array.from(gameDirs).filter(dir => existingDirs.includes(dir));
} else {
  // If no done commits, use all directories that have index.html
  gamesToAdd = existingDirs.filter(dir => {
    const indexPath = path.join(repoPath, dir, 'index.html');
    return fs.existsSync(indexPath);
  });
}

console.log(`\nGames to add: ${gamesToAdd.length}`);
gamesToAdd.slice(0, 20).forEach(g => console.log(`  - ${g}`));

// Read current games
const currentGames = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
const existingGameNames = new Set(currentGames.map(g => g.name.toLowerCase().replace(/\s+/g, '')));

// Copy games and add to JSON
let copiedCount = 0;
let addedCount = 0;
const newGames = [];

gamesToAdd.forEach(gameDir => {
  const normalizedName = gameDir.toLowerCase().replace(/\s+/g, '');
  
  // Skip if already exists
  if (existingGameNames.has(normalizedName)) {
    return;
  }
  
  const sourcePath = path.join(repoPath, gameDir);
  const destPath = path.join(targetPath, gameDir);
  
  // Check if index.html exists
  const indexPath = path.join(sourcePath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    // Try to find any HTML file
    const files = fs.readdirSync(sourcePath);
    const htmlFile = files.find(f => f.endsWith('.html'));
    if (!htmlFile) {
      return; // Skip if no HTML file
    }
  }
  
  try {
    // Copy directory
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursiveSync(sourcePath, destPath);
      copiedCount++;
    }
    
    // Add to games list
    const gameName = gameDir.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
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

