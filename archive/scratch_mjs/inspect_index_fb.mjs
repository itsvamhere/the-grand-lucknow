import fs from 'fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

console.log('--- index.html around 642283 ---');
console.log(content.substring(642283, 644500));
