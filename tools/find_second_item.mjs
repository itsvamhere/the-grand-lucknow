import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_apartments_grid_snippet.html', 'utf8');

// Find where Selected Apartment ends
const selStart = html.indexOf('data-framer-name="Selected Apartment"');
const secondItem = html.indexOf('data-framer-name="Booking Item"', selStart + 100);
console.log('Second Booking Item found at:', secondItem);
console.log('Markup leading up to second item:\n', html.slice(secondItem - 200, secondItem + 300));
