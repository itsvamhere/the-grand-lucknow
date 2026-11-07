import fs from 'fs';
const c = fs.readFileSync('scripts/T5PVEAy5F.D5-RUb5a.mjs', 'utf8');
console.log('length:', c.length);

// search for Boutique, Details, Apartment, etc.
for (const phrase of ['Boutique', 'Apartment', 'Venue', 'Details', 'cursor', 'altText']) {
  let idx = 0;
  while ((idx = c.indexOf(phrase, idx)) !== -1) {
    console.log(phrase + ' at ' + idx + ': ' + c.substring(Math.max(0, idx - 40), Math.min(c.length, idx + 60)));
    idx += phrase.length;
  }
}
