import fs from 'fs';
const c = fs.readFileSync('scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs', 'utf8');

const idx = c.indexOf('wq8RHd6iF');
console.log(c.substring(idx - 100, idx + 600));
