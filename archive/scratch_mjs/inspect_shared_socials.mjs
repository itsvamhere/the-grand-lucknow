import fs from 'fs';
const c = fs.readFileSync('scripts/shared-lib.DganPNQZ.mjs', 'utf8');

for (const phrase of ['instagram', 'linkedin', 'facebook', 'Built by', 'Nexene', 'Edifice']) {
  let idx = 0;
  while ((idx = c.toLowerCase().indexOf(phrase.toLowerCase(), idx)) !== -1) {
    console.log(phrase + ' at ' + idx + ': ' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 80)));
    idx += phrase.length;
  }
}
