const fs = require('fs');

const indexPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Replace the invalid single quotes with font-family:inherit
html = html.replace(
  "font-family:'Lay Grotesk Regular', sans-serif;",
  "font-family:inherit;"
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Fixed syntax error in index.html!');
