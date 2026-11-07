import fs from 'fs';
const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of 55,000 or Grassland or Galaxy in venues/open-earth-lawn.html
const matches = ['55,000', 'Grassland', 'Garden Galaxy', 'The Royal Legacy', 'Check Availability'];
for (const m of matches) {
  let idx = 0;
  while ((idx = html.indexOf(m, idx)) !== null && idx !== -1) {
    console.log(`Found "${m}" at ${idx}:`);
    console.log(html.slice(Math.max(0, idx - 150), Math.min(html.length, idx + 250)));
    console.log('----------------');
    idx += m.length;
  }
}
