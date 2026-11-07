const fs = require('fs');

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const start = 830500;
const chunk = html.substring(start, start + 8000);

// Find all slug / venue definitions in this chunk
console.log(chunk.replace(/[\n\r]+/g, ' '));
