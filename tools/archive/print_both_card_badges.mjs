import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const ggIdx = subHtml.indexOf('alt="Grassland Gala"');
console.log('=== GRASSLAND GALA BADGES ===');
console.log(subHtml.slice(ggIdx, ggIdx + 2500));

const gaIdx = subHtml.indexOf('alt="Garden Galaxy"');
console.log('=== GARDEN GALAXY BADGES ===');
console.log(subHtml.slice(gaIdx, gaIdx + 2500));
