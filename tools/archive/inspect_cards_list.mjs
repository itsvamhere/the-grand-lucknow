import fs from 'fs';
const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const vStart = html.indexOf('data-framer-name="Venue Lists"');
const vEnd = html.indexOf('</section>', vStart);
const vSection = html.slice(vStart, vEnd);

// Find all cards inside Venue Lists
const cards = vSection.match(/<a class="framer-ysBPc[\s\S]*?<\/a>/g);
console.log('Total cards found in Venue Lists:', cards ? cards.length : 0);
if (cards) {
  cards.forEach((c, idx) => {
    const titleMatch = c.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    const hrefMatch = c.match(/href="([^"]+)"/);
    const imgMatch = c.match(/<img[^>]+src="([^"]+)"/);
    console.log(`Card ${idx + 1}:`);
    console.log(`  href: ${hrefMatch ? hrefMatch[1] : 'none'}`);
    console.log(`  img: ${imgMatch ? imgMatch[1] : 'none'}`);
    console.log(`  title: ${titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'none'}`);
  });
}
