import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

const mainStart = h.indexOf('<main');
const mainEnd = h.indexOf('</main>');
const main = h.slice(mainStart, mainEnd + 7);

// Find all sections or major blocks inside main
const sections = [...main.matchAll(/<section[^>]*data-framer-name="([^"]*)"/g)].map(m => m[1]);
console.log('Sections inside Main:', sections);

// Search for calendar / date picker
console.log('Has calendar markup:', main.includes('calendar') || main.includes('November') || main.includes('December') || main.includes('aria-haspopup'));

// Inspect the Booking Search code
const searchIdx = main.indexOf('Booking Search');
console.log('--- Booking Search block (first 2500 chars) ---');
console.log(main.slice(searchIdx, searchIdx + 2500));
