import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const sharedLib = fs.readFileSync(path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs'), 'utf-8');

const idx = sharedLib.indexOf('linkedin');
if (idx !== -1) {
  console.log(sharedLib.slice(idx - 400, idx + 400));
}
