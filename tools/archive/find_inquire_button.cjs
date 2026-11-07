const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const regex = /<a[^>]*>(?:(?!<\/a>)[\s\S])*?Inquire Now[\s\S]*?<\/a>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('=== MATCH ===');
  console.log(m[0].substring(0, 500));
}
