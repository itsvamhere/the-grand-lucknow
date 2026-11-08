import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const gridStart = idx.indexOf('<section class="framer-mefgjz" data-framer-name="Venues Grid"');
const gridEnd = idx.indexOf('</section>', gridStart);
const items = idx.slice(gridStart, gridEnd).split(/(?=<div class="framer-fdgjuz" data-framer-name="Venue Item">)/);

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const href = item.match(/href="([^"]+)"/)?.[1];
  const title = item.match(/alt="([^"]+)"/)?.[1];
  const numbers = [...item.matchAll(/<p class="framer-text[^>]*>([\d,]+)<\/p>/g)].map(m => m[1]);
  console.log(`Card ${i}: ${title} (${href}) -> Size: ${numbers[0]} Sqft, Guests: ${numbers[1]}`);
}
