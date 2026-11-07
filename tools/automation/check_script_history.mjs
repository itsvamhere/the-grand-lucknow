import fs from 'node:fs';

// Check scripts that generated maps
const scripts = fs.readdirSync('scripts').filter(f => f.includes('composite') || f.includes('pure_osm') || f.includes('matched') || f.includes('render') || f.includes('carto'));
console.log('Cartography scripts:', scripts);

scripts.forEach(s => {
  const stat = fs.statSync('scripts/' + s);
  console.log(`${s}: modified at ${stat.mtime}`);
});
