import fs from 'fs';

const html = fs.readFileSync('tools/casamomo_apartments_grid_snippet.html', 'utf8');

const items = html.match(/data-framer-name="Booking Item"/g) || [];
console.log('Number of Booking Items:', items.length);

const aptLinks = html.match(/href="\.\.\/apartments\/[^"]+"/g) || [];
console.log('Apartment links found:', Array.from(new Set(aptLinks)));
