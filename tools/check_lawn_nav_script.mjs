import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Search for any script that replaces Apartments with Venues
const matches = [];
const regex = /Apartments/g;
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(html.slice(Math.max(0, m.index - 50), m.index + 150));
}

console.log('Apartments occurrences in open-earth-lawn.html:', matches.length);
matches.forEach((m, i) => console.log(`[${i}]:\n`, m));
