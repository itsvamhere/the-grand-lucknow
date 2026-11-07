import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

console.log('Includes casamomo.at?', indexHtml.includes('casamomo.at'));
console.log('Includes office@casamomo.at?', indexHtml.includes('office@casamomo.at'));
console.log('Includes +43 664?', indexHtml.includes('+43 664'));
console.log('Includes 1999605?', indexHtml.includes('1999605'));
console.log('Includes 1555605?', indexHtml.includes('1555605'));
console.log('Includes Nexene?', indexHtml.includes('Nexene'));
console.log('Includes LinkedIn?', indexHtml.includes('LinkedIn'));
