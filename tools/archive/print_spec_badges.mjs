import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const pos1 = subHtml.indexOf('data-framer-name="Squaremeter"');
console.log('Squaremeter snippet:\n', subHtml.slice(Math.max(0, pos1 - 200), pos1 + 800));

const pos2 = subHtml.indexOf('data-framer-name="Maximum People"');
console.log('Maximum People snippet:\n', subHtml.slice(Math.max(0, pos2 - 100), pos2 + 800));
