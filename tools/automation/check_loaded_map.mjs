import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find all <img> tags in open-earth-lawn.html
const imgTags = html.match(/<img[^>]+>/g);
console.log('Total img tags:', imgTags ? imgTags.length : 0);
if (imgTags) {
  imgTags.forEach((img, i) => {
    if (img.includes('map') || img.includes('the_grand_lucknow')) {
      console.log(`Map img ${i}:`, img);
    }
  });
}

// Find any background-image with map
const bgMatches = html.match(/background(?:-image)?:\s*url\([^)]+\)/g);
if (bgMatches) {
  bgMatches.forEach(bg => {
    if (bg.includes('map')) {
      console.log('Map bg:', bg);
    }
  });
}
