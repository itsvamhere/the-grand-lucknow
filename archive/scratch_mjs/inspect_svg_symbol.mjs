import fs from 'fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const m = idx.match(/id="svg-1334768056_3843"[\s\S]{0,1500}/);
console.log('svg symbol:');
console.log(m ? m[0] : 'not found');
