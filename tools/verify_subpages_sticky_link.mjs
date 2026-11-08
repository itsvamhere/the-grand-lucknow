import fs from 'fs';

const files = [
  'venues/open-earth-lawn.html',
  'venues/grassland-gala.html',
  'venues/garden-galaxy.html',
  'venues/the-grand-courtyard.html',
  'venues/the-royal-legacy-banquet.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const html = fs.readFileSync(f, 'utf8');
    const stickyIdx = html.indexOf('data-framer-name="Sticky Button"');
    const aTag = html.slice(stickyIdx, stickyIdx + 600).match(/<a[^>]+>/);
    console.log(f, '->', aTag ? aTag[0] : 'None');
  } else {
    console.log(f, 'DOES NOT EXIST');
  }
});
