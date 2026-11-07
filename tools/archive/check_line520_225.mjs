import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
const line520 = lines[519]; // 0-indexed 519 is line 520

let idx = line520.indexOf('225');
while (idx !== -1) {
  console.log('Match at offset:', idx);
  console.log(line520.slice(Math.max(0, idx - 80), Math.min(line520.length, idx + 80)));
  idx = line520.indexOf('225', idx + 1);
}
