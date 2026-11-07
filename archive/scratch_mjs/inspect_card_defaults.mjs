import fs from 'fs';
const c = fs.readFileSync('scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

// find where g and y are defined
const idx = c.indexOf('de=({altText:e');
console.log(c.substring(idx, idx + 1000));
