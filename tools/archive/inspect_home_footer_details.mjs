import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const idx = home.indexOf('data-framer-name="Footer Logo"');
console.log('--- Footer Logo in index.html ---');
console.log(home.slice(idx, idx + 4000));
