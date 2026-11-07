import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let i = 0;
while ((match = styleRegex.exec(content)) !== null) {
  if (i === 2) {
    const s = match[1];
    const xjIdx = s.indexOf('framer-xj8hz2');
    if (xjIdx !== -1) {
      console.log('Found framer-xj8hz2 in Style 2:');
      console.log(s.slice(Math.max(0, xjIdx - 50), Math.min(s.length, xjIdx + 600)));
    }
  }
  i++;
}
