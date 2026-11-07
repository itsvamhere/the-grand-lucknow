import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const ggIdx = subHtml.indexOf('alt="Grassland Gala"');
const detailsIdx = subHtml.indexOf('data-framer-name="Details"', ggIdx);
console.log('=== GRASSLAND GALA DETAILS HTML ===');
console.log(subHtml.slice(detailsIdx, detailsIdx + 2200));

const gaIdx = subHtml.indexOf('alt="Garden Galaxy"');
const detailsIdx2 = subHtml.indexOf('data-framer-name="Details"', gaIdx);
console.log('=== GARDEN GALAXY DETAILS HTML ===');
console.log(subHtml.slice(detailsIdx2, detailsIdx2 + 2200));
