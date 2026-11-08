import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const bIdx = h.indexOf('Booking Info');
console.log(h.slice(bIdx, bIdx + 2500));
