import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const matches = [...v.matchAll(/<use href="([^"]+)"/g)];
console.log('Use hrefs in venue-n2.html:', matches.map(m => m[1]));
