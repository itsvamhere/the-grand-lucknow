import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

console.log('--- 383000 to 385000 ---');
console.log(content.substring(383000, 385000));
