const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

let pos = 0;
while (true) {
  const found = html.indexOf('Open in Maps', pos);
  if (found === -1) break;
  console.log('--- Found at index', found, '---');
  console.log(html.substring(Math.max(0, found - 250), Math.min(html.length, found + 250)));
  pos = found + 12;
}
