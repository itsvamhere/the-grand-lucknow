import fs from 'node:fs';

const content = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/scripts/Qfj1byi71tPdQnoYA4y--irm47mWrbgiSgyLgjHFTIo.CD9Cffnd.mjs', 'utf8');

const imgMatches = [...content.matchAll(/https:\/\/[^"'\s]+\.(?:png|jpg|webp|svg)/gi)].map(m => m[0]);
console.log('Image matches:', imgMatches);

// Also look for default props or image props passed to the component in upstream_boutique-n1.html
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/upstream_boutique-n1.html', 'utf8');
const locIdx = html.indexOf('name="Location Map"');
console.log(html.substring(locIdx - 400, locIdx + 100));
