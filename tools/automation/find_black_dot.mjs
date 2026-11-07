import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Search for any element or cursor dot or SVG with black circle
console.log('Searching for black dot in HTML...');
const cursorMatches = html.match(/class="[^"]*cursor[^"]*"/g);
console.log('Cursor classes:', cursorMatches ? cursorMatches.slice(0, 5) : 'None');

// Check morph-cursor
const morphIdx = html.indexOf('data-morph-cursor');
if (morphIdx !== -1) {
  console.log('data-morph-cursor snippet:', html.slice(morphIdx - 100, morphIdx + 300));
}
