import fs from 'fs';

const lawnMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/lawn_mob_nav.html', 'utf-8');
const origMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', 'utf-8');

console.log('Lawn Logo match:', lawnMob.match(/data-framer-name="Logo"[\s\S]*?<\/a>/));
console.log('Orig Logo match:', origMob.match(/data-framer-name="Logo"[\s\S]*?<\/a>/));
