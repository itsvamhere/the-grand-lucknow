import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('225')) {
    console.log(`L${i + 1}:`, l.slice(0, 150));
  }
});
