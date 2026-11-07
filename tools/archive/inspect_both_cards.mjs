import fs from 'fs';

const c = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- CARD 1 (Grassland Gala) ---');
console.log(c.slice(320400, 323000));

console.log('--- CARD 2 (Garden Galaxy) ---');
console.log(c.slice(331200, 333800));
