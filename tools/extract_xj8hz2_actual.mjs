import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find the style for .framer-xj8hz2
const idx = subHtml.indexOf('.framer-xj8hz2 {');
if (idx !== -1) {
  const css = subHtml.substring(idx, idx + 8000);
  const bgMatch = css.match(/background-image:\s*url\("([^"]+)"\)/);
  if (bgMatch) {
    const decoded = decodeURIComponent(bgMatch[1]);
    console.log('Decoded .framer-xj8hz2 SVG length:', decoded.length);
    fs.writeFileSync('tools/actual_xj8hz2.svg', decoded.replace('data:image/svg+xml,', ''), 'utf8');
    console.log('Saved tools/actual_xj8hz2.svg');
  }
}
