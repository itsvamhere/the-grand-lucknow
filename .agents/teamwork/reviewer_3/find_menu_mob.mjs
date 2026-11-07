import fs from 'fs';

const origMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', 'utf-8');
const lawnMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/lawn_mob_nav.html', 'utf-8');

console.log('Orig Menu matches:', origMob.match(/data-framer-name="Menu"[\s\S]*?<\/div>/));
console.log('Lawn Menu matches:', lawnMob.match(/data-framer-name="Menu"[\s\S]*?<\/div>/));
