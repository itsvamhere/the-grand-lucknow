import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let idx = 0;
while ((idx = h.indexOf('bigtext-1', idx)) !== -1) {
  console.log('Found bigtext-1 at', idx, ':', h.slice(idx - 40, idx + 100));
  idx += 9;
}
