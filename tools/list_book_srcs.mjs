import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const scriptSrcs = [...h.matchAll(/<script[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Script srcs:', scriptSrcs);
