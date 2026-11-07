import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const matches = html.match(/class="[^"]*framer-xj8hz2[^"]*"[^>]*>/g) || [];
console.log('Total framer-xj8hz2 tags in open-earth-lawn:', matches.length);
for (const m of matches) {
  console.log(m.slice(0, 150));
}

let p = 0;
while ((p = html.indexOf('framer-xj8hz2', p)) !== -1) {
  const openTagEnd = html.indexOf('>', p);
  const closeDiv = html.indexOf('</div>', openTagEnd);
  console.log('Tag at', p, 'inner content len:', closeDiv - openTagEnd - 1);
  if (closeDiv - openTagEnd - 1 > 0) {
    console.log('Inner content:', html.slice(openTagEnd + 1, closeDiv));
  }
  p += 15;
}
