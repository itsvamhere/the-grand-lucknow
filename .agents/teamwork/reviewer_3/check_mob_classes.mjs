import fs from 'fs';

const orig = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf-8');
const match = orig.match(/\.framer-4iomze[^{]*\{[^}]*\}/g);
console.log('framer-4iomze CSS:\n', match);

const match2 = orig.match(/\.framer-abt6p4[^{]*\{[^}]*\}/g);
console.log('framer-abt6p4 CSS:\n', match2);
