import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of #bigtext-1
const matches = [...html.matchAll(/#bigtext-1[\s\S]*?\}/g)].map(m => m[0]);
console.log('Matches count:', matches.length);
matches.forEach((m, i) => console.log(`Match ${i + 1}:\n${m}\n`));
