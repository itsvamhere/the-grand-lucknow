import fs from 'node:fs';

const indexHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Extract footer from index.html
const fStart = indexHtml.indexOf('<footer');
const fEnd = indexHtml.indexOf('</footer>', fStart) + 9;
const footerHtml = indexHtml.slice(fStart, fEnd);

console.log('Index footer length:', footerHtml.length);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/home_footer_extracted.html', footerHtml, 'utf8');
console.log('Saved home_footer_extracted.html');
