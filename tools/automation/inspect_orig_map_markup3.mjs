import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');
const start = html.indexOf('name="Location Map"');
console.log(html.slice(start + 5000, start + 8500));
