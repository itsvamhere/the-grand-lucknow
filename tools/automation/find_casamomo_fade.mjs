import fs from 'node:fs';

const html = fs.readFileSync('upstream_boutique-n1.html', 'utf8');

// Find style or script around bigtext-1 or Location section
const idx = html.indexOf('id="bigtext-1"');
console.log('upstream bigtext-1 snippet:');
console.log(html.slice(idx - 300, idx + 1200));

// Also search for gradients in upstream
const gradients = [...html.matchAll(/linear-gradient[^;)]+/g)].map(m => m[0]);
console.log('Sample linear-gradients in upstream:');
console.log(gradients.slice(0, 10));
