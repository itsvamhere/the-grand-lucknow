import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const scriptMain = fs.readFileSync(path.join(projectDir, 'scripts/script_main.mjs'), 'utf-8');

const matches = [...scriptMain.matchAll(/(.{0,40}\bH=\{.{0,200})/g)];
for (const m of matches) {
  console.log(m[0]);
}
