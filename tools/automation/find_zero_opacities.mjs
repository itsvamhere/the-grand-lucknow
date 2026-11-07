import fs from 'node:fs';

const footer = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/rendered_home_footer.html', 'utf8');

const matches = footer.match(/<[^>]+style="[^"]*opacity:\s*(?:0(?:\.\d+)?)[^"]*"[^>]*>/g) || [];
console.log('Matches with opacity < 1:', matches.length);
matches.slice(0, 15).forEach(m => console.log(m.slice(0, 150)));
