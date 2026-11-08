import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const regex = /MutationObserver[\s\S]*?<\/script>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('MutationObserver script snippet:\n', m[0].slice(0, 500));
}
