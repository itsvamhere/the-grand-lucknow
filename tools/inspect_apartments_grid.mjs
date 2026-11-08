import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const gIdx = h.indexOf('Apartments Grid');
console.log(h.slice(gIdx + 7000, gIdx + 11000));
