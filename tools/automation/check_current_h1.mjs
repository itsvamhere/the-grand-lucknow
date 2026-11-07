import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const regex = /<h1[\s\S]*?<\/h1>/gi;
const matches = [...html.matchAll(regex)].map(m => m[0]);
console.log('H1 elements found:', matches.length);
matches.forEach((h, i) => console.log(`--- H1 #${i} --- \n`, h));
