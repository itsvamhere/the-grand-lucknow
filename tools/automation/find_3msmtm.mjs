import fs from 'node:fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs';
const code = fs.readFileSync(filePath, 'utf8');

const indices = [];
let pos = 0;
while ((pos = code.indexOf('3msmtm', pos)) !== -1) {
  indices.push(pos);
  pos += 6;
}

console.log('Occurrences of 3msmtm:', indices.length);
for (const idx of indices) {
  const start = Math.max(0, idx - 200);
  const end = Math.min(code.length, idx + 400);
  console.log('--- MATCH ---');
  console.log(code.slice(start, end));
}
