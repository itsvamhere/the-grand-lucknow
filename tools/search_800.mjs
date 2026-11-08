import fs from 'fs';

const h = fs.readFileSync('venues/grassland-gala.html', 'utf8');

let idx = 0;
while ((idx = h.indexOf('800', idx)) !== -1) {
  console.log('Found 800 at', idx, ':', h.slice(idx - 60, idx + 80));
  idx += 3;
}
