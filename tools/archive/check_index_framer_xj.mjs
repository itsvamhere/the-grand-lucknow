import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of framer-xj8hz2 in index.html
let pos = 0;
while ((pos = idx.indexOf('framer-xj8hz2', pos)) !== -1) {
  console.log(`Found framer-xj8hz2 at ${pos}:`);
  console.log(idx.slice(Math.max(0, pos - 100), Math.min(idx.length, pos + 250)));
  console.log('---');
  pos += 'framer-xj8hz2'.length;
}
