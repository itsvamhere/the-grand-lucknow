const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

// Check all occurrences of svg-1334768056_3843
const matches = html.match(/svg-1334768056_3843/g);
console.log('Occurrences of svg-1334768056_3843:', matches ? matches.length : 0);

// Check all occurrences of aria-label="Casa Momo
const ariaMatches = html.match(/aria-label="Casa Momo[^"]*"/g);
console.log('Aria label matches:', ariaMatches);

// Check if any other logo SVGs exist
const logoDivs = html.match(/<a[^>]*data-framer-name="Logo"[^>]*>[\s\S]*?<\/a>/gi);
console.log('Logo links in HTML:', logoDivs ? logoDivs.length : 0);
if (logoDivs) {
  logoDivs.forEach((ld, i) => console.log(`Logo ${i}:`, ld));
}
