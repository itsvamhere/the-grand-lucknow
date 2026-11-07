import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('svg-1334768056_3843');
console.log(html.substring(Math.max(0, idx - 100), idx + 1000));
