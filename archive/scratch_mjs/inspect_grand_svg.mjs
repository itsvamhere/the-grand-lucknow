import fs from 'fs';
const c = fs.readFileSync('scripts/shared-lib.DganPNQZ.mjs', 'utf8');

const idx = c.indexOf('>GRAND</text>');
console.log(c.substring(idx - 150, idx + 250));
