import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const modalIdx = html.indexOf('bookingModal');
console.log('bookingModal found at:', modalIdx);
console.log(html.slice(modalIdx - 150, modalIdx + 500));
