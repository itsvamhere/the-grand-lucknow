import fs from 'fs';

const idx = fs.readFileSync('index.html', 'utf8');

const matches = [...idx.matchAll(/data-framer-name="Venue Item"/g)];
console.log('Matches:', matches.length);
matches.forEach((m, i) => {
  console.log(`Match ${i + 1} at pos ${m.index}:`);
  console.log(idx.slice(m.index, m.index + 200));
});
