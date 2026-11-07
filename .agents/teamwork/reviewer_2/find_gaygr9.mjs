import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');
const count = (s.match(/data-framer-appear-id="gaygr9"/g) || []).length;
console.log('Occurrences of data-framer-appear-id="gaygr9":', count);
const matches = [...s.matchAll(/<div[^>]*data-framer-appear-id="gaygr9"[^>]*>/g)];
matches.forEach((m, i) => console.log(i, ':', m[0]));
