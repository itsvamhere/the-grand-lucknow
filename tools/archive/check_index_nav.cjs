const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all framer-1t6aeyj-container or containers holding the top CTA button
const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
if (navMatch) {
  console.log('Nav HTML in index.html:');
  console.log(navMatch[0].substring(0, 1500));
}
