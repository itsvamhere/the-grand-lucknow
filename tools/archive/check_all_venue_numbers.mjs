import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== VENUE NUMBERS IN HOME HTML ===');
// Search for venue names and numbers in homeHtml
const venueNames = ['Open Earth Lawn', 'Grassland Gala', 'Garden Galaxy', 'Grand Ballroom', 'Royal Legacy'];
for (const v of venueNames) {
  const idx = homeHtml.indexOf(v);
  if (idx !== -1) {
    console.log(`Venue ${v} at ${idx}:`);
    console.log(homeHtml.slice(idx, idx + 300).replace(/\s+/g, ' '));
  }
}

console.log('=== VENUE NUMBERS IN OTHER VENUES SECTION OF SUBPAGE ===');
const subOtherIdx = subHtml.indexOf('Other Venues') !== -1 ? subHtml.indexOf('Other Venues') : subHtml.indexOf('Horizontal Olive');
if (subOtherIdx !== -1) {
  console.log(subHtml.slice(subOtherIdx - 100, subOtherIdx + 3000).replace(/\s+/g, ' '));
}
