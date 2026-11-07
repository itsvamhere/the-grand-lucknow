import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const matches = [...html.matchAll(/"map"|"Map"|mapUrl|imageMap|Map\.webp|map\.webp/g)];
console.log('Matches:', matches.length);

// Also search in upstream HTML for images near "Location Map"
const locIdx = html.indexOf('name="Location Map"');
const jsonChunk = html.substring(locIdx - 2000, locIdx + 2000);
const imgMatches = [...jsonChunk.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"')\s]+/g)];
console.log('Images near Location Map:', imgMatches.map(m => m[0]));
