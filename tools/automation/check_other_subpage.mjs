import fs from 'fs';

const c = fs.readFileSync('venues/boutique-n1.html', 'utf8');
console.log('venues/boutique-n1.html length:', c.length);
console.log('has Sticky Header Text:', c.includes('Sticky Header Text'));
console.log('has script tags:', c.split('<script').length);
