import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
console.log('Total lines in index.html:', lines.length);
for (let i = 515; i < Math.min(lines.length, 545); i++) {
  console.log(`L${i + 1}:`, lines[i].slice(0, 150));
}
