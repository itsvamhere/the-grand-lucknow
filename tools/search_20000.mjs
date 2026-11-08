import fs from 'fs';

const files = ['venues/open-earth-lawn.html', 'venues/grassland-gala.html'];

files.forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  let idx = 0;
  console.log('===', f, '===');
  while ((idx = h.indexOf('20,000', idx)) !== -1) {
    console.log('Found 20,000 at', idx, ':', h.slice(idx - 60, idx + 80));
    idx += 6;
  }
});
