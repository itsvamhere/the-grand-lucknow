import fs from 'fs';
const c = fs.readFileSync('scripts/script_main.mjs', 'utf8');

const idx = c.indexOf('CdMjrwKg8');
console.log(c.substring(idx - 200, idx + 400));
