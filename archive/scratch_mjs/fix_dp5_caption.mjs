import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const dp5Path = path.join(projectDir, 'scripts/dp5RxapaCfSZDIUmJAPG-pqEe4sCQP3YFN6nZtPiSRo.BJjlHCZa.mjs');
let dp5 = fs.readFileSync(dp5Path, 'utf-8');

dp5 = dp5.replaceAll('Sklum Chair', 'Gomti Nagar, Lucknow');
dp5 = dp5.replaceAll('Venue N°6', 'Estate Location');

fs.writeFileSync(dp5Path, dp5, 'utf-8');
console.log('✓ Updated dp5 caption to Gomti Nagar, Lucknow');
