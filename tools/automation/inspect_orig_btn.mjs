import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');

const secStart = html.indexOf('id="bigtext-1"');
console.log(html.slice(secStart + 1200, secStart + 2800));
