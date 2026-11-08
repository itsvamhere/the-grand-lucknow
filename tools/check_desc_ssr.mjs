import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const dIdx = h.indexOf('data-framer-name="Description"');
console.log(h.slice(dIdx, dIdx + 800));
