import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all occurrences of the SVG in index.html
const homeSvgMatch = homeHtml.match(/data:image\/svg\+xml,[^"'\)]+/g) || [];
console.log('Home SVG data URIs count:', homeSvgMatch.length);
homeSvgMatch.forEach((s, idx) => {
  const decoded = decodeURIComponent(s);
  if (decoded.includes('GRAND') || decoded.includes('path') || decoded.includes('viewBox')) {
    console.log(`\n--- Home SVG ${idx} ---`);
    console.log(decoded.slice(0, 300));
  }
});

// Find in subpage
const subSvgMatch = subHtml.match(/data:image\/svg\+xml,[^"'\)]+/g) || [];
console.log('\nSub SVG data URIs count:', subSvgMatch.length);
subSvgMatch.forEach((s, idx) => {
  const decoded = decodeURIComponent(s);
  if (decoded.includes('GRAND') || decoded.includes('path') || decoded.includes('viewBox')) {
    console.log(`\n--- Sub SVG ${idx} ---`);
    console.log(decoded.slice(0, 300));
  }
});
