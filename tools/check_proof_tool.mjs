import fs from 'fs';

console.log(fs.readFileSync('tools/test_final_proofs.mjs', 'utf8').slice(0, 500));
