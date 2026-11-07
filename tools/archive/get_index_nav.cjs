const fs = require('fs');

const indexHtml = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find nav in index.html
const nav = indexHtml.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
if (nav) {
  console.log('Nav HTML in index.html:');
  console.log(nav[0]);
} else {
  console.log('No nav in index.html');
}
