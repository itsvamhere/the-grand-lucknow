import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const content = fs.readFileSync(path.join(projectDir, 'scripts', 'kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs'), 'utf8');

// Find all text:`...`
const matches = [...content.matchAll(/text:([`"'])([\s\S]*?)\1/g)];
console.log('Found', matches.length, 'texts:');
for (const m of matches) {
  console.log('---');
  console.log(m[2]);
}
