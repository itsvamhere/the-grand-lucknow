import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const scriptMain = fs.readFileSync(path.join(projectDir, 'scripts/script_main.mjs'), 'utf-8');

const idx = scriptMain.indexOf('H={augiA20Il');
if (idx !== -1) {
  console.log(scriptMain.slice(idx, idx + 2500));
}
