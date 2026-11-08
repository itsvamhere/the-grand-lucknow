import fs from 'fs';

const idxHtml = fs.readFileSync('index.html', 'utf8');
const vHtml = fs.readFileSync('venues.html', 'utf8');

console.log('Index venue links:', [...idxHtml.matchAll(/href="([^"]*venues\/[^"]*)"/g)].map(m => m[1]));
console.log('Venues.html links:', [...vHtml.matchAll(/href="([^"]*venues\/[^"]*)"/g)].map(m => m[1]));
