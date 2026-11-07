import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const matches = [];
let pos = 0;
while ((pos = html.indexOf('framer-n49p1z', pos)) !== -1) {
  matches.push(pos);
  pos += 13;
}

console.log('Total occurrences of framer-n49p1z in index.html:', matches.length);
for (const p of matches) {
  console.log('Occurrence around', p, ':');
  console.log(html.slice(Math.max(0, p - 30), p + 200));
}
