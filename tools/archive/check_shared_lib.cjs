const fs = require('fs');

const shared = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/shared-lib.DganPNQZ.mjs', 'utf8');

console.log('Contains N°01 in shared-lib:', shared.includes('N°01'));
console.log('Contains N°02 in shared-lib:', shared.includes('N°02'));
console.log('Contains Open Earth Lawn in shared-lib:', shared.includes('Open Earth Lawn'));
console.log('Contains Venue N°1 in shared-lib:', shared.includes('Venue N°1'));
