import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const idx = html.indexOf('data-framer-name="Venue List"');
console.log('Found at:', idx);
console.log(html.slice(idx - 100, idx + 600));

// Find footer start
const fIdx = html.indexOf('<footer');
console.log('Footer at:', fIdx);
console.log(html.slice(fIdx - 400, fIdx + 200));
