const fs = require('fs');
const path = require('path');

const baseDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const subHtml = fs.readFileSync(path.join(baseDir, 'venues/open-earth-lawn.html'), 'utf8');

const vIdx = subHtml.indexOf('href="/venues.html"');
const vEnd = subHtml.indexOf('</a>', vIdx);
console.log('=== VENUES FULL A TAG IN SUBPAGE ===');
console.log(subHtml.substring(vIdx - 50, vEnd + 4));

const aIdx = subHtml.indexOf('href="/about.html"');
const aEnd = subHtml.indexOf('</a>', aIdx);
console.log('=== ABOUT FULL A TAG IN SUBPAGE ===');
console.log(subHtml.substring(aIdx - 50, aEnd + 4));
