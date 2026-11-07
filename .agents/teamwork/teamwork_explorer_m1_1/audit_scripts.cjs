const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const idxHtml = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

// Search for ticker scripts or styles in subpage
console.log('=== SCRIPTS / STYLES WITH TICKER OR GRAND IN SUBPAGE ===');
const subLines = subHtml.split('\n');
subLines.forEach((line, i) => {
  if (line.includes('ticker') || line.includes('marquee') || line.includes('grand-ticker')) {
    console.log(`Line ${i+1}: ${line.trim().substring(0, 120)}`);
  }
});

// Search for ticker scripts or styles in index.html
console.log('=== SCRIPTS / STYLES WITH TICKER OR MARQUEE IN INDEX.HTML ===');
const idxLines = idxHtml.split('\n');
idxLines.forEach((line, i) => {
  if (line.includes('ticker') || line.includes('marquee') || line.includes('18na9ah')) {
    console.log(`Line ${i+1}: ${line.trim().substring(0, 120)}`);
  }
});
