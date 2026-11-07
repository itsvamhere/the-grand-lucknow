import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

console.log('--- Last 2500 characters of venue-n2.html ---');
console.log(v.substring(v.length - 2500));
