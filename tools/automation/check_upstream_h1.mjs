import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const regex = /<h1[\s\S]*?<\/h1>/gi;
const matches = [...html.matchAll(regex)].map(m => m[0]);
console.log('H1 count:', matches.length);
matches.forEach((h, i) => console.log(i, h.substring(0, 300)));
