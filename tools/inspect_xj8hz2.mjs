import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const idx = homeHtml.indexOf('framer-xj8hz2');
if (idx !== -1) {
  console.log('Snippet around framer-xj8hz2 in index.html:');
  console.log(homeHtml.substring(idx - 200, idx + 800));
}

// Also check the CSS rule for framer-xj8hz2 in index.html
const styleIdx = homeHtml.indexOf('.framer-xj8hz2');
if (styleIdx !== -1) {
  console.log('\nCSS snippet for .framer-xj8hz2 in index.html:');
  console.log(homeHtml.substring(styleIdx - 50, styleIdx + 600));
}
