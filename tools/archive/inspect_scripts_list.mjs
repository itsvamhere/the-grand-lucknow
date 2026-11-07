import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const fEnd = html.indexOf('</footer>') + 9;
const afterFooter = html.slice(fEnd);

const sRegex = /<script[\s\S]*?<\/script>/g;
let m;
let i = 0;
while ((m = sRegex.exec(afterFooter)) !== null) {
  console.log(`Script ${i++} length: ${m[0].length}, preview: ${m[0].slice(0, 150)}...`);
}
