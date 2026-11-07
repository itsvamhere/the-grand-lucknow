import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const gIdx = subHtml.indexOf('alt="Grassland Gala"');
const detailsIdx = subHtml.indexOf('data-framer-name="Details"', gIdx);
console.log(subHtml.slice(detailsIdx + 1200, detailsIdx + 2400));
