import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== BEFORE OCCURRENCE 2 ===');
console.log(subHtml.slice(316593 - 400, 316593 + 400));

console.log('=== BEFORE OCCURRENCE 3 ===');
console.log(subHtml.slice(323325 - 400, 323325 + 400));
