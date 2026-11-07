import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
if (!footerMatch) {
  console.log('No footer');
  process.exit(1);
}
const footer = footerMatch[0];

const svgInFooter = footer.match(/data:image\/svg\+xml,[^"'\s)]+/g);
console.log('Count of data:image/svg+xml in open-earth-lawn footer:', svgInFooter ? svgInFooter.length : 0);
if (svgInFooter) {
  svgInFooter.forEach((s, i) => {
    console.log(`SVG ${i}:`, decodeURIComponent(s.slice(0, 150)));
  });
}

const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
console.log('Header length in open-earth-lawn:', headerMatch ? headerMatch[0].length : 0);
