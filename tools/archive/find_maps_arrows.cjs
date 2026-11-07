const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const matches = Array.from(html.matchAll(/.{0,100}Open in Maps.{0,100}/gi)).map(m => m[0].replace(/\s+/g, ' '));
console.log('Open in Maps occurrences in index.html:', matches.length);
matches.forEach((m, i) => console.log(`[${i}]`, m));
