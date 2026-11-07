import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const idx = v.indexOf('svg-1334768056_3843');
console.log('first idx:', idx);
const second = v.indexOf('svg-1334768056_3843', idx + 1);
console.log('second idx:', second);
const third = v.indexOf('svg-1334768056_3843', second + 1);
console.log('third idx:', third);
if (third !== -1) {
  console.log(v.substring(third - 50, third + 200));
}
