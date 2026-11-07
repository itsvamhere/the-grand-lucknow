import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of framer-xj8hz2
let pos = 0;
while ((pos = lawn.indexOf('framer-xj8hz2', pos)) !== -1) {
  console.log(`Found framer-xj8hz2 at ${pos}:`);
  console.log(lawn.slice(Math.max(0, pos - 100), Math.min(lawn.length, pos + 250)));
  console.log('---');
  pos += 'framer-xj8hz2'.length;
}

// Find universal-grand-footer-styles
const customStylePos = lawn.indexOf('universal-grand-footer-styles');
if (customStylePos !== -1) {
  console.log('universal-grand-footer-styles found:');
  console.log(lawn.slice(customStylePos - 20, customStylePos + 600));
}
