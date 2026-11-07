import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find Grassland Gala card snippet
const gIdx = subHtml.indexOf('Grassland Gala');
if (gIdx !== -1) {
  console.log('=== GRASSLAND GALA CARD SNIPPET ===');
  console.log(subHtml.slice(gIdx - 200, gIdx + 800));
}

// Find Garden Galaxy card snippet
const ggIdx = subHtml.indexOf('Garden Galaxy');
if (ggIdx !== -1) {
  console.log('=== GARDEN GALAXY CARD SNIPPET ===');
  console.log(subHtml.slice(ggIdx - 200, ggIdx + 800));
}
