import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (!footerMatch) {
  console.log('No footer');
  process.exit(1);
}
const footer = footerMatch[0];

// Let's check for framer-xj8hz2 or Footer Logo or background-image
const logoRegex = /class="[^"]*framer-xj8hz2[^"]*"[^>]*style="([^"]*)"/g;
let match;
while ((match = logoRegex.exec(footer)) !== null) {
  console.log('Found framer-xj8hz2 style:');
  console.log(match[1].slice(0, 300));
}

// Let's check all occurrences of svg in the footer
const svgInFooter = footer.match(/data:image\/svg\+xml,[^"'\s)]+/g);
console.log('Count of data:image/svg+xml in footer:', svgInFooter ? svgInFooter.length : 0);
if (svgInFooter) {
  svgInFooter.forEach((s, i) => {
    console.log(`SVG ${i}:`, decodeURIComponent(s.slice(0, 120)));
  });
}
