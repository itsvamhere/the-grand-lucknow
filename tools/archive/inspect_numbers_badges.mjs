import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Search for 120 and 6 in badges
const matches = [...subHtml.matchAll(/120[\s\S]{0,100}/g)];
matches.forEach((m, i) => console.log(`[Match ${i}]:`, m[0].replace(/\s+/g, ' ')));

const pMatches = [...subHtml.matchAll(/Maximum People[\s\S]{0,300}/g)];
pMatches.forEach((m, i) => console.log(`[People match ${i}]:`, m[0].replace(/\s+/g, ' ')));
