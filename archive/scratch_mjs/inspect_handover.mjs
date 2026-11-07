import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

const idx = html.indexOf('__framer__handoverData');
if (idx !== -1) {
  const handoverStr = html.slice(idx, idx + 4000);
  console.log(handoverStr);
}
