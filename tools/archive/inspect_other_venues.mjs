import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find "Other Venues" or "grassland-gala" in subHtml
const gIdx = subHtml.indexOf('grassland-gala');
console.log('grassland-gala index:', gIdx);
if (gIdx !== -1) {
  console.log('Snippet around grassland-gala:\n', subHtml.slice(gIdx - 300, gIdx + 600));
}

// Find all cards in Other Venues section
const oIdx = subHtml.indexOf('Other Venues') !== -1 ? subHtml.indexOf('Other Venues') : subHtml.indexOf('Other Apartments');
console.log('Other Venues/Apartments index:', oIdx);
if (oIdx !== -1) {
  console.log('Snippet around Other Venues title:\n', subHtml.slice(oIdx - 200, oIdx + 800));
}
