import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const subFooterMatch = subHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (subFooterMatch) {
  const footerContent = subFooterMatch[0];
  const vIdx = footerContent.indexOf('Venues');
  console.log('=== FULL LINK FOR VENUES IN SUBPAGE FOOTER ===');
  console.log(footerContent.slice(vIdx - 300, vIdx + 1000));
}
