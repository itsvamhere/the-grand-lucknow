import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const pos = 243699;
console.log('CSS snippet in index.html around 243699:');
console.log(idx.slice(pos - 300, pos + 400));
