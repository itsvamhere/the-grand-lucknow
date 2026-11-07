import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const footer = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

console.log('Includes Lay Grotesk?', footer.includes('Lay Grotesk'));
console.log('Includes svg870196829_4253?', footer.includes('svg870196829_4253'));
console.log('Includes framer-xj8hz2?', footer.includes('framer-xj8hz2'));
console.log('Includes office@thegrandlucknow.in?', footer.includes('office@thegrandlucknow.in'));
console.log('Includes +91 91291 27091?', footer.includes('+91 91291 27091'));
console.log('Includes Edifice?', footer.includes('Edifice'));
