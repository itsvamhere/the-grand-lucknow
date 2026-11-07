import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

const dStart = footer.indexOf('<div class="ssr-variant hidden-o5o8qi"');
const mStart = footer.indexOf('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m"');

const desktopHtml = footer.slice(dStart, mStart);
const mobileHtml = footer.slice(mStart);

console.log('Desktop variant length:', desktopHtml.length);
console.log('Mobile variant length:', mobileHtml.length);
