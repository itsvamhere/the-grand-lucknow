import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find category/number tag (e.g. Venue N°1)
const matches = [...html.matchAll(/(Venue|Boutique|Loft|Garden|Urban)[^<]*?N°\d+/gi)].map(m => m[0]);
console.log('Category matches in open-earth-lawn:', matches);

// Find pills around hero (Size, Guests)
const heroIdx = html.indexOf('grand-hero-word');
console.log(html.slice(heroIdx - 500, heroIdx + 1500));
