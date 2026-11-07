const fs = require('fs');
const subHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const pos1 = subHtml.indexOf('href="/venues/grassland-gala"');
console.log('=== GRASSLAND GALA CARD (around pos ' + pos1 + ') ===');
console.log(subHtml.substring(pos1 - 300, pos1 + 1800));

const pos2 = subHtml.indexOf('href="/venues/garden-galaxy"');
console.log('=== GARDEN GALAXY CARD (around pos ' + pos2 + ') ===');
console.log(subHtml.substring(pos2 - 300, pos2 + 1800));
