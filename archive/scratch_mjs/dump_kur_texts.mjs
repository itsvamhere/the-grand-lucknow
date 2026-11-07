import fs from 'fs';
const c = fs.readFileSync('scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs', 'utf8');

// search for strings in kUR3
const matches = [...c.matchAll(/text:`([^`]+)`/g)];
for (const m of matches) {
  console.log('TEXT:', m[1]);
}
