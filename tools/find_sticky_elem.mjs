import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let pos = 0;
while (true) {
  const idx = html.indexOf('data-framer-name="Sticky Button"', pos);
  if (idx === -1) break;
  console.log('Found element at:', idx);
  console.log(html.slice(Math.max(0, idx - 50), idx + 400));
  pos = idx + 1;
}
