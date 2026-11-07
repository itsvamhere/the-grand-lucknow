import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const heroStart = content.indexOf('data-framer-name="Hero"');
const heroEnd = content.indexOf('</section>', heroStart);
console.log('Hero section length:', heroEnd - heroStart);
const heroHTML = content.substring(heroStart, heroEnd + 10);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/local_hero_dump.html', heroHTML);
console.log('Saved to tools/local_hero_dump.html');
