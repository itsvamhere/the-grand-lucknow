const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
if (navMatch) {
  console.log('Nav HTML (part 2):');
  console.log(navMatch[0].substring(1500, 3500));
}
