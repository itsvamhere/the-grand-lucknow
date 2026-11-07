import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const regex = /svg870196829_4253/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Index:', match.index);
  console.log(html.slice(Math.max(0, match.index - 100), Math.min(html.length, match.index + 100)));
}
