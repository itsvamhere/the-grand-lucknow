import fs from 'fs';

const origMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', 'utf-8');

const divs = origMob.match(/data-framer-name="[^"]+"/g);
console.log('Framer names in origMob:', [...new Set(divs)]);
