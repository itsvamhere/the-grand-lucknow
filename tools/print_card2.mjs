import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const vListIdx = html.indexOf('data-framer-name="Venue Lists"');
const vList = html.slice(vListIdx, vListIdx + 12000);
const secondCardIdx = vList.indexOf('Garden Galaxy');
console.log('Second card snippet:\n', vList.slice(secondCardIdx - 500, secondCardIdx + 2000));
