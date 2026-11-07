import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of "framer-18na9ah" and "framer-1aamxx2" in subHtml
const matches = subHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (matches) {
  console.log('Footer snippet length:', matches[0].length);
  // Check the first 1000 chars of footer
  console.log(matches[0].slice(0, 1000));
}
