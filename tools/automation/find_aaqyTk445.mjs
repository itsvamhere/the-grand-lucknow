import fs from 'node:fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs';
const code = fs.readFileSync(filePath, 'utf8');

let pos = 0;
while ((pos = code.indexOf('aaqyTk445', pos)) !== -1) {
  const start = Math.max(0, pos - 400);
  const end = Math.min(code.length, pos + 800);
  console.log('--- aaqyTk445 ---');
  console.log(code.slice(start, end));
  pos += 9;
}
