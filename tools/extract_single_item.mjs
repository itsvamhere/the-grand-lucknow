import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_apartments_grid_snippet.html', 'utf8');

const itemStart = html.indexOf('data-framer-name="Booking Item"');
const itemDivStart = html.lastIndexOf('<div', itemStart);
// Find matching closing div or next booking item
const nextItem = html.indexOf('data-framer-name="Booking Item"', itemStart + 30);
const snippet = html.slice(itemDivStart, nextItem !== -1 ? nextItem : itemDivStart + 5000);

console.log('Single item snippet length:', snippet.length);
fs.writeFileSync('tools/sample_booking_item.html', snippet);
console.log('Sample item snippet (first 1200 chars):\n', snippet.slice(0, 1200));
