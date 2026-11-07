import fs from 'fs';
const c = fs.readFileSync('scripts/AOQA9ZjYa.CwSXFmg7.mjs', 'utf8');

// find where data items are defined
const idx = c.indexOf('default=');
if (idx !== -1) {
  console.log(c.substring(idx - 50, idx + 800));
} else {
  console.log(c.substring(0, 800));
}
