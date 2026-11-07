import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', 'utf-8');

const idx = content.indexOf('const M=');
if (idx !== -1) {
  console.log(content.slice(idx - 200, idx + 400));
}
