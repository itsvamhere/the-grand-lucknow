import fs from 'fs';

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const h1Matches = html.match(/<h1[\s\S]*?<\/h1>/gi) || [];
console.log('H1 count in open-earth-lawn.html:', h1Matches.length);
h1Matches.forEach((h, i) => {
  console.log(`\nH1 ${i}:`);
  console.log(h);
});
