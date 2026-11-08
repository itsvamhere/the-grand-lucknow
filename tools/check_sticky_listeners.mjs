import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const matches = [];
const regex = /stickyBtn\s*\.\s*addEventListener/g;
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(html.slice(Math.max(0, m.index - 50), m.index + 200));
}

console.log('stickyBtn event listeners found:', matches.length);
matches.forEach((m, i) => console.log(`[${i}]:\n`, m));
