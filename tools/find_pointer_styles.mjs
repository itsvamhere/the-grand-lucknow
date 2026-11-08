import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regexes = [
  /active-venue-chip[^{}]*\{[^}]*\}/g,
  /grand-live-pointer[^{}]*\{[^}]*\}/g,
  /framer-8m2qta[^{}]*\{[^}]*\}/g
];

regexes.forEach(r => {
  let m;
  while ((m = r.exec(h)) !== null) {
    console.log(m[0]);
  }
});
