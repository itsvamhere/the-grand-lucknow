import fs from 'fs';

const files = fs.readdirSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/images');
console.log('Images in images/ folder:');
files.forEach(f => console.log(' -', f));
