import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const vListIdx = html.indexOf('data-framer-name="Venue Lists"');
const vList = html.slice(vListIdx, vListIdx + 15000);

const items = vList.split('data-framer-name="Venue Item"');
console.log('Items found:', items.length - 1);

for (let i = 1; i < items.length; i++) {
  const item = items[i];
  const title = item.match(/<span[^>]*translateY\(50px\)[^>]*>([\s\S]*?)<\/span>/)?.[1] || item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1];
  const href = item.match(/href="([^"]+)"/)?.[1];
  const img = item.match(/<img[^>]+src="([^">]+)"/)?.[1];
  const size = item.match(/<p class="framer-text[^>]*>([\d,]+)<\/p>/)?.[1];
  const guests = item.match(/guest.*?<p class="framer-text[^>]*>([\d,]+)<\/p>/i)?.[1] || item.match(/framer-1a6x07d[\s\S]*?<p class="framer-text[^>]*>([\d,]+)<\/p>/)?.[1];
  console.log(`Card ${i}: title=${title?.replace(/<[^>]+>/g, '')}, href=${href}, img=${img}, size=${size}, guests=${guests}`);
}
