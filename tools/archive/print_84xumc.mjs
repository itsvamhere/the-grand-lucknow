import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const ggIdx = subHtml.indexOf('alt="Grassland Gala"');
const mIdx = subHtml.indexOf('framer-84xumc', ggIdx);
console.log('Snippet inside framer-84xumc:\n', subHtml.slice(mIdx, mIdx + 500));
