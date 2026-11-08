import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const matches = [];
let pos = 0;
while (true) {
  const idx = html.indexOf('Check Availability', pos);
  if (idx === -1) break;
  matches.push(idx);
  pos = idx + 1;
}

console.log('Occurrences of Check Availability:', matches.length);
matches.forEach((idx, i) => {
  console.log(`[${i}] at ${idx}:`);
  console.log(html.slice(Math.max(0, idx - 100), idx + 200));
});
