import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of grand-hero-word
let idx = 0;
while ((idx = html.indexOf('grand-hero-word', idx)) !== -1) {
  console.log('Found grand-hero-word at idx:', idx);
  console.log(html.slice(idx - 150, idx + 200));
  idx += 15;
}
