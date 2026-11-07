import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');
const scriptMatches = html.match(/src="[^"]*\.mjs"/g);
console.log('Scripts in boutique-n1.html:', scriptMatches);
