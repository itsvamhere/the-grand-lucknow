import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const stickyIdx = html.indexOf('Sticky Button');
console.log('Sticky button section:\n', html.slice(stickyIdx - 100, stickyIdx + 600));
