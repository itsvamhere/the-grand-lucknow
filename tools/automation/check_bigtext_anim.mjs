import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');

// Find references to bigtext-1 in scripts
const matches = [...html.matchAll(/bigtext-1/g)];
console.log('bigtext-1 matches:', matches.length);
matches.forEach(m => {
  const start = Math.max(0, m.index - 100);
  const end = Math.min(html.length, m.index + 200);
  console.log(html.slice(start, end));
});
