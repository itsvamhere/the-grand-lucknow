import fs from 'fs';

const js = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs", "utf8");

const matches = [...js.matchAll(/AOxZDvmqQ/g)];
console.log('Matches of AOxZDvmqQ in shared-lib:', matches.length);

const idx = js.indexOf('AOxZDvmqQ');
if (idx !== -1) {
  console.log('Snippet around AOxZDvmqQ:');
  console.log(js.slice(Math.max(0, idx - 100), idx + 800));
}
