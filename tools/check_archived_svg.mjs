import fs from 'fs';

const svg = fs.readFileSync('tools/archive/the_grand_footer_desktop.svg', 'utf8');
console.log('SVG length:', svg.length);
console.log('Snippet:', svg.slice(0, 500));
