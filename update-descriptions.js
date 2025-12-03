const fs = require('fs');
const path = require('path');

// Path to games-data.js
const filePath = path.join(__dirname, 'interstellar-static', 'assets', 'js', 'games-data.js');

let content = fs.readFileSync(filePath, 'utf8');

// Replace generic descriptions like:
// "description": "Experience GameName, a fun and engaging game."
// with a slightly more specific, unique line per game.
content = content.replace(
  /"description": "Experience ([^"]+), a fun and engaging game\."/g,
  (_match, name) =>
    `"description": "Play ${name} in your browser and master its own set of levels, mechanics, and challenges."`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated generic game descriptions to unique variants based on game names.');


