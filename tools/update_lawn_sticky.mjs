import fs from 'fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /(<div class="framer-8m2qta" data-framer-name="Button Overlay"[\s\S]*?<a class="framer-vO7O2[^"]*" data-framer-name="Large" href=")[^"]*(")/;
html = html.replace(regex, `$1/book/venue?venue=open-earth-lawn$2`);
fs.writeFileSync('venues/open-earth-lawn.html', html, 'utf8');
console.log('Updated open-earth-lawn.html sticky link');
