import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

const idx1 = html.indexOf('class="framer-127143z"');
if (idx1 !== -1) {
  console.log('--- 127143z ---');
  console.log(html.slice(idx1, idx1 + 800));
}

const idx2 = html.indexOf('class="framer-gx6kn9"');
if (idx2 !== -1) {
  console.log('--- gx6kn9 ---');
  console.log(html.slice(idx2, idx2 + 800));
}
