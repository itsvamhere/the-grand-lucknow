import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('--- open-earth-lawn.html ---');
console.log('File size:', html.length);
console.log('Has <footer:', html.includes('<footer'));
console.log('Has Footer string:', html.includes('Footer'));
console.log('Location string count:', (html.match(/Location/g) || []).length);
console.log('location lowercase count:', (html.match(/location/g) || []).length);
console.log('Open in Maps count:', (html.match(/Open in Maps/g) || []).length);
console.log('subpage-vector-map count:', (html.match(/subpage-vector-map/g) || []).length);
console.log('Living Room count:', (html.match(/Living Room/g) || []).length);
console.log('1/6 count:', (html.match(/1\/6/g) || []).length);
console.log('Other Venues count:', (html.match(/Other Venues/g) || []).length);
console.log('card_2_grassland_gala count:', (html.match(/card_2_grassland_gala/g) || []).length);
console.log('card_3_ballroom count:', (html.match(/card_3_ballroom/g) || []).length);

console.log('\n--- index.html ---');
console.log('Has <footer:', indexHtml.includes('<footer'));
const footerIdx = indexHtml.indexOf('<footer');
if (footerIdx !== -1) {
  const footerEnd = indexHtml.indexOf('</footer>', footerIdx);
  console.log('Footer snippet from index.html (first 300 chars):');
  console.log(indexHtml.substring(footerIdx, footerIdx + 300));
  console.log('Footer length in index.html:', (footerEnd !== -1 ? footerEnd + 9 - footerIdx : 'not closed'));
}
