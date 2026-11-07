import fs from 'fs';

const s1 = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/s1.html', 'utf8');
const s2 = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/s2.html', 'utf8');

console.log('--- s1 preview ---');
console.log(s1.substring(0, 1500));

console.log('--- s2 preview ---');
console.log(s2.substring(0, 1500));
