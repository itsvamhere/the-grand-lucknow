import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footerMatch = home.match(/<footer[\s\S]*?<\/footer>/);
const footer = footerMatch[0];

const mStart = footer.indexOf('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m"');
console.log('Mobile variant starts at:', mStart);
console.log(footer.slice(mStart, mStart + 1500));
