import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/parsed_wide_ways.json', 'utf8'));

// Find min/max lat/lon of all highways in parsed_wide_ways
let minLat = 999, maxLat = -999, minLon = 999, maxLon = -999;

data.highways.forEach(h => {
  h.coords.forEach(c => {
    if (c[0] < minLon) minLon = c[0];
    if (c[0] > maxLon) maxLon = c[0];
    if (c[1] < minLat) minLat = c[1];
    if (c[1] > maxLat) maxLat = c[1];
  });
});

console.log('All parsed ways span:');
console.log('lat:', minLat, 'to', maxLat);
console.log('lon:', minLon, 'to', maxLon);

// Now let's check what the user's Google Maps image media_1793960448682_f7d1928c.jpg covers:
// In the user's Google Maps image:
// - Gaura is visible at the top-left
// - Bindaua is near center-top
// - The Grand Lucknow is near center
// - Sardar Patel Institute of Ayurvedic Medical Sciences is near bottom
// - Ahmadpur Khalsa is near top-right
// - Kankaha is near bottom-right
