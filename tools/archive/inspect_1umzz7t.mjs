import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const pos = 243699;
console.log('Context of framer-1umzz7t in index.html:');
console.log(idx.slice(pos - 600, pos - 200));
