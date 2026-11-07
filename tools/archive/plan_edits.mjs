import fs from 'fs';

const c = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- 1. Gallery ---');
// Let's find the start and end of gallery slides
const galStart = c.indexOf('CVXtCf6tZR6dJm2eWWVQtlAQ');
const galEnd = c.indexOf('jucoMWZeVI2eh02fLXEfvUJsSg');
console.log('Gallery range:', galStart, 'to', galEnd);

console.log('--- 2. Location section ---');
const locStart = c.indexOf('id="bigtext-1"');
console.log('Location start at:', locStart);

console.log('--- 3. Map pointer ---');
const mapPtr = c.indexOf('id="grand-live-pointer"');
console.log('Map pointer at:', mapPtr);

console.log('--- 4. Other Venues Card 1 & Card 2 ---');
const card1Img = c.indexOf('fill=\'%23141a15\'');
const card2Img = c.indexOf('UayMv2I16UbQQBQkbI90HsJMv5o');
console.log('Card 1 image at:', card1Img);
console.log('Card 2 image at:', card2Img);

console.log('--- 5. Footer and footer styles ---');
const footerStylesStart = c.indexOf('id="universal-grand-footer-styles"');
const footerTagStart = c.indexOf('<footer class="framer-18na9ah" data-framer-name="Footer">');
const footerTagEnd = c.indexOf('</footer>', footerTagStart);
const footerScriptEnd = c.indexOf('</script>', footerTagEnd);
console.log('Footer styles at:', footerStylesStart);
console.log('Footer tag at:', footerTagStart, 'to', footerTagEnd);
console.log('Footer script ends at:', footerScriptEnd);
