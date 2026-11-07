import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

console.log('Includes casamomo.at in canonical_footer?', footer.includes('casamomo.at'));
console.log('Includes 1555605 in canonical_footer?', footer.includes('1555605'));
console.log('Includes LinkedIn in canonical_footer?', footer.includes('LinkedIn'));
