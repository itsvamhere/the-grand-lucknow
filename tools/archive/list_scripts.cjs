const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const scriptMatches = Array.from(html.matchAll(/<script[^>]*id="([^"]*)"[^>]*>/gi)).map(m => m[1]);
console.log('Script IDs in index.html:', scriptMatches);
