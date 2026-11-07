import fs from 'fs';

const p = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(p, 'utf8');

html = html.replaceAll('href="./venues/open-earth"', 'href="/venues/open-earth-lawn"');
html = html.replaceAll('href="/venues/open-earth"', 'href="/venues/open-earth-lawn"');

// Also update in the override script if needed
fs.writeFileSync(p, html, 'utf8');
console.log('Updated homepage links to /venues/open-earth-lawn');
