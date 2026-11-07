import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const regex = /\.framer-151qtkn[^{]*\{[^}]*\}/g;
const matches = [...html.matchAll(regex)].map(m => m[0]);
console.log('framer-151qtkn styles:', matches);

const regex2 = /\.framer-1s87mre[^{]*\{[^}]*\}/g;
const matches2 = [...html.matchAll(regex2)].map(m => m[0]);
console.log('framer-1s87mre styles:', matches2);
