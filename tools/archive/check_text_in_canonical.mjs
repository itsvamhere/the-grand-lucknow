import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

console.log('Includes <text in canonical_footer?', footer.includes('<text'));
console.log('Includes %3Ctext in canonical_footer?', footer.includes('%3Ctext'));
