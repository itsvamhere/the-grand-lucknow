import fs from 'fs';
const c = fs.readFileSync('scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs', 'utf8');

let idx = 0;
while ((idx = c.indexOf('N°3', idx)) !== -1) {
  console.log('N°3 at ' + idx + ':\n' + c.substring(Math.max(0, idx - 100), Math.min(c.length, idx + 150)));
  idx += 3;
}
