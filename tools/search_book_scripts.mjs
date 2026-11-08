import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

// Find all script tags in casamomo_book_page.html
const scripts = [...h.matchAll(/<script(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log('Script count:', scripts.length);

scripts.forEach((s, i) => {
  if (s.includes('calendar') || s.includes('Month') || s.includes('Arrival') || s.includes('booking') || s.includes('Booking Search')) {
    console.log(`Script ${i} matches! Length:`, s.length);
    console.log(s.slice(0, 500));
  }
});
