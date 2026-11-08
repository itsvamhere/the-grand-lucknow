import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find major sections by data-framer-name
const sections = lawn.match(/data-framer-name="([^"]+)"/g) || [];
console.log('Unique data-framer-names in open-earth-lawn.html:');
console.log([...new Set(sections)]);

// Find title and meta
const titleMatch = lawn.match(/<title>([^<]+)<\/title>/i);
console.log('\nTitle:', titleMatch ? titleMatch[1] : 'none');
