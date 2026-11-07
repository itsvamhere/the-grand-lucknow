import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
console.log('index.html has text x="50%" y="225"?', content.includes('y="225"') || content.includes('y%3D%22225%22'));
const idx = content.indexOf('framer-xj8hz2');
console.log('framer-xj8hz2 in index.html:', idx !== -1);
if (idx !== -1) {
  console.log(content.slice(idx - 50, idx + 200));
}
