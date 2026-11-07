const fs = require('fs');

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf8');

const matches = orig.match(/.{0,100}CASA MOMO.{0,100}/gi) || [];
console.log('Matches in orig:', matches.length);
matches.forEach((m, i) => console.log(`Match ${i}:`, m.replace(/\s+/g, ' ')));

// Also search for casa-momo or aria-label="Casa Momo"
const ariaMatches = orig.match(/.{0,100}Casa Momo.{0,100}/gi) || [];
console.log('\nCasa Momo matches:', ariaMatches.length);
ariaMatches.slice(0, 5).forEach((m, i) => console.log(`Aria ${i}:`, m.replace(/\s+/g, ' ')));
