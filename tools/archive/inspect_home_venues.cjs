const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all occurrences of N°01, N°02, N°1, etc.
const nMatches = Array.from(html.matchAll(/.{0,80}N°0[1-9].{0,80}/gi)).map(m => m[0].replace(/\s+/g, ' '));
console.log('N° matches in index.html:', nMatches.length);
nMatches.forEach((m, i) => console.log(`[${i}]`, m));

// Find occurrences of "venues" or "apartments" list sections
const secMatches = Array.from(html.matchAll(/data-framer-name="[^"]*(?:Apartment|Venue)[^"]*"/gi)).map(m => m[0]);
console.log('\nFramer names matching Apartment or Venue:', Array.from(new Set(secMatches)));
