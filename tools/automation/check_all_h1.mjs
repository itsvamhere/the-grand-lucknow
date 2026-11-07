import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const h1Matches = [];
let idx = 0;
while ((idx = html.indexOf('<h1', idx)) !== -1) {
  const end = html.indexOf('</h1>', idx);
  h1Matches.push(html.slice(idx, end + 5));
  idx = end + 5;
}

console.log(`Found ${h1Matches.length} <h1> elements:`);
h1Matches.forEach((h1, i) => {
  console.log(`\n--- H1 #${i} ---`);
  console.log(h1);
});
