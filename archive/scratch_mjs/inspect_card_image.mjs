import fs from 'fs';
const c = fs.readFileSync('scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

// find definition of V and where g comes from
const idx = c.indexOf('c(A,{altText:x');
console.log(c.substring(Math.max(0, idx - 200), idx + 200));
