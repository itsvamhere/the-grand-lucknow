import fs from 'fs';

const main = fs.readFileSync('scripts/script_main.mjs', 'utf8');
console.log('scripts/script_main.mjs length:', main.length);
console.log('Snippet:', main.slice(0, 500));
