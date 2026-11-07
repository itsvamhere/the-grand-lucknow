import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const positions = [281368, 282641, 316593, 323325];
positions.forEach((pos, i) => {
  console.log(`=== OCCURRENCE ${i} (pos ${pos}) ===`);
  console.log(subHtml.slice(Math.max(0, pos - 300), pos + 400));
});
