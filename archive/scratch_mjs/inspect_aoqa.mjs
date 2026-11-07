import fs from 'fs';
const c = fs.readFileSync('scripts/AOQA9ZjYa.CwSXFmg7.mjs', 'utf8');
console.log('AOQA length:', c.length);

// search for boutique-n2 or boutique-n1
const idx = c.indexOf('boutique-n2');
if (idx !== -1) {
  console.log('boutique-n2 at ' + idx + ':\n' + c.substring(Math.max(0, idx - 100), Math.min(c.length, idx + 500)));
}
