import fs from 'fs';

const c = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- CARD 1 Title & Rest ---');
console.log(c.slice(323000, 325500));

console.log('--- CARD 2 Title & Rest ---');
console.log(c.slice(333500, 335500));
