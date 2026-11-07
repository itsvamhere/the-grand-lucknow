import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const file = path.join(projectDir, 'scripts', 'kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs');
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8');
  const targetIdx = content.indexOf('temporary home');
  if (targetIdx !== -1) {
    console.log('=== kUR file ===');
    console.log(content.slice(targetIdx - 50, targetIdx + 300));
  }
}
