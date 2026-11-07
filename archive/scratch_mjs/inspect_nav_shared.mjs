import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const lib = fs.readFileSync(sharedLibPath, 'utf8');

// Find navigation logo in sharedLib
const logoMatches = [...lib.matchAll(/(.{0,100}(?:logo-dark|logo-light|wordmark|framer-name":`Logo`|framer-name="Logo").{0,150})/g)];
console.log('--- Logo in shared-lib count:', logoMatches.length);
logoMatches.slice(0, 10).forEach((m, i) => console.log(`[${i}]`, m[0]));
