import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const locIdx = html.indexOf('name="Location Map"');
const endLoc = html.indexOf('<!--/$-->', locIdx + 100);
console.log('Location Map end index:', endLoc);
console.log(html.substring(endLoc - 1000, endLoc + 200));
