const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
if (navMatch) {
  const btnIdx = navMatch[0].indexOf('framer-vO7O2');
  console.log('Button area in Nav:');
  console.log(navMatch[0].substring(btnIdx - 150, btnIdx + 600));
}
