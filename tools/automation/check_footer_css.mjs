import fs from 'node:fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const lawn = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html', 'utf8');

console.log('index has .framer-18na9ah:', idx.includes('framer-18na9ah'));
console.log('lawn has .framer-18na9ah:', lawn.includes('framer-18na9ah'));
console.log('index has .framer-192t1bg-container:', idx.includes('framer-192t1bg-container'));
console.log('lawn has .framer-192t1bg-container:', lawn.includes('framer-192t1bg-container'));
