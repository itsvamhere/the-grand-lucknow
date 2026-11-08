import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const start = html.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
// find the next section or footer
const end = html.indexOf('<footer', start);
console.log('Venue Lists section starts at', start, 'and next section at', end);
console.log('Length:', end - start);
fs.writeFileSync('tools/vlist_block.html', html.slice(start, end), 'utf8');
console.log('Saved to tools/vlist_block.html');
