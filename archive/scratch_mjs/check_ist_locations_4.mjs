import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const ist = fs.readFileSync(path.join(projectDir, 'scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs'), 'utf-8');

const idx = ist.indexOf('dWCdbJo1v');
if (idx !== -1) {
  console.log(ist.slice(idx, idx + 1200));
}
