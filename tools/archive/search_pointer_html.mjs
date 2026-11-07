import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('grand-live-pointer')) {
    console.log(`Line ${idx + 1}: ${l.slice(0, 200)}`);
  }
});
