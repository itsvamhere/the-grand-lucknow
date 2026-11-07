import fs from 'node:fs';

let footer = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/rendered_home_footer.html', 'utf8');

// Check for any opacity: 0 or opacity: 0.1 or transforms
const opacities = footer.match(/opacity:\s*[\d\.]+/g) || [];
console.log('Unique opacities in rendered footer:', [...new Set(opacities)]);

const transforms = footer.match(/transform:[^;"]+/g) || [];
console.log('Unique transforms in rendered footer:', [...new Set(transforms)]);
