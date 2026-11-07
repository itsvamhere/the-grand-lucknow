import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

const targets = [
  'card_1_',
  'card_2_',
  'Venue N°',
  'Loft N°',
  'Garden N°',
  'Urban N°',
  "Hi, I'm",
  'kitchenware',
  'head and heart',
  'We believe',
  'as your own home',
  'Schönaugasse'
];

for (const t of targets) {
  let count = 0;
  let idx = 0;
  while ((idx = html.indexOf(t, idx)) !== -1) {
    count++;
    idx += t.length;
  }
  console.log(t + ': ' + count);
}
