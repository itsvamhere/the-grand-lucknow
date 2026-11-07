import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

const matches = [...content.matchAll(/\/images\/[^"')\s]+/g)];
console.log('Images in IStDm:');
const unique = [...new Set(matches.map(m => m[0]))];
unique.forEach(u => console.log(' *', u));
