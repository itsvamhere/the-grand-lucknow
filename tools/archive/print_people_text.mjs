import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const gIdx = subHtml.indexOf('alt="Grassland Gala"');
const peopleIdx = subHtml.indexOf('data-framer-name="People"', gIdx);
const pTagIdx = subHtml.indexOf('<p', peopleIdx);
console.log('Grassland Gala People text:\n', subHtml.slice(pTagIdx, pTagIdx + 300));

const gaIdx = subHtml.indexOf('alt="Garden Galaxy"');
const peopleIdx2 = subHtml.indexOf('data-framer-name="People"', gaIdx);
const pTagIdx2 = subHtml.indexOf('<p', peopleIdx2);
console.log('Garden Galaxy People text:\n', subHtml.slice(pTagIdx2, pTagIdx2 + 300));
