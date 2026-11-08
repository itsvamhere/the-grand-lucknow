import fs from 'fs';

console.log(fs.readFileSync('tools/build_grassland_gala.mjs', 'utf8').slice(2500, 6000));
