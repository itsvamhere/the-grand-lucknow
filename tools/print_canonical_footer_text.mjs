import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

const textOnly = footer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('Text snippet:');
console.log(textOnly.slice(0, 500));
