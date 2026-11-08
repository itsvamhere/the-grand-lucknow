import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let pos = 0;
while ((pos = lawn.indexOf('Lay', pos)) !== -1) {
  console.log(`Found 'Lay' at position ${pos}:`);
  console.log(lawn.slice(Math.max(0, pos - 50), Math.min(lawn.length, pos + 250)));
  console.log('---');
  pos += 3;
}
