import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const sIdx = h.indexOf('Booking Search');
console.log('--- Booking Search block (5000 chars) ---');
console.log(h.slice(sIdx - 100, sIdx + 5000));
