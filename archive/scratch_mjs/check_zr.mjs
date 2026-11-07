import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf-8');

// Find definition or import of Zr
const matches = [...content.matchAll(/(.{0,40}\bZr\b.{0,60})/g)];
for (const m of matches.slice(0, 5)) {
  console.log('->', m[0]);
}
