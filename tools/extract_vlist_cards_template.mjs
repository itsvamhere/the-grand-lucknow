import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const vListMatch = html.match(/(<div class="framer-9du0n0" data-framer-name="Venue List">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/div>\s*<footer)/);
if (vListMatch) {
  console.log('Venue List container found!');
  const inner = vListMatch[2];
  const items = inner.split(/(?=<div class="framer-1jnzc16")/);
  console.log('Items found:', items.length);
  items.forEach((item, idx) => {
    console.log(`\n=== ITEM ${idx} (length ${item.length}) ===`);
    console.log(item.slice(0, 400));
  });
} else {
  console.log('Not matched');
}
