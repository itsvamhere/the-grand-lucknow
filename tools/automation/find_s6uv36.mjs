import fs from 'node:fs';

const html = fs.readFileSync('upstream_boutique-n1.html', 'utf8');

const regex = /s6uv36/g;
let m;
while ((m = regex.exec(html)) !== null) {
  const start = Math.max(0, m.index - 100);
  const end = Math.min(html.length, m.index + 200);
  console.log(html.slice(start, end));
}
