import fs from 'node:fs';
console.log(fs.readFileSync('scripts/refine_master_cartography.mjs', 'utf8').slice(1500, 3000));
