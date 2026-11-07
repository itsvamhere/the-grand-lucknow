import fs from 'node:fs';

const html = fs.readFileSync('upstream_boutique-n1.html', 'utf8');

// Search for scroll animations or transforms on bigtext-1
const matches = [...html.matchAll(/bigtext-1/g)];
console.log('Total bigtext-1 matches:', matches.length);
matches.forEach(m => {
  const start = Math.max(0, m.index - 200);
  const end = Math.min(html.length, m.index + 300);
  console.log(html.slice(start, end));
});
