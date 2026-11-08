import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const idx = 861904;
console.log(homeHtml.substring(idx - 50, idx + 200));
