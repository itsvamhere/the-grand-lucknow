import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find Grassland Gala card snippet
const gIdx = subHtml.indexOf('alt="Grassland Gala"');
console.log('Grassland Gala people snippet:\n', subHtml.slice(gIdx, gIdx + 2000));
