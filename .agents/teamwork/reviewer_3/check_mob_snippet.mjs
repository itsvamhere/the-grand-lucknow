import fs from 'fs';

const origMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', 'utf-8');
const lawnMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/lawn_mob_nav.html', 'utf-8');

const origIdx = origMob.indexOf('data-framer-name="Logo"');
console.log('Orig snippet around logo:\n', origMob.slice(origIdx - 200, origIdx + 300));

const lawnIdx = lawnMob.indexOf('data-framer-name="Logo"');
console.log('Lawn snippet around logo:\n', lawnMob.slice(lawnIdx - 200, lawnIdx + 300));
