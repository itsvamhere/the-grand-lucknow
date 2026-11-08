import fs from 'fs';

const files = [
  'venues/open-earth-lawn.html',
  'venues/grassland-gala.html',
  'venues/garden-galaxy.html',
  'venues/the-grand-courtyard.html',
  'venues/the-royal-legacy-banquet.html'
];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const match = html.match(/<div class="framer-8m2qta" data-framer-name="Button Overlay"[\s\S]*?<a [^>]*href="([^"]+)"/);
  console.log(f, 'Sticky Link ->', match ? match[1] : 'NOT FOUND');
});
