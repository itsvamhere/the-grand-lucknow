import fs from 'fs';

const c1 = fs.readFileSync('venues/venue-n1.html', 'utf8');
console.log('venue-n1.html includes Open Earth Lawn:', c1.includes('Open Earth Lawn'));
const c2 = fs.readFileSync('venues/boutique-n1.html', 'utf8');
console.log('boutique-n1.html includes Open Earth Lawn:', c2.includes('Open Earth Lawn'));
