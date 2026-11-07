import fs from 'fs';

const c = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let pos = 0;
while (true) {
  const idx = c.indexOf('grassland-gala', pos);
  if (idx === -1) break;
  console.log('grassland-gala at', idx);
  console.log(c.slice(idx - 100, idx + 200));
  pos = idx + 1;
}

let pos2 = 0;
while (true) {
  const idx = c.indexOf('garden-galaxy', pos2);
  if (idx === -1) break;
  console.log('garden-galaxy at', idx);
  console.log(c.slice(idx - 100, idx + 200));
  pos2 = idx + 1;
}
