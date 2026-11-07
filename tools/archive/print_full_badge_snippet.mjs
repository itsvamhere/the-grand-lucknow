import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const pos = subHtml.indexOf('data-framer-name="Squaremeter"');
console.log('=== HERO BADGE FULL SNIPPET ===');
console.log(subHtml.slice(Math.max(0, pos - 1500), pos + 1500));
