const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all matches of N°01, N°02, etc. in index.html
const matches = Array.from(html.matchAll(/"(N°0[1-9])"/g));
console.log('JSON matches:', matches.map(m => m[1]));

// Also check if any script overrides or sets card titles
const ovMatches = html.match(/.{0,50}Venue N°[1-9].{0,50}/g);
console.log('Venue N matches:', ovMatches);
