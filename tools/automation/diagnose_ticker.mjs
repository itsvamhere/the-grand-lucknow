import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const fIdx = html.indexOf('<footer');
const fHtml = html.slice(fIdx);

const cloneIdx = fHtml.indexOf('clone-item');
if (cloneIdx !== -1) {
  console.log('clone-item found:');
  console.log(fHtml.slice(cloneIdx - 50, cloneIdx + 500));
} else {
  console.log('No clone-item found!');
}
