import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const m = v.match(/data-framer-name="Logo"[\s\S]{0,500}/);
console.log('Logo in venue-n2.html:');
console.log(m ? m[0] : 'not found');
