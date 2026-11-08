import fs from 'fs';

const svg = fs.readFileSync('tools/authentic_grand_svg.svg', 'utf8');
console.log(svg);
