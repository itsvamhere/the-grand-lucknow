const fs = require('fs');

const nav = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/current_venue_nav.html', 'utf8');

console.log('Contains CASA MOMO:', nav.includes('CASA MOMO'));
console.log('Contains Casa Momo:', nav.includes('Casa Momo'));
console.log('Contains THE GRAND:', nav.includes('THE GRAND'));
console.log('Contains Book Now:', nav.includes('Book Now'));
console.log('Contains Inquire Now:', nav.includes('Inquire Now'));
console.log('Contains Open in Maps:', nav.includes('Open in Maps'));

// Find all SVG tags in nav
const svgs = nav.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
console.log('SVG count in nav:', svgs.length);
svgs.forEach((svg, i) => {
  console.log(`\n--- SVG ${i} ---`);
  console.log('Length:', svg.length);
  console.log('Preview:', svg.substring(0, 150));
  if (svg.includes('path') || svg.includes('text')) {
    const texts = svg.match(/<text[^>]*>[\s\S]*?<\/text>/gi);
    if (texts) console.log('Texts:', texts);
  }
});
