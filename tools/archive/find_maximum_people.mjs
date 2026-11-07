import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find "Maximum People" in the entire file
const pIdx = subHtml.indexOf('data-framer-name="Maximum People"');
console.log('Maximum People index:', pIdx);
if (pIdx !== -1) {
  console.log('Snippet around Maximum People:\n', subHtml.slice(Math.max(0, pIdx - 800), pIdx + 1200));
}
