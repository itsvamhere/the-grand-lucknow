import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const regex = /\.framer-tfszgi[^{]*\{[^}]*\}/g;
const matches = [...html.matchAll(regex)].map(m => m[0]);
console.log('framer-tfszgi styles in upstream:', matches);
