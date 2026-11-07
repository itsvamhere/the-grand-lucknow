import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

// Find defaultProps or property controls in Qfj
const end = content.substring(content.length - 2500);
console.log('End of Qfj:');
console.log(end);
