import fs from 'fs';
const c = fs.readFileSync('venues/venue-n2.html', 'utf8');

for (const phrase of ['Boutique', 'boutique', 'Apartment', 'apartment', '45', 'sq ft', 'guests', 'Designer']) {
  let count = 0;
  let idx = 0;
  while ((idx = c.indexOf(phrase, idx)) !== -1) {
    count++;
    if (count <= 5) {
      console.log(phrase + ' at ' + idx + ':\n' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 80)));
    }
    idx += phrase.length;
  }
  console.log(phrase + ' count: ' + count);
}
