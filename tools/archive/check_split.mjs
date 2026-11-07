import fs from 'fs';
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
console.log('Occurrences of framer-1esgfsu in index.html:', html.split('framer-1esgfsu').length - 1);
