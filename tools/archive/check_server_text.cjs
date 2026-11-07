const fs = require('fs');

const server = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf8');

console.log('Contains N° in server.mjs:', server.includes('N°'));
console.log('Contains Venue in server.mjs:', server.includes('Venue'));
console.log('Contains Open Earth in server.mjs:', server.includes('Open Earth'));
