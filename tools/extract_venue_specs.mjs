import fs from 'fs';

const venuesHtml = fs.readFileSync('venues.html', 'utf8');

// Find all cards or links in venues.html
const venueList = [
  'grassland-gala',
  'grand-ballroom',
  'the-courtyard',
  'garden-pavilion',
  'north-mandap',
  'dining-expanse',
  'vip-atrium',
  'bridal-suite'
];

venueList.forEach(v => {
  const idx = venuesHtml.indexOf(v);
  if (idx !== -1) {
    console.log(`\n=================== ${v} ===================`);
    console.log(venuesHtml.substring(Math.max(0, idx - 400), Math.min(venuesHtml.length, idx + 800)));
  } else {
    console.log(`Venue ${v} not found in venues.html`);
  }
});
