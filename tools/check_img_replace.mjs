import fs from 'fs';

const masterHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const galaHtml = fs.readFileSync('venues/grassland-gala.html', 'utf8');

const masterImgs = [...masterHtml.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Master images (first 10):', masterImgs);

const galaImgs = [...galaHtml.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Gala images (first 10):', galaImgs);
