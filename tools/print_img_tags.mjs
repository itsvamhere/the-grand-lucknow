import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const allImgs = [...html.matchAll(/<img[^>]+>/g)].map(m => m[0]);
console.log('--- Img 1 ---');
console.log(allImgs[0]);
console.log('--- Img 7 (Map) ---');
console.log(allImgs[6]);
console.log('--- Img 8 (Card 1) ---');
console.log(allImgs[7]);
console.log('--- Img 9 (Card 2) ---');
console.log(allImgs[8]);
