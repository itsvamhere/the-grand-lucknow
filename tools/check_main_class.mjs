import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const mainPos = lawn.indexOf('id="main"');
console.log('main tag snippet:');
console.log(lawn.slice(mainPos, mainPos + 300));
