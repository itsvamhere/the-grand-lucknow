import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sIdx = h.indexOf('.framer-1n8t7q3');
console.log('--- .framer-1n8t7q3 in CSS ---');
console.log(h.slice(sIdx - 100, sIdx + 400));

const oIdx = h.indexOf('.framer-8m2qta');
console.log('--- .framer-8m2qta in CSS ---');
console.log(h.slice(oIdx - 100, oIdx + 400));
