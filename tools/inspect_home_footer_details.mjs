import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const homeFStart = homeHtml.indexOf('<footer');
const homeFEnd = homeHtml.indexOf('</footer>', homeFStart) + 9;
const exactHomeFooter = homeHtml.slice(homeFStart, homeFEnd);

console.log('Footer length:', exactHomeFooter.length);
console.log('Contains ticker / marquee:', exactHomeFooter.includes('framer-n49p1z'));
console.log('Contains xj8hz2:', exactHomeFooter.includes('framer-xj8hz2'));

// Find all SVG images or background images or text inside exactHomeFooter
const svgMatches = exactHomeFooter.match(/<svg[\s\S]*?<\/svg>/gi) || [];
console.log('SVGs count in footer:', svgMatches.length);

const imgMatches = exactHomeFooter.match(/<img[^>]*>/gi) || [];
console.log('Images count in footer:', imgMatches.length);
imgMatches.forEach(img => console.log('IMG:', img));

// Look for data-framer-name inside footer
const framerNames = exactHomeFooter.match(/data-framer-name="([^"]+)"/g) || [];
console.log('data-framer-names in footer:', framerNames.slice(0, 15));
