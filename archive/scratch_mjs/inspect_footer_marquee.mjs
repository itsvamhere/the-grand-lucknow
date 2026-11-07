import fs from 'fs';

for (const f of ['scripts/shared-lib.DganPNQZ.mjs', 'index.html']) {
  const c = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  let idx = 0;
  while ((idx = c.indexOf('GRAND', idx)) !== -1) {
    console.log(c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 60)));
    idx += 5;
  }
}
