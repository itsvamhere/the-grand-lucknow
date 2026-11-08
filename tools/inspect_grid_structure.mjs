import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_apartments_grid_snippet.html', 'utf8');

const selStart = html.indexOf('data-framer-name="Selected Apartment"');
// Look for what follows Selected Apartment
const nextSection = html.indexOf('<div class="framer-', selStart + 100);
console.log('Next div class after Selected Apartment:', html.slice(nextSection, nextSection + 100));

// Find all occurrences of data-framer-name in section
const names = html.match(/data-framer-name="[^"]+"/g) || [];
console.log('Framer names sequence:');
names.slice(0, 15).forEach((n, i) => console.log(i, n));
