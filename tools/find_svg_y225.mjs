import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

let pos = 0;
while ((pos = lawn.indexOf('y%3D%22225%22', pos)) !== -1) {
  console.log(`Found encoded SVG at position ${pos}:`);
  console.log(lawn.slice(Math.max(0, pos - 100), Math.min(lawn.length, pos + 250)));
  console.log('---');
  pos += 10;
}

pos = 0;
while ((pos = lawn.indexOf('y="225"', pos)) !== -1) {
  console.log(`Found raw SVG at position ${pos}:`);
  console.log(lawn.slice(Math.max(0, pos - 100), Math.min(lawn.length, pos + 250)));
  console.log('---');
  pos += 10;
}
