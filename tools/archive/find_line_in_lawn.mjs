import fs from 'fs';

const content = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<text') && l.includes('Lay Grotesk Regular')) {
    console.log(`Line ${i + 1}: ${l.slice(0, 200)}`);
  }
});
