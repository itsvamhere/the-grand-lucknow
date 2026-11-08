import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of class="framer-xj8hz2"
const regex = /<div[^>]*class="[^"]*framer-xj8hz2[^"]*"[^>]*>/gi;
let match;
while ((match = regex.exec(homeHtml)) !== null) {
  console.log('Found .framer-xj8hz2:');
  console.log(match[0]);
  const endDiv = homeHtml.indexOf('</div>', match.index);
  console.log('Inner content (first 500 chars):');
  console.log(homeHtml.substring(match.index + match[0].length, endDiv));
}
