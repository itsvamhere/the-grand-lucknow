import fs from 'node:fs';

const js = fs.readFileSync('scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

console.log('File length:', js.length);

['gradient', 'mask', 'fade', 'opacity', 'linear-gradient'].forEach(term => {
  let count = 0;
  let idx = -1;
  while ((idx = js.indexOf(term, idx + 1)) !== -1 && count < 5) {
    count++;
    console.log(`Term "${term}" at ${idx}:`, js.slice(Math.max(0, idx - 40), Math.min(js.length, idx + 80)));
  }
  console.log(`Total "${term}": ${count}`);
});
