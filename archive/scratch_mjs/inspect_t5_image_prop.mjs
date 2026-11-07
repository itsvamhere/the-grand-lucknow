import fs from 'fs';
const c = fs.readFileSync('scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

// find where DmkowNNqx is used
const idx = c.indexOf('DmkowNNqx');
console.log(c.substring(idx - 100, idx + 400));
