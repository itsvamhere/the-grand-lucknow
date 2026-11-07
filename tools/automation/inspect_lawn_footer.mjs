import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idx = html.indexOf('<footer');
if (idx !== -1) {
  const endIdx = html.indexOf('</footer>', idx);
  console.log('Footer in open-earth-lawn.html length:', endIdx + 9 - idx);
  console.log(html.slice(idx, idx + 800));
} else {
  console.log('No footer in open-earth-lawn.html');
}
