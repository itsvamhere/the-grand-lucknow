import fs from 'node:fs';
console.log(fs.readFileSync('scripts/composite_master_cartography.mjs', 'utf8').slice(0, 1500));
