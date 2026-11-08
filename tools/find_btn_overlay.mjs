import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /<div[^>]*data-framer-name="Button Overlay"[^>]*>[\s\S]*?<\/div>/g;
const match = regex.exec(html);
if (match) {
  console.log('Match found:\n', match[0].slice(0, 500));
} else {
  // Let's search for "Check Availability" inside an <a> tag
  const aMatch = html.match(/<a[^>]+>[\s\S]*?Check Availability[\s\S]*?<\/a>/);
  console.log('aMatch:', aMatch ? aMatch[0].slice(0, 300) : 'Not found');
}
