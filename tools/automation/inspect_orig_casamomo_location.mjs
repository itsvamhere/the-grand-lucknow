import fs from 'node:fs';

const html = fs.readFileSync('venues/casamomo_boutique_n1_original.html', 'utf8');

// Find Location section in original casamomo
const locIdx = html.indexOf('data-framer-name="Location"');
console.log('Original casamomo location section:');
console.log(html.slice(locIdx - 1000, locIdx + 1500));
