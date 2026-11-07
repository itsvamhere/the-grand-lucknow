import fs from 'fs';

const index = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const navMatch = index.match(/<nav[\s\S]*?<\/nav>/i) || index.match(/framer-qv358a[\s\S]{0,500}/i);
console.log('Nav match:', navMatch ? navMatch[0].slice(0, 400) : 'none');

const matches = [...index.matchAll(/Venues/g)];
console.log('Venues occurrences in index:', matches.length);
