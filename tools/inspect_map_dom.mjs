import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

console.log('--- Map markup around 300325 ---');
console.log(h.slice(300325 - 1000, 300325 + 500));
