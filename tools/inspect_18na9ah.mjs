import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

let pos = 0;
while ((pos = idx.indexOf('framer-18na9ah', pos)) !== -1) {
  console.log('Found framer-18na9ah at:', pos);
  console.log(idx.slice(Math.max(0, pos - 50), Math.min(idx.length, pos + 250)));
  console.log('---');
  pos += 'framer-18na9ah'.length;
}
