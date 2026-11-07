const fs = require('fs');
const path = require('path');
const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

const lines = subHtml.split('\n');
lines.forEach((l, i) => {
  if (l.includes('nth-child(2)') || l.includes('nth-child(3)')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
