import fs from 'fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/boutique-n1.html', 'utf8');

const s1 = html.substring(350563, 368495);
const s2 = html.substring(368522 - 10, 368522 + 10000);

fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/s1.html', s1);
fs.writeFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/tools/s2.html', s2);

console.log('s1 length:', s1.length, 's2 length:', s2.length);
