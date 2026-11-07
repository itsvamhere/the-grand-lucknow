import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const pMatches = subHtml.match(/\.framer-zHQwT\.framer-1aamxx2[^{]*\{[^}]*\}/g);
console.log('framer-1aamxx2 in subpage:', pMatches);
