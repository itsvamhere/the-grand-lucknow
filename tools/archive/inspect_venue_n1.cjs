const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n1.html', 'utf8');

console.log('Title in venue-n1.html:');
const tM = html.match(/<title>([^<]+)<\/title>/);
console.log(tM ? tM[1] : 'NONE');

console.log('H1/H2 in venue-n1.html:');
const hMatches = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)];
hMatches.slice(0, 10).forEach(m => console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
