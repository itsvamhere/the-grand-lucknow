import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const tIdx = html.indexOf('ticker-item');
console.log(html.slice(tIdx - 400, tIdx + 600));
