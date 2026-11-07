import fs from 'fs';

const idx = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');
const v = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/venue-n2.html', 'utf8');

function checkLogo(html, name) {
  console.log(`=== Logo in ${name} ===`);
  const matches = [...html.matchAll(/framer-logo|logo|data-framer-name="Logo"/gi)];
  for (const m of matches) {
    const s = Math.max(0, m.index - 40);
    const e = Math.min(html.length, m.index + 120);
    console.log(html.substring(s, e).replace(/\s+/g, ' '));
  }
}

checkLogo(idx, 'index.html');
checkLogo(v, 'venue-n2.html');
