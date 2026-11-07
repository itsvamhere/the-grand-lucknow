const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

console.log('--- Titles & Headings in open-earth-lawn.html ---');
const hMatches = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g)];
hMatches.slice(0, 10).forEach(m => console.log(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));

console.log('--- Nav in open-earth-lawn.html ---');
const navM = html.match(/<nav[\s\S]*?<\/nav>/);
if (navM) {
  console.log(navM[0].substring(0, 400));
}
