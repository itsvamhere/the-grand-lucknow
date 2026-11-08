import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const vListIdx = html.indexOf('data-framer-name="Venue Lists"');
console.log(html.slice(vListIdx, vListIdx + 4000));
