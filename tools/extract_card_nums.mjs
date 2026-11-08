import fs from 'fs';

const h = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of 25,000, 20,000, 15,000, 10,000 or numbers in index.html
const matches = h.match(/(?:25,000|20,000|15,000|10,000|2,500|1,500|800|600|300|250)/g);
console.log('Matches in index.html:', matches);
