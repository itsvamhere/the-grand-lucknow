import fs from 'fs';

const origPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html';
const destPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html';

let html = fs.readFileSync(origPath, 'utf8');

// If there are relative image paths like /images/ or ./, ensure they load properly
// Check sample paths
const images = html.match(/src="[^"]*"/g) || [];
console.log('Sample src paths from original:', images.slice(0, 8));

fs.writeFileSync(destPath, html, 'utf8');
console.log('venues/boutique-n1.html is now a 1:1 replica of live casamomo.at/apartments/boutique-n1');
