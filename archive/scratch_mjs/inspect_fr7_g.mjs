import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const fr7 = fs.readFileSync(path.join(projectDir, 'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs'), 'utf-8');

const idx = fr7.indexOf('query:G()');
if (idx !== -1) {
  console.log(fr7.slice(idx - 600, idx + 100));
}
