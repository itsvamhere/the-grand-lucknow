import fs from 'fs';

for (const f of ['scripts/shared-lib.DganPNQZ.mjs', 'scripts/shared-lib.ScWHaytr.mjs']) {
  if (fs.existsSync(f)) {
    const s = fs.readFileSync(f, 'utf8');
    const pos = s.indexOf('2404.809');
    console.log(`In ${f}, pos = ${pos}:`);
    console.log(s.slice(pos - 100, pos + 300));
    console.log('---');
  }
}
