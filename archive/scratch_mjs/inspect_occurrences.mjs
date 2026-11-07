import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');

const matches = [...html.matchAll(/(.{0,100}THE GRAND.{0,100})/g)];
matches.forEach((m, i) => {
  const start = Math.max(0, m.index - 150);
  const end = Math.min(html.length, m.index + 250);
  console.log(`\n=== Occurrence ${i} ===`);
  console.log(html.substring(start, end));
});
