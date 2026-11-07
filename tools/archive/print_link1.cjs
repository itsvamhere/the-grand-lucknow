const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const regex = /<a[^>]*class=\"[^\"]*framer-vO7O2[^\"]*\"[^>]*>([\s\S]*?)<\/a>/;
const m = regex.exec(html);
if (m) {
  console.log('Full Link #1 HTML:');
  console.log(m[0]);
}
