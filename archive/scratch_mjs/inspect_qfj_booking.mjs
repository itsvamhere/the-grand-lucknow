import fs from 'fs';
const c = fs.readFileSync('scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

// search for booking or calendar or price or check availability
for (const phrase of ['Booking', 'Calendar', 'availability', 'price', 'Booking options', 'Inquire', 'Square', 'Details']) {
  let idx = 0;
  let count = 0;
  while ((idx = c.toLowerCase().indexOf(phrase.toLowerCase(), idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(phrase + ' at ' + idx + ': ' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 80)));
    }
    idx += phrase.length;
  }
  console.log(phrase + ' count:', count);
}
