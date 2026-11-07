import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const pos = 292337;
console.log('Location section full markup:\n', subHtml.slice(pos - 1000, pos + 1000));
