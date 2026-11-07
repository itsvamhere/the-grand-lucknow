import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');

// Find header or navbar container
const headerIdx = html.indexOf('<header');
console.log('Header snippet:');
console.log(html.slice(headerIdx, headerIdx + 1200));
