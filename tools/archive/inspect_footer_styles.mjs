import fs from 'fs';

const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Check style tag universal-grand-footer-styles
const idx = sub.indexOf('id="universal-grand-footer-styles"');
if (idx !== -1) {
  const end = sub.indexOf('</style>', idx);
  console.log('universal-grand-footer-styles length:', end - idx);
  console.log(sub.slice(idx, idx + 1500));
}
