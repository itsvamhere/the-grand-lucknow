import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf8');

const matches = [...content.matchAll(/T5PVEAy5F/g)];
console.log('Matches in IStDm:', matches.length);

// Look for venue items where area/guests are passed
const cardMatches = [...content.matchAll(/area|guests|capacity|squaremeter/gi)];
console.log('Card matches:', cardMatches.length);

// Search for the 5 venues data in IStDm
const dataMatches = [...content.matchAll(/N°01|N°02|N°03|N°1|N°2|N°3/g)];
console.log('Numbering matches:', dataMatches.length);
dataMatches.slice(0, 10).forEach(m => {
  console.log(content.substring(Math.max(0, m.index - 50), Math.min(content.length, m.index + 100)));
});
