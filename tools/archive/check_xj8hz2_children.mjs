import fs from 'fs';

const html = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html", "utf8");

// Look for xj8hz2 elements and check if they have children
const matches = [...html.matchAll(/<div[^>]*class="[^"]*framer-xj8hz2[^"]*"[^>]*>([\s\S]*?)<\/div>/g)];
console.log('Matches found:', matches.length);
matches.forEach((m, i) => {
  console.log(`Match ${i} inner content length:`, m[1].length);
  console.log(`Match ${i} inner content:`, m[1].trim());
});
