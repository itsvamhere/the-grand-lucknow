import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

// Search for Open Earth Lawn in the HTML markup (not just script)
const regex = /Open Earth Lawn/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log(`Match at ${m.index}:`);
  console.log(html.slice(Math.max(0, m.index - 200), Math.min(html.length, m.index + 200)));
  console.log('---');
}
