import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

// Strip tags and print all text blocks
const textOnly = footer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
console.log('Text snippet from canonical_footer:');
console.log(textOnly.slice(0, 1000));
