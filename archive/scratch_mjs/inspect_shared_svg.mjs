import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const lib = fs.readFileSync(sharedLibPath, 'utf8');

const m1 = lib.indexOf('viewBox="0 0 2404.809 300.206"');
if (m1 !== -1) {
  console.log('--- 2404 SVG in shared-lib ---');
  console.log(lib.substring(m1 - 50, m1 + 400));
}

const m2 = lib.indexOf('viewBox="0 0 1202.351 150.096"');
if (m2 !== -1) {
  console.log('--- 1202 SVG in shared-lib ---');
  console.log(lib.substring(m2 - 50, m2 + 400));
}
