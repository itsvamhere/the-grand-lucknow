import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find the SVG in universal-grand-footer-styles
const match = subHtml.match(/data:image\/svg\+xml,[^"]+/);
if (match) {
  const decoded = decodeURIComponent(match[0]);
  console.log('Decoded SVG length:', decoded.length);
  fs.writeFileSync('tools/ticker_decoded.svg', decoded.replace('data:image/svg+xml,', ''), 'utf8');
  console.log('Saved tools/ticker_decoded.svg');
}
