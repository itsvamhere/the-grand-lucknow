import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');

const fns = [...content.matchAll(/function\s+([A-Za-z0-9_$]+)?\s*\([^)]*\)/g)];
console.log('All functions in T5PVE:');
fns.forEach(f => console.log(' *', f[0].substring(0, 100)));
