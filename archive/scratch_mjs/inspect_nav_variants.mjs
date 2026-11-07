import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
const lib = fs.readFileSync(sharedLibPath, 'utf8');

// Find where aMxe_5mGw and jhdzIHOco are defined in the component
const idx = lib.indexOf('aMxe_5mGw');
if (idx !== -1) {
  console.log(lib.substring(idx - 300, idx + 400));
}
