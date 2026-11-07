import fs from 'fs';
const c = fs.readFileSync('server.mjs', 'utf8');

const idx = c.indexOf('hero_bg.webp');
console.log(c.substring(idx - 100, idx + 400));
