const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find the section that lists the apartments / venues
const vStart = html.indexOf('data-framer-name="Venues Grid"');
console.log('Venues Grid index:', vStart);
if (vStart !== -1) {
  console.log(html.substring(vStart, vStart + 2500));
} else {
  // Try "Apartments Grid" or "Apartment" or "Venue"
  const aStart = html.indexOf('data-framer-name="Apartments');
  console.log('Apartments index:', aStart);
  if (aStart !== -1) {
    console.log(html.substring(aStart, aStart + 2500));
  }
}
