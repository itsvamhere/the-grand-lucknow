import fs from 'fs';

const ea8 = fs.readFileSync('scripts/ea8VEhypONL-CowtP6L2FMQ7YAMcB94GVI5vwrKH0aI.DIy8bvsL.mjs', 'utf8');
console.log('ea8 length:', ea8.length);

// search for key terms in ea8
for (const word of ['Booking', 'Location', 'Apartment', 'Venue', 'Boutique', 'price', 'calendar', 'photo', 'gallery']) {
  let count = 0;
  let idx = 0;
  while ((idx = ea8.toLowerCase().indexOf(word.toLowerCase(), idx)) !== -1) {
    count++;
    idx += word.length;
  }
  console.log(word + ' count in ea8:', count);
}
