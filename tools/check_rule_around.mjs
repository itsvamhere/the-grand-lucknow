import fs from 'fs';

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
console.log(lawn.slice(333565 - 300, 333565 + 600));
