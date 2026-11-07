import fs from 'fs';
const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const vStart = html.indexOf('data-framer-name="Venue Lists"');
console.log('vStart:', vStart);
if (vStart !== -1) {
  const vSection = html.slice(vStart - 100, vStart + 12000);
  console.log('Venue Lists section:');
  console.log(vSection.slice(0, 3000));
}
