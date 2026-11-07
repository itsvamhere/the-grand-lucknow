import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf-8');

const idx = html.indexOf('THE%20GRAND%20LUCKNOW');
if (idx !== -1) {
  console.log(html.slice(idx - 200, idx + 200));
}
