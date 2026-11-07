import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('=== NAVBAR IN HOME ===');
const homeNavMatch = homeHtml.match(/<header[\s\S]*?<\/header>/i);
console.log('Home header snippet:\n', homeNavMatch ? homeNavMatch[0].slice(0, 400) : 'None');

console.log('=== NAVBAR IN SUBPAGE ===');
const subNavMatch = subHtml.match(/<header[\s\S]*?<\/header>/i);
console.log('Subpage header snippet:\n', subNavMatch ? subNavMatch[0].slice(0, 400) : 'None');

// Check footer z-index in home
console.log('=== FOOTER CLASS IN HOME ===');
const homeFClass = homeHtml.match(/\.framer-18na9ah[^{]*\{[^}]*\}/g);
console.log(homeFClass);

console.log('=== FOOTER CLASS IN SUBPAGE ===');
const subFClass = subHtml.match(/\.framer-18na9ah[^{]*\{[^}]*\}/g);
console.log(subFClass);
