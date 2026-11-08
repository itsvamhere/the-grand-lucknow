import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');
const p1 = idx.indexOf('id="svg870196829_4253"');
const sStart = idx.lastIndexOf('<svg', p1);
const sEnd = idx.indexOf('</svg>', p1) + 6;
console.log('index.html svg870196829_4253:');
console.log(idx.slice(sStart, sEnd));

const lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const p2 = lawn.indexOf('id="svg870196829_4253"');
if (p2 !== -1) {
  const lsStart = lawn.lastIndexOf('<svg', p2);
  const lsEnd = lawn.indexOf('</svg>', p2) + 6;
  console.log('lawn svg870196829_4253:');
  console.log(lawn.slice(lsStart, lsEnd));
} else {
  console.log('svg870196829_4253 not found in lawn!');
}
