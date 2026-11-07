import fs from 'fs';
const c = fs.readFileSync('scripts/Booking.DRu38j-Y.mjs', 'utf8');
console.log('Booking length:', c.length);

// search for key terms in Booking
for (const phrase of ['Check Availability', 'Stripe', 'euro', '€', 'night', 'stay', 'guest', 'calendar', 'Arrival', 'Departure', 'Boutique', 'price']) {
  let count = 0;
  let idx = 0;
  while ((idx = c.toLowerCase().indexOf(phrase.toLowerCase(), idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(phrase + ' at ' + idx + ': ' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 80)));
    }
    idx += phrase.length;
  }
  console.log(phrase + ' count:', count);
}
