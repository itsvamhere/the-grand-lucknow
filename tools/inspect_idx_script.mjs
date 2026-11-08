import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
console.log(idx.slice(870000, 874000));
