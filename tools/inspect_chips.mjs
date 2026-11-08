import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find chip/badge with size and capacity (e.g. 25,000 Sqft or 20,000 Sqft)
const chipRegex = /<div[^>]*data-framer-name="Features"[^>]*>[\s\S]*?<\/div>/;
// Or search for '25,000' or 'Sqft'
console.log('--- Search 25,000 in open-earth-lawn.html ---');
let idx = 0;
while ((idx = h.indexOf('25,000', idx)) !== -1) {
  console.log('Found 25,000 at', idx, ':', h.slice(idx - 50, idx + 100));
  idx += 6;
}

console.log('--- Search 2,500 in open-earth-lawn.html ---');
idx = 0;
while ((idx = h.indexOf('2,500', idx)) !== -1) {
  console.log('Found 2,500 at', idx, ':', h.slice(idx - 50, idx + 100));
  idx += 5;
}
