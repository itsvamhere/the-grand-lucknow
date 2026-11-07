import fs from 'fs';

for (const f of ['scripts/nteO2IV_oruZhnTtyytdbfV2QtZZPjMtQEspCiom9d8.B30j0rWH.mjs', 'scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs']) {
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  let idx = 0;
  while ((idx = c.indexOf('Details', idx)) !== -1) {
    console.log(c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 60)));
    idx += 13;
  }
}
