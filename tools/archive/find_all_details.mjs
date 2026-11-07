import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /data-framer-name="Details"[\s\S]{0,1000}/g;
let match;
let i = 0;
while ((match = regex.exec(subHtml)) !== null) {
  console.log(`=== DETAILS OCCURRENCE ${i} ===`);
  console.log(match[0].slice(0, 500));
  console.log('---');
  i++;
}
