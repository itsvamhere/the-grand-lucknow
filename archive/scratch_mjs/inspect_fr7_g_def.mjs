import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const fr7 = fs.readFileSync(path.join(projectDir, 'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs'), 'utf-8');

const matches = [...fr7.matchAll(/(.{0,40}\bfunction G\(|let G=|const G=.{0,80})/g)];
for (const m of matches) {
  console.log(m[0]);
}
