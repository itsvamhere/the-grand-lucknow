import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.lastIndexOf('<script');
console.log(html.substring(idx - 1000));
