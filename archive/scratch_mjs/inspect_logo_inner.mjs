import fs from 'fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const m = idx.match(/data-framer-name="Logo"[\s\S]{0,1200}/);
console.log('Logo snippet in index.html:');
console.log(m ? m[0] : 'not found');
