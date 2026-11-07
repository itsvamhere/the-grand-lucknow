import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const matches = [...html.matchAll(/sqft|sq ft/gi)];
console.log('Matches in index.html:', matches.length);
matches.forEach(m => {
  console.log(html.substring(Math.max(0, m.index - 100), Math.min(html.length, m.index + 200)).replace(/\s+/g, ' '));
});
