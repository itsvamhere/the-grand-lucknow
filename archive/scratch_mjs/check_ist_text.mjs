import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf-8');

// Find text props in IStDm
const textMatches = [...content.matchAll(/text:`([^`]+)`/g)];
console.log(`Found ${textMatches.length} text properties in IStDm:`);
for (const t of textMatches) {
  console.log('->', t[1].replace(/\n/g, ' '));
}
