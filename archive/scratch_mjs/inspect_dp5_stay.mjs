import fs from 'fs';
const c = fs.readFileSync('scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs', 'utf8');

const idx = c.indexOf('or your celebration?');
console.log(c.substring(idx - 100, idx + 400));
