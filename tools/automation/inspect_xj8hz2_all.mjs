import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html', 'utf8');

// Find all SVG markup inside .framer-xj8hz2
const regex = /<div[^>]*class="framer-xj8hz2"[^>]*>([\s\S]*?)<\/div><\/li>/g;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
  i++;
  console.log(`=== Match ${i} ===`);
  console.log(match[0].slice(0, 500));
}
