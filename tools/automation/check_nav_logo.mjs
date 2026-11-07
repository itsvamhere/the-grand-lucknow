import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find navigation logo
const navIdx = html.indexOf('data-framer-name="Nav Logo"');
console.log('Nav Logo idx:', navIdx);
if (navIdx !== -1) {
  console.log(html.slice(navIdx - 200, navIdx + 600));
} else {
  // Search for navigation bar container
  const navContainer = html.indexOf('data-framer-name="Navigation"');
  console.log('Navigation idx:', navContainer);
  if (navContainer !== -1) {
    console.log(html.slice(navContainer - 200, navContainer + 800));
  }
}
