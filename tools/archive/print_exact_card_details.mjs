import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const ggIdx = subHtml.indexOf('alt="Grassland Gala"');
console.log('=== GRASSLAND GALA framer-pdn1cz ===');
const detailsIdx = subHtml.indexOf('data-framer-name="Details"', ggIdx);
console.log(subHtml.slice(detailsIdx, detailsIdx + 1200));

const gaIdx = subHtml.indexOf('alt="Garden Galaxy"');
console.log('=== GARDEN GALAXY framer-pdn1cz ===');
const detailsIdx2 = subHtml.indexOf('data-framer-name="Details"', gaIdx);
console.log(subHtml.slice(detailsIdx2, detailsIdx2 + 1200));
