const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const pos1 = subHtml.indexOf('href="/venues/grassland-gala"');
const pos1End = subHtml.indexOf('</a>', pos1);
console.log('=== CARD 1 HEADING & BADGES ===');
console.log(subHtml.substring(pos1, pos1End));
