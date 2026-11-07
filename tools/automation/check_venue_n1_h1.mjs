import fs from 'fs';

const c = fs.readFileSync('venues/venue-n1.html', 'utf8');
const idx = c.indexOf('Open Earth Lawn');
if (idx !== -1) {
  console.log(c.slice(idx - 100, idx + 300));
}
