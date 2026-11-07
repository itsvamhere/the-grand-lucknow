import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

const idx2 = html.indexOf('class="framer-gx6kn9"');
if (idx2 !== -1) {
  const slice2 = html.slice(idx2, idx2 + 2500);
  const text2 = [...slice2.matchAll(/>([A-Za-z0-9\s]+)</g)].map(m => m[1]).join('');
  console.log('Text in gx6kn9 full:', text2);
}
