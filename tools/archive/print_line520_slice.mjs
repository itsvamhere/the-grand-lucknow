import fs from 'fs';

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
const line520 = lines[519];

console.log(line520.slice(38500, 39500));
