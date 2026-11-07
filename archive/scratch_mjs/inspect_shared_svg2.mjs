import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const lib = fs.readFileSync(sharedLibPath, 'utf8');

const m2 = lib.indexOf('viewBox="0 0 1202.351 150.096"');
if (m2 !== -1) {
  console.log(lib.substring(m2 - 200, m2 + 800));
}
