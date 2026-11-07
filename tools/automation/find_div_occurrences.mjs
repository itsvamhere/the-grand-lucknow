import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idx = html.indexOf('<div id="subpage-vector-map"');
console.log('Div index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 200));
} else {
  console.log('Searching in scripts for subpage-vector-map injection...');
  let pos = 0;
  while ((pos = html.indexOf('subpage-vector-map', pos)) !== -1) {
    console.log('Occurrence at', pos, ':', html.substring(pos - 40, pos + 40));
    pos += 18;
  }
}
