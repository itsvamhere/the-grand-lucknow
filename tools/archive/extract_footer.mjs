import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footerMatch = home.match(/<footer[\s\S]*?<\/footer>/);
const footerHtml = footerMatch[0];

console.log('Total footer length in index.html:', footerHtml.length);

// Look at how ticker item is rendered in Desktop variant
const dIdx = footerHtml.indexOf('data-framer-name="Footer Logo"');
console.log('Desktop Footer Logo block:');
console.log(footerHtml.slice(dIdx, dIdx + 800));

// Look at Mobile variant Footer Logo block
const mIdx = footerHtml.indexOf('data-framer-name="Footer Logo"', dIdx + 800);
console.log('Mobile Footer Logo block (if any):', mIdx);
if (mIdx !== -1) {
  console.log(footerHtml.slice(mIdx, mIdx + 800));
}
