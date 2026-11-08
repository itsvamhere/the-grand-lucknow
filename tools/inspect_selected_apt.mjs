import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_apartments_grid_snippet.html', 'utf8');

const selStart = html.indexOf('data-framer-name="Selected Apartment"');
const selDivStart = html.lastIndexOf('<div', selStart);
const nextSection = html.indexOf('data-framer-name="Booking Item"', selStart + 30);
console.log('Selected Apartment snippet:\n', html.slice(selDivStart, selDivStart + 1500));
