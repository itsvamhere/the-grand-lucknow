import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

let idx = 0;
while ((idx = html.indexOf('N°1', idx)) !== -1) {
  console.log('N°1 at ' + idx + ': ' + html.substring(Math.max(0, idx - 40), Math.min(html.length, idx + 60)));
  idx += 3;
}
