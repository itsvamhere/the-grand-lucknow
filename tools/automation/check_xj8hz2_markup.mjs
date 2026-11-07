import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

let pos = 0;
while ((pos = html.indexOf('class="framer-xj8hz2"', pos)) !== -1) {
  console.log('--- framer-xj8hz2 markup ---');
  console.log(html.slice(pos - 100, pos + 800));
  pos += 20;
}
