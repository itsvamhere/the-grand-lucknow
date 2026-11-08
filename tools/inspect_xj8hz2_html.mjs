import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of framer-xj8hz2 in index.html HTML (outside of <style>)
const bodyStart = homeHtml.indexOf('<body');
const bodyHtml = homeHtml.slice(bodyStart);

const idx = bodyHtml.indexOf('framer-xj8hz2');
if (idx !== -1) {
  console.log('Snippet in body around framer-xj8hz2:');
  console.log(bodyHtml.substring(idx - 100, idx + 1500));
}
