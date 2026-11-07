const fs = require('fs');

const server = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/server.mjs', 'utf8');

const lines = server.split('\n');
lines.forEach((l, i) => {
  if (l.includes('N°') || l.includes('Venue')) {
    console.log(`Line ${i + 1}:`, l.trim());
  }
});
