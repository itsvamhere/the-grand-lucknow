import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const sIdx = h.indexOf('Accurate Casa Momo Location');
if (sIdx !== -1) {
  console.log(h.slice(sIdx, sIdx + 1200));
} else {
  console.log('Searching onLocScroll:');
  const lIdx = h.indexOf('onLocScroll');
  console.log(h.slice(lIdx - 100, lIdx + 800));
}
