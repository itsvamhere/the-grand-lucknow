import fs from 'node:fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const regex = /[^}]*framer-svwim0[^\{]*\{[^\}]+\}/g;
console.log(lawn.match(regex));
