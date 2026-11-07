import fs from 'fs';

const sub = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const lines = sub.split('\n');

for (let i = 1430; i < 1615 && i < lines.length; i++) {
  console.log(i + 1, lines[i].slice(0, 120));
}
