import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf-8');

// Find the hero word definitions
const matches = [...content.matchAll(/(.{0,80}(?:EL PACRE|Hero Word|CASA|MOMO|LUCKNOW).{0,80})/gi)];
console.log(`Hero matches in Dexd: ${matches.length}`);
for (const m of matches.slice(0, 10)) {
  console.log('->', m[0]);
}
