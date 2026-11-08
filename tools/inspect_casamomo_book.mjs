import fs from 'fs';

const h = fs.readFileSync('tools/casamomo_book_page.html', 'utf8');

console.log('Title:', h.match(/<title>([^<]+)<\/title>/)?.[1]);

// Search for Check Availability
const checkIdx = h.indexOf('Check Availability');
console.log('Check Availability at', checkIdx);
console.log(h.slice(checkIdx - 200, checkIdx + 400));

// Search for Arrival / Departure / Date picker / Calendar
const arrIdx = h.indexOf('ARRIVAL') !== -1 ? h.indexOf('ARRIVAL') : h.indexOf('Arrival');
console.log('Arrival at', arrIdx);
console.log(h.slice(arrIdx - 100, arrIdx + 500));

// Search for Search button
const searchIdx = h.indexOf('Search');
console.log('Search at', searchIdx);
console.log(h.slice(searchIdx - 100, searchIdx + 400));
