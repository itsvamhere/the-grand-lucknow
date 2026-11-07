import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const fStart = html.indexOf('<footer');
const fEnd = html.indexOf('</footer>', fStart) + 9;
const fChunk = html.slice(fStart, fEnd);

let lIdx = 0;
while ((lIdx = fChunk.indexOf('data-framer-name="Footer Logo"', lIdx)) !== -1) {
  console.log('Footer Logo at:', lIdx);
  console.log(fChunk.slice(lIdx, lIdx + 1500));
  console.log('===');
  lIdx += 30;
}
