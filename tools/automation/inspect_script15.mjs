import fs from 'node:fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const script15 = html.match(/<script id="grand-subpage-engine-js">[\s\S]*?<\/script>/i);
if (script15) {
  console.log(script15[0]);
} else {
  console.log('Script 15 not found!');
}
