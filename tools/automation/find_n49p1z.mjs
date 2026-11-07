import fs from 'node:fs';

const code = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs', 'utf8');

let pos = 0;
while ((pos = code.indexOf('framer-n49p1z', pos)) !== -1) {
  console.log('--- framer-n49p1z ---');
  console.log(code.slice(Math.max(0, pos - 300), Math.min(code.length, pos + 500)));
  pos += 13;
}
