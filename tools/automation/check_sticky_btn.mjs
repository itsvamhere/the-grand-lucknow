import fs from 'node:fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

// Look for Check Availability in index and lawn
console.log('Check Availability in index:', idx.includes('Check Availability'));
console.log('Sticky Button in index:', idx.includes('Sticky Button'));
console.log('Sticky Button in lawn:', lawn.includes('Sticky Button'));
