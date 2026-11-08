import fs from 'fs';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const venuesHtml = fs.readFileSync('venues.html', 'utf8');

// Find all venue items in index.html
const idxItems = [...indexHtml.matchAll(/data-framer-name="Venue Item"[\s\S]*?<\/a>/g)].map(m => m[0]);
console.log('Venue items in index.html:', idxItems.length);
idxItems.forEach((item, idx) => {
  const href = item.match(/href="([^"]+)"/)?.[1];
  const name = item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ||
               item.match(/alt="([^"]+)"/)?.[1];
  console.log(`Index Card ${idx + 1}: ${name} -> ${href}`);
});

// Find all venue items in venues.html
const vItems = [...venuesHtml.matchAll(/data-framer-name="Venue Item"[\s\S]*?<\/a>/g)].map(m => m[0]);
console.log('\nVenue items in venues.html:', vItems.length);
vItems.forEach((item, idx) => {
  const href = item.match(/href="([^"]+)"/)?.[1];
  const name = item.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]?.replace(/<[^>]+>/g, '').trim() ||
               item.match(/alt="([^"]+)"/)?.[1];
  console.log(`Venues.html Card ${idx + 1}: ${name} -> ${href}`);
});
