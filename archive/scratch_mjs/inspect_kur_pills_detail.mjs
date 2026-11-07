import fs from 'fs';
const c = fs.readFileSync('scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs', 'utf8');

const idx = c.indexOf('Venue N°7');
console.log(c.substring(idx - 200, idx + 600));
