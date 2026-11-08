import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const allImgs = [...html.matchAll(/<img[^>]+>/g)].map(m => m[0]);
console.log('Total img tags in open-earth-lawn.html:', allImgs.length);
allImgs.forEach((img, i) => {
  const src = img.match(/src="([^"]+)"/)?.[1];
  console.log(`Img ${i + 1}: src=${src}`);
});
