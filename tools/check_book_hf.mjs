import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const headStart = h.indexOf('<header');
const headEnd = h.indexOf('</header>');
console.log('Header length:', headEnd - headStart);

const footStart = h.indexOf('<footer');
const footEnd = h.indexOf('</footer>');
console.log('Footer length:', footEnd - footStart);
