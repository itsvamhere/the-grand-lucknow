import fs from 'fs';

const idxContent = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const lawnContent = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

const idMatch = idxContent.indexOf('id="grand-bulletproof-btn-css"');
console.log('Index grand-bulletproof-btn-css:');
console.log(idxContent.slice(idMatch, idMatch + 1500));
