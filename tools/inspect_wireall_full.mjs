import fs from 'fs';

const h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const wIdx = h.indexOf('function wireAll');
console.log(h.slice(wIdx, wIdx + 2500));
