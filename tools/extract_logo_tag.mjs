import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /<a[^>]*data-framer-name="Logo"[^>]*>[\s\S]*?<\/a>/g;
const match = regex.exec(html);
if (match) {
  console.log('Logo tag length:', match[0].length);
  console.log('Logo markup:\n', match[0]);
} else {
  console.log('No logo match');
}
