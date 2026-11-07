import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const scriptMain = fs.readFileSync(path.join(projectDir, 'scripts/script_main.mjs'), 'utf-8');

const idx = scriptMain.indexOf('routes:H');
if (idx !== -1) {
  console.log(scriptMain.slice(idx - 1000, idx));
}
