import fs from 'fs';
const c = fs.readFileSync('scripts/AOQA9ZjYa.CwSXFmg7.mjs', 'utf8');

const idx = c.lastIndexOf('q=');
console.log(c.substring(idx - 100, idx + 400));
