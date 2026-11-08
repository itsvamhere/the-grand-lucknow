import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

const gridStart = idx.indexOf('<section class="framer-mefgjz" data-framer-name="Venues Grid"');
const gridEnd = idx.indexOf('</section>', gridStart);
console.log('Grid starts at', gridStart, 'ends at', gridEnd);

const gridContent = idx.slice(gridStart, gridEnd);
const items = gridContent.split(/(?=<div class="framer-fdgjuz" data-framer-name="Venue Item">)/);
console.log('Split into pieces:', items.length);
console.log('Header before items:', items[0].slice(0, 200));

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const href = item.match(/href="([^"]+)"/)?.[1];
  const img = item.match(/src="([^"]+)"/)?.[1];
  const h2 = item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]?.replace(/<[^>]+>/g, '').trim();
  console.log(`Item ${i}: href=${href}, img=${img}, h2=${h2}, length=${item.length}`);
}
