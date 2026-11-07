const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all h2 tags inside index.html
const h2s = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi));
console.log('Total h2 tags in index.html:', h2s.length);

h2s.forEach((h, i) => {
  const text = h[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`h2 [${i}]:`, text);
});
