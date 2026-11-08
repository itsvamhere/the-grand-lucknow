import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const overlayIdx = html.indexOf('data-framer-name="Button Overlay"');
console.log('Button Overlay snippet:\n', html.slice(overlayIdx, overlayIdx + 700));
