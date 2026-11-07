import fs from 'fs';

const home = fs.readFileSync('index.html', 'utf8');
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

const dStart = footer.indexOf('<div class="ssr-variant hidden-o5o8qi"');
const mStart = footer.indexOf('<div class="ssr-variant hidden-72rtr7 hidden-p8zd8m"');

let desktopHtml = footer.slice(dStart, mStart);
let mobileHtml = footer.slice(mStart);

console.log('Mobile ends with:', mobileHtml.slice(-100));
if (mobileHtml.endsWith('</footer>')) {
  mobileHtml = mobileHtml.slice(0, -('</footer>'.length));
}

console.log('Desktop length:', desktopHtml.length);
console.log('Mobile length:', mobileHtml.length);
