import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const mainStart = h.indexOf('<main');
const mainEnd = h.indexOf('</main>');
console.log('Main start:', mainStart, 'end:', mainEnd);
console.log('Main snippet:');
console.log(h.slice(mainStart, mainStart + 3500));
