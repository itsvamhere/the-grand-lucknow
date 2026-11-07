import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const pos = 371538;
console.log('=== SUBPAGE FOOTER LINK VENUES ===');
console.log(subHtml.slice(pos, pos + 2500));
