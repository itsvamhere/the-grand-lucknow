import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const m = v.match(/id="svg-1334768056_3843"[\s\S]{0,1500}/);
console.log('svg symbol in venue-n2.html:');
console.log(m ? m[0] : 'not found');
