import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idx = html.indexOf('subpage-vector-map');
console.log('Index:', idx);
console.log(html.substring(idx - 300, idx + 400));
