import fs from 'fs';
const c = fs.readFileSync('scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

const idx = c.indexOf('"data-framer-name":`Details`');
console.log(c.substring(idx - 100, idx + 300));
