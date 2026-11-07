const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8').split('\n');
const line = lines[1124];

const card1Idx = line.indexOf('href="/venues/grassland-gala"');
console.log('Card 1 in line 1125 at index:', card1Idx);
console.log(line.substring(card1Idx - 50, card1Idx + 500));

const card2Idx = line.indexOf('href="/venues/garden-galaxy"');
console.log('Card 2 in line 1125 at index:', card2Idx);
console.log(line.substring(card2Idx - 50, card2Idx + 500));
