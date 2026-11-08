import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const idx1 = h.indexOf('active-venue-chip');
console.log('--- Occurrence 1 ---');
console.log(h.slice(idx1 - 50, idx1 + 250));

const idx2 = h.indexOf('active-venue-chip', idx1 + 20);
console.log('--- Occurrence 2 ---');
console.log(h.slice(idx2 - 50, idx2 + 250));

const pIdx = h.indexOf('id="grand-live-pointer"');
console.log('--- grand-live-pointer ---');
console.log(h.slice(pIdx - 50, pIdx + 200));
