import fs from 'fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /(<div class="framer-8m2qta" data-framer-name="Button Overlay"[\s\S]*?<a class="framer-vO7O2[^"]*" data-framer-name="Large" href=")[^"]*(")/;
const match = html.match(regex);
console.log('Match found:', !!match);
if (match) {
  console.log('Snippet before replacement:\n', match[0]);
  const replaced = html.replace(regex, `$1/book/venue?venue=test-slug$2`);
  const matchAfter = replaced.match(regex);
  console.log('Snippet after replacement:\n', matchAfter[0]);
}
