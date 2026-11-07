import fs from 'node:fs';

const css = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/footer_rules.css', 'utf8');
console.log('CSS length:', css.length);
console.log('Sample rules:\n', css.slice(0, 1500));
