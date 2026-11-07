import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const matches = [...v.matchAll(/<img[^>]*>/gi)];
console.log('Total img tags in venue-n2.html:', matches.length);
matches.forEach((m, i) => {
  console.log(`[${i}] ${m[0]}`);
});
