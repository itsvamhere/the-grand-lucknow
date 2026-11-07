const fs = require('fs');
const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

const regex = /<a[^>]*href="([^"]*venues[^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
let m;
console.log('--- Venue links in index.html ---');
while ((m = regex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 60);
  console.log('href:', m[1], '| text:', text);
}
