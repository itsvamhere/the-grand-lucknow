import fs from 'node:fs';

const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const fIdx = lawn.indexOf('<footer');
const fEnd = lawn.indexOf('</footer>', fIdx) + 9;

console.log('Old footer in lawn starts at:', fIdx, 'ends at:', fEnd);
console.log('Old footer preview:');
console.log(lawn.slice(fIdx, fIdx + 300));
console.log('Old footer tail:');
console.log(lawn.slice(fEnd - 300, fEnd));
