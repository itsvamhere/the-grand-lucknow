import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');
let idx = 0;
while ((idx = html.indexOf('1334768056_3843', idx)) !== -1) {
  console.log('at ' + idx + ':\n' + html.substring(Math.max(0, idx - 80), Math.min(html.length, idx + 400)));
  idx += 15;
}
