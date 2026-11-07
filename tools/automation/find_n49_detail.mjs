import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');

console.log('=== OCCURRENCE 1 (around 741455) ===');
console.log(html.slice(741455, 741455 + 1500));

console.log('=== OCCURRENCE 2 (around 796351) ===');
console.log(html.slice(796351, 796351 + 1500));
