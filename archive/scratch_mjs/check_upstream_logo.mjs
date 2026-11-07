import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'upstream_boutique-n1.html'), 'utf8');

const matches = [...html.matchAll(/data-framer-name="Logo"[\s\S]*?<\/a>/gi)];
console.log('Matches in upstream:', matches.length);
matches.forEach((m, i) => console.log(`[Upstream Logo ${i}]`, m[0]));
