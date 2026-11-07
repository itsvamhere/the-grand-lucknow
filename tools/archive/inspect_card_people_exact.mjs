import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const gIdx = subHtml.indexOf('alt="Grassland Gala"');
const peopleIdx = subHtml.indexOf('data-framer-name="People"', gIdx);
console.log('=== GRASSLAND GALA PEOPLE BLOCK ===');
console.log(subHtml.slice(peopleIdx, peopleIdx + 1200));

const gaIdx = subHtml.indexOf('alt="Garden Galaxy"');
const peopleIdx2 = subHtml.indexOf('data-framer-name="People"', gaIdx);
console.log('=== GARDEN GALAXY PEOPLE BLOCK ===');
console.log(subHtml.slice(peopleIdx2, peopleIdx2 + 1200));
