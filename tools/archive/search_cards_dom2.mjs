import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

// Find where the cards are in the markup (before the scripts)
const idx = html.indexOf('Open Earth Lawn', 0);
console.log('first match:', idx);

// Search for 'N°01' or 'N°' in HTML
let nIdx = 0;
while ((nIdx = html.indexOf('N°', nIdx)) !== -1) {
  console.log('N° at:', nIdx);
  console.log(html.slice(Math.max(0, nIdx - 150), Math.min(html.length, nIdx + 150)));
  console.log('===');
  nIdx += 2;
  if (nIdx > 800000) break; // only first few
}
