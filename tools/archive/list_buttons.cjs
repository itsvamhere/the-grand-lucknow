const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const regex = /<a[^>]*class=\"[^\"]*framer-vO7O2[^\"]*\"[^>]*>([\s\S]*?)<\/a>/g;
let m;
let i = 0;
while ((m = regex.exec(html)) !== null) {
  i++;
  console.log(`=== framer-vO7O2 Link #${i} ===`);
  console.log('Opening tag:', m[0].substring(0, 150));
  console.log('Text content:', m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}
