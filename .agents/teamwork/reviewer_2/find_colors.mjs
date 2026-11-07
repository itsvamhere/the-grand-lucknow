import fs from 'fs';
const s = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/casamomo_boutique_n1_original.html', 'utf8');

const matches = [];
const hexRegex = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g;
let m;
while ((m = hexRegex.exec(s)) !== null) {
  if (['e8dbb7', 'fff0ca', 'f3ecdd'].includes(m[1].toLowerCase())) {
    matches.push({ color: m[0], idx: m.index });
  }
}
console.log('Matches in original:', matches.slice(0, 10));
