import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const xjMatches = [...subHtml.matchAll(/\.framer-xj8hz2[^{]*\{[^}]*\}/g)];
console.log('framer-xj8hz2 rules:');
xjMatches.forEach(m => console.log(m[0]));
