import fs from 'fs';

const vjson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));

// Check existing rewrites
console.log('Current rewrites:', vjson.rewrites);

// Ensure rewrites for all 9 venues
const requiredVenues = [
  'open-earth-lawn',
  'grassland-gala',
  'grand-ballroom',
  'the-courtyard',
  'garden-pavilion',
  'north-mandap',
  'dining-expanse',
  'vip-atrium',
  'bridal-suite',
  'venue-n1',
  'venue-n2',
  'venue-n3',
  'venue-n4',
  'venue-n5',
  'loft-n1'
];

requiredVenues.forEach(slug => {
  const source = `/venues/${slug}`;
  const destination = `/venues/${slug}.html`;
  const exists = vjson.rewrites.some(r => r.source === source);
  if (!exists) {
    vjson.rewrites.push({ source, destination });
    console.log(`Added rewrite: ${source} -> ${destination}`);
  }
});

fs.writeFileSync('vercel.json', JSON.stringify(vjson, null, 2), 'utf8');
console.log('vercel.json updated!');
