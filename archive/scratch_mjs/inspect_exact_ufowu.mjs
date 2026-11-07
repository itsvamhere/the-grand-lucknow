import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const s = fs.readFileSync(sharedLibPath, 'utf8');

const idx = s.indexOf('ufowuZXjc');
if (idx !== -1) {
  console.log(s.substring(idx - 50, idx + 1000));
}
