import fs from 'fs';

const origMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', 'utf-8');
const lawnMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/lawn_mob_nav.html', 'utf-8');

const origIdx = origMob.indexOf('data-framer-name="Menu Button"');
console.log('Orig Menu Button:\n', origMob.slice(origIdx - 100, origIdx + 400));

const lawnIdx = lawnMob.indexOf('data-framer-name="Menu Button"');
console.log('Lawn Menu Button:\n', lawnMob.slice(lawnIdx - 100, lawnIdx + 400));
