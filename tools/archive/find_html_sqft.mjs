import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Find the first occurrence of Sqft in the HTML body (not style)
let pos = 0;
while ((pos = subHtml.indexOf('Sqft', pos)) !== -1) {
  // check if inside style
  const lastStyleOpen = subHtml.lastIndexOf('<style', pos);
  const lastStyleClose = subHtml.lastIndexOf('</style>', pos);
  if (lastStyleClose > lastStyleOpen) {
    console.log(`Sqft found in HTML at pos ${pos}:`);
    console.log(subHtml.slice(Math.max(0, pos - 150), pos + 150));
    console.log('---');
  }
  pos += 4;
}
