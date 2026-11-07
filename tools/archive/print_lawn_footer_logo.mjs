import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const match = html.match(/<div[^>]*data-framer-name="Footer Logo"[\s\S]*?<\/ul>\s*<\/div>/i);
if (match) {
  console.log(match[0]);
} else {
  console.log('Not found');
}
