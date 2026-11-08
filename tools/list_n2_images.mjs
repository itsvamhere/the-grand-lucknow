import fs from 'fs';

const html = fs.readFileSync('venues/venue-n2.html', 'utf8');

const imgs = html.match(/src="([^"]+)"/gi) || [];
const uniqueImgs = [...new Set(imgs)];
console.log('Images in venue-n2.html:');
uniqueImgs.forEach(img => console.log(' ', img));
