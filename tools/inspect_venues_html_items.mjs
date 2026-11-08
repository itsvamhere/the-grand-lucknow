import fs from 'fs';

const vHtml = fs.readFileSync('venues.html', 'utf8');

const gridStart = vHtml.indexOf('<section class="framer-mefgjz" data-framer-name="Venues Grid"');
const gridEnd = vHtml.indexOf('</section>', gridStart);
console.log('venues.html Grid starts at', gridStart, 'ends at', gridEnd);

const gridContent = vHtml.slice(gridStart, gridEnd);
const items = gridContent.split(/(?=<div class="framer-fdgjuz" data-framer-name="Venue Item">)/);
console.log('Split into pieces:', items.length);

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const href = item.match(/href="([^"]+)"/)?.[1];
  const img = item.match(/src="([^"]+)"/)?.[1];
  const h2 = item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]?.replace(/<[^>]+>/g, '').trim();
  console.log(`Item ${i}: href=${href}, img=${img}, h2=${h2}`);
}
