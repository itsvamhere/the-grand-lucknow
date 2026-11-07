import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const matches = [...html.matchAll(/(?:GRAND|CASA)[\s\S]{0,100}?(?:GRAND|CASA)/g)];
console.log('Matches near GRAND marquee:');
matches.slice(0, 10).forEach(m => console.log(' *', m[0].replace(/\s+/g, ' ')));

// Search for footer marquee container
const footerIdx = html.indexOf('Footer Logo');
console.log('Footer logo index:', footerIdx);
if (footerIdx !== -1) {
  console.log(html.substring(footerIdx - 200, footerIdx + 1500));
}
