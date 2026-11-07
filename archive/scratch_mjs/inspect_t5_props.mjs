import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

// Find the component render function
const match = content.match(/function\s+([A-Za-z0-9_$]+)\s*\(\s*\{[^}]*\}\s*\)/);
console.log('Component params match:', match ? match[0] : 'not found');

// Find all occurrences of "Squaremeter"
const idx = content.indexOf('Squaremeter');
console.log(content.substring(idx - 1500, idx - 500));
