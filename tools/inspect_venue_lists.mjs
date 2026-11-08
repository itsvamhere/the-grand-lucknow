import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find Venue Lists
const vIdx = html.indexOf('data-framer-name="Venue Lists"');
if (vIdx !== -1) {
  console.log('--- Found Venue Lists in open-earth-lawn.html ---');
  console.log(html.substring(vIdx, vIdx + 3000));
} else {
  console.log('Venue Lists not found by exact string');
}
