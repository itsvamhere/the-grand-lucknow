import fs from 'fs';

const server = fs.readFileSync('server.mjs', 'utf8');
const idx = server.indexOf('open-earth-lawn');
console.log('server.mjs idx:', idx);
if (idx !== -1) {
  console.log(server.slice(idx - 100, idx + 200));
}
