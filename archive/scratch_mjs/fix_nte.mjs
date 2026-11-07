import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';
const ntePath = path.join(projectDir, 'scripts/nteO2IV_oruZhnTtyytdbfV2QtZZPjMtQEspCiom9d8.B30j0rWH.mjs');
let nte = fs.readFileSync(ntePath, 'utf-8');

nte = nte.replaceAll('Sklum Chair', 'The Grand, Lucknow');
nte = nte.replaceAll('Venue N°7', 'The Grand');

fs.writeFileSync(ntePath, nte, 'utf-8');
console.log('✓ Updated nte 404 page');
