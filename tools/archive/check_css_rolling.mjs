import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all CSS rules containing "rolling-label" or "framer-ypCW0" or "framer-w9fus0"
const regex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;
while ((match = regex.exec(subHtml)) !== null) {
  const css = match[1];
  if (css.includes('rolling-label') || css.includes('letter') || css.includes('framer-pv33ac') || css.includes('framer-w9fus0')) {
    console.log(`=== CSS in Style Tag (idx match) ===`);
    console.log(css.slice(0, 1000));
  }
}
