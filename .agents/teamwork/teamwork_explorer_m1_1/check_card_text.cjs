const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const pos1 = subHtml.indexOf('href="/venues/grassland-gala"');
const pos2 = subHtml.indexOf('href="/venues/garden-galaxy"');

console.log('=== CARD 1 TEXT & DETAILS ===');
console.log(subHtml.substring(pos1, pos1 + 3500));

console.log('=== CARD 2 TEXT & DETAILS ===');
console.log(subHtml.substring(pos2, pos2 + 3500));
