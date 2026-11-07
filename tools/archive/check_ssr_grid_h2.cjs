const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all <h2> in #mefgjz
const gridStart = html.indexOf('id="mefgjz"');
const gridEnd = html.indexOf('</section>', gridStart);
const grid = html.substring(gridStart, gridEnd);

const h2s = Array.from(grid.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi));
console.log('Grid h2 count:', h2s.length);
h2s.forEach((h, i) => console.log(`Card ${i + 1}:`, h[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
