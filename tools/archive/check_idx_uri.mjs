import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const sub = idx.slice(742537 - 20, 742537 + 1000);
console.log('Snippet at 742537:');
console.log(sub);
