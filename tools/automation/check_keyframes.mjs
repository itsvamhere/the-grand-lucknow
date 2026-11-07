import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const kfIdx = html.indexOf('grandHeroTitleEntrance');
if (kfIdx !== -1) {
  console.log(html.slice(kfIdx - 50, kfIdx + 500));
}
