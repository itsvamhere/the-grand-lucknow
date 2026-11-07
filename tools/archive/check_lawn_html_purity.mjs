import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const lawnHtml = fs.readFileSync(path.join(ROOT, 'venues', 'open-earth-lawn.html'), 'utf8');

console.log('Includes casamomo.at in lawnHtml?', lawnHtml.includes('casamomo.at'));
console.log('Includes 1555605 in lawnHtml?', lawnHtml.includes('1555605'));
console.log('Includes LinkedIn in lawnHtml?', lawnHtml.includes('LinkedIn'));
