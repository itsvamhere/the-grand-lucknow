import fs from 'fs';

const origHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html.original', 'utf-8');

// Find hero title in original HTML
const idx = origHtml.indexOf('framer-name="Hero"');
if (idx !== -1) {
  console.log(origHtml.slice(idx, idx + 2500));
} else {
  // search for CASA
  const matches = [...origHtml.matchAll(/(.{0,60}CASA.{0,60})/g)];
  for (const m of matches.slice(0, 5)) {
    console.log('->', m[0]);
  }
}
