const fs = require('fs');

const indexHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all elements containing "THE GRAND" or the logo in the header
const matches = indexHtml.match(/.{0,100}THE GRAND.{0,100}/gi);
if (matches) {
  matches.slice(0, 5).forEach((m, i) => console.log(`Match ${i}:`, m.replace(/\s+/g, ' ')));
} else {
  console.log('No matches for THE GRAND');
}
