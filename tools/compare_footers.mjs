import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const homeFStart = homeHtml.indexOf('<footer');
const homeFEnd = homeHtml.indexOf('</footer>', homeFStart) + 9;
const homeFooter = homeHtml.slice(homeFStart, homeFEnd);

const subFStart = subHtml.indexOf('<footer');
const subFEnd = subHtml.indexOf('</footer>', subFStart) + 9;
const subFooter = subHtml.slice(subFStart, subFEnd);

console.log('Home footer has ticker ul:', homeFooter.includes('<ul'));
console.log('Sub footer has ticker ul:', subFooter.includes('<ul'));

// What is inside framer-n49p1z in homeFooter vs subFooter?
const homeN4 = homeFooter.match(/<div[^>]*class="[^"]*framer-n49p1z[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/i);
const subN4 = subFooter.match(/<div[^>]*class="[^"]*framer-n49p1z[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/i);

console.log('Home framer-n49p1z length:', homeN4 ? homeN4[0].length : 0);
console.log('Sub framer-n49p1z length:', subN4 ? subN4[0].length : 0);

if (homeN4) {
  console.log('\n--- HOME framer-n49p1z sample (first 1000 chars) ---');
  console.log(homeN4[0].slice(0, 1000));
}

if (subN4) {
  console.log('\n--- SUB framer-n49p1z sample (first 1000 chars) ---');
  console.log(subN4[0].slice(0, 1000));
}
