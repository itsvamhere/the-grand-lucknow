import fs from 'fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idx = lawn.indexOf('grand-booking-modal');
console.log('Index of grand-booking-modal:', idx);
if (idx !== -1) {
  console.log(lawn.slice(idx - 100, idx + 200));
}
