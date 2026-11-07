import fs from 'fs';

const files = [
  'scripts/14PpIjURtv5CdQXDMn99raf7YM3QUA_-H98WqlKe9_I.2gYakk5U.mjs',
  'scripts/dbsvx804WNdcoyICHiKnAT0LKTh0MjYeCDXHPRahIqA.w9X-iUdY.mjs',
  'scripts/EAu40N6_J1soX19cWoJuY7aOJDaKnixD8iX9ULlbhIY.Ep9tJ5nQ.mjs',
  'scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs'
];

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' (length: ' + c.length + ') ===');
  // print first 200 chars
  console.log(c.substring(0, 200).replace(/\n/g, ' '));
}
