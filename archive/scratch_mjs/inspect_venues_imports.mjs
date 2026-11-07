import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const content = fs.readFileSync(path.join(projectDir, 'scripts', 'fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs'), 'utf8');

const imports = [...content.matchAll(/import.*?from\s*["'](\.[^"']+)["']/g)].map(m => m[1]);
console.log('Imports in /venues:', imports);
