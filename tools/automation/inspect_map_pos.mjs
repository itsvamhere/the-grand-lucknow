import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const pos = html.indexOf('id="subpage-vector-map"');
console.log('Pos:', pos);
if (pos !== -1) {
  console.log(html.substring(pos - 300, pos + 700));
} else {
  console.log('Not found');
}
