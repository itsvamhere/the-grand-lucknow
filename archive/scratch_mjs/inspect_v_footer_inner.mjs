import fs from 'fs';

const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

const footerStart = v.indexOf('<footer');
console.log('Footer length from start to end of file:', v.length - footerStart);
// Look for Nexene or links inside footer
const footerStr = v.substring(footerStart);
const matches = [...footerStr.matchAll(/(Nexene|Edifice|Imprint|Terms|Privacy|Made with|Built by|instagram|facebook|linkedin)/gi)];
for (const m of matches) {
  const s = Math.max(0, m.index - 30);
  const e = Math.min(footerStr.length, m.index + m[0].length + 30);
  console.log(`[+${m.index}] ${footerStr.substring(s, e).replace(/\s+/g, ' ')}`);
}
