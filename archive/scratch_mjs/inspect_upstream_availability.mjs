import fs from 'fs';
const html = fs.readFileSync('upstream_boutique_n2.html', 'utf8');

// search for Check Availability or Booking in upstream
let idx = 0;
while ((idx = html.indexOf('Availability', idx)) !== -1) {
  console.log('Availability at ' + idx + ':\n' + html.substring(Math.max(0, idx - 80), Math.min(html.length, idx + 200)));
  idx += 12;
}
