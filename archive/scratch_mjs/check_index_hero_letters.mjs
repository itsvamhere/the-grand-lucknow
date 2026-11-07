import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

const idx1 = html.indexOf('class="framer-127143z"');
if (idx1 !== -1) {
  const slice1 = html.slice(idx1, idx1 + 1200);
  const text1 = [...slice1.matchAll(/>([A-Za-z0-9\s]+)</g)].map(m => m[1]).join('');
  console.log('Text in 127143z:', text1);
}

const idx2 = html.indexOf('class="framer-gx6kn9"');
if (idx2 !== -1) {
  const slice2 = html.slice(idx2, idx2 + 1200);
  const text2 = [...slice2.matchAll(/>([A-Za-z0-9\s]+)</g)].map(m => m[1]).join('');
  console.log('Text in gx6kn9:', text2);
}
