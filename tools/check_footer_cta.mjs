import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const fIdx = h.indexOf('grand-footer-cta-observer');
console.log(h.slice(fIdx - 50, fIdx + 800));
