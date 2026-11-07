import fs from 'fs';

const html = fs.readFileSync("C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html", "utf8");

// Search for the DOM elements that have framer-xj8hz2 in markup (not in style tags)
const bodyStart = html.indexOf('<body');
const bodyHtml = html.slice(bodyStart);

const matches = [...bodyHtml.matchAll(/<div[^>]*framer-xj8hz2[^>]*>/g)];
console.log('Matches in body:', matches.length);
matches.forEach((m, i) => {
  const start = bodyHtml.indexOf(m[0]);
  console.log(`\n--- Element ${i} ---`);
  console.log(bodyHtml.slice(start, start + 600));
});
