import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of 2404.809
let pos = 0;
while ((pos = idx.indexOf('2404.809', pos)) !== -1) {
  console.log('Found 2404.809 at position:', pos);
  console.log(idx.slice(Math.max(0, pos - 150), Math.min(idx.length, pos + 250)));
  console.log('================');
  pos += '2404.809'.length;
}
