import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const mediaIdx = lawn.indexOf('@media (max-width: 809.98px) {\n  .framer-xj8hz2 {');
if (mediaIdx !== -1) {
  console.log(lawn.slice(mediaIdx, mediaIdx + 200));
} else {
  console.log('Not found at exact string, searching for 809.98...');
  let pos = 0;
  while ((pos = lawn.indexOf('809.98', pos)) !== -1) {
    console.log(lawn.slice(pos - 30, pos + 200));
    console.log('---');
    pos += 6;
  }
}
