import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const idx = s.indexOf('data-framer-appear-id="p57yy4"');
console.log(s.slice(idx, idx + 300));
