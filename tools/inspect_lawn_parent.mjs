import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const bodyStart = lawn.indexOf('<body');
console.log('Lawn body snippet:');
console.log(lawn.slice(bodyStart, bodyStart + 400));
