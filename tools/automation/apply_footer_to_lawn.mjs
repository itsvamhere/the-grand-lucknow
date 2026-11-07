import fs from 'node:fs';

const lawnPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let lawn = fs.readFileSync(lawnPath, 'utf8');

const fIdx = lawn.indexOf('<footer');
const fEnd = lawn.indexOf('</footer>', fIdx) + 9;

if (fIdx === -1 || fEnd === -1) {
  console.error('Footer not found in lawn!');
  process.exit(1);
}

const universalFooter = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/universal_footer_snippet.html', 'utf8');

lawn = lawn.slice(0, fIdx) + universalFooter + lawn.slice(fEnd);
fs.writeFileSync(lawnPath, lawn, 'utf8');
console.log('Successfully updated venues/open-earth-lawn.html with universal footer!');
