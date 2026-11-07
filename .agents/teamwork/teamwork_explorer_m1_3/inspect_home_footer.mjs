import fs from 'fs';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const start = indexHtml.indexOf('<footer');
const end = indexHtml.indexOf('</footer>', start);
const homeFooter = indexHtml.substring(start, end + 9);

// Check classes and structure
console.log('Home footer classes:', homeFooter.match(/class="([^"]*)"/)?.[1]);
console.log('Has framer-1aamxx2:', homeFooter.includes('framer-1aamxx2'));
console.log('Has framer-xj8hz2:', homeFooter.includes('framer-xj8hz2'));
console.log('Has framer-n49p1z:', homeFooter.includes('framer-n49p1z'));
console.log('Has Footer Logo:', homeFooter.includes('Footer Logo'));

// Let's see what is inside the Footer Logo in index.html
const logoMatch = homeFooter.match(/data-framer-name="Footer Logo"[^>]*>([\s\S]*?)<\/div>/);
console.log('Footer Logo snippet:', logoMatch ? logoMatch[0].substring(0, 300) : 'not found');

// Check CSS rules for footer in index.html
const styles = indexHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
const footerStyles = styles.filter(s => s.includes('framer-18na9ah') || s.includes('framer-1aamxx2') || s.includes('framer-n49p1z'));
console.log('Count of style tags containing footer classes in index.html:', footerStyles.length);
footerStyles.forEach((s, i) => {
  console.log(`Style tag ${i} snippet:`, s.substring(0, 150), '... length:', s.length);
});
