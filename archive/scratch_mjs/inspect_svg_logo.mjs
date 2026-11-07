import fs from 'fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const m = idx.match(/data-framer-component-type="SVG"\s+data-framer-name="Logo"[\s\S]{0,1000}/);
console.log('SVG Logo snippet:');
console.log(m ? m[0] : 'not found');
