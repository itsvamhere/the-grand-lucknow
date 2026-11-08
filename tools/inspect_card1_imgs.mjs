import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const imgMatches = [...html.matchAll(/<img[^>]+card_1_open_earth\.webp[^>]*>/g)];
console.log('Matches of card_1_open_earth.webp:', imgMatches.length);
imgMatches.forEach((m, idx) => {
  console.log(`Image ${idx + 1} pos: ${m.index}`);
});
