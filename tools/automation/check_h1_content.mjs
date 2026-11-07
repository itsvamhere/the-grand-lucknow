import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');

const regex = /<h1[\s\S]*?<\/h1>/gi;
const match = regex.exec(html);
console.log('H1 full HTML:');
console.log(match[0]);
