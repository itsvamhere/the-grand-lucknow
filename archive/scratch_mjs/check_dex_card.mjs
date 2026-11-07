import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf-8');

// Find where i is used in the card
const idx = content.indexOf("const v=M[i]");
if (idx !== -1) {
  console.log(content.slice(idx - 500, idx + 500));
}
