import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const h1Idx = html.indexOf('<h1');
if (h1Idx !== -1) {
  console.log(html.substring(h1Idx - 50, h1Idx + 400));
}

// Also check Sticky Header Text
const stickyIdx = html.indexOf('data-framer-name="Sticky Header Text"');
if (stickyIdx !== -1) {
  console.log('\nSticky Header Text context:');
  console.log(html.substring(stickyIdx, stickyIdx + 600));
}
