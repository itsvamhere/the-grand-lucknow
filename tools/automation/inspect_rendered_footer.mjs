import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/rendered_home_footer.html', 'utf8');

console.log('--- FIRST 1000 CHARS ---');
console.log(html.slice(0, 1000));
console.log('--- LAST 1000 CHARS ---');
console.log(html.slice(-1000));
