import fs from 'fs';

const origMob = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/.agents/teamwork/reviewer_3/orig_mob_nav.html', 'utf-8');
const match = origMob.match(/data-framer-name="Logo"[\s\S]*?<\/a>/);
console.log('Orig Logo HTML:', match ? match[0] : 'None');
