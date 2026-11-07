const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all elements inside Venues Grid
const gridStart = html.indexOf('data-framer-name="Venues Grid"');
const gridEnd = html.indexOf('</section>', gridStart);
const gridHtml = html.substring(gridStart, gridEnd !== -1 ? gridEnd : gridStart + 50000);

// Find each Venue Item
const items = Array.from(gridHtml.matchAll(/<div[^>]*data-framer-name="Venue Item"[\s\S]*?(?=<div[^>]*data-framer-name="Venue Item"|<\/div>\s*<\/div>\s*<\/section>|$)/gi));
console.log('Total Venue Items found:', items.length);

items.forEach((it, i) => {
  const h2 = it[0].match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const a = it[0].match(/<a[^>]*href="([^"]*)"/i);
  const h2Text = h2 ? h2[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'NONE';
  const pTags = Array.from(it[0].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map(p => p[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  console.log(`\n--- Item ${i + 1} ---`);
  console.log('Href:', a ? a[1] : 'NONE');
  console.log('H2:', h2Text);
  console.log('P tags:', pTags);
});
