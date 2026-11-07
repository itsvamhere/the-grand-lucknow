import fs from 'node:fs';

const data = JSON.parse(fs.readFileSync('scripts/parsed_wide_ways.json', 'utf8'));
console.log('Total waters:', data.waters.length);

data.waters.forEach((w, idx) => {
  const name = w.tags.name || w.tags['name:en'] || '(unnamed)';
  const nat = w.tags.natural || '';
  const water = w.tags.water || '';
  const ww = w.tags.waterway || '';
  console.log(`${idx+1}. [${nat || ww || water}] "${name}" coords: ${w.coords.length}`);
});
