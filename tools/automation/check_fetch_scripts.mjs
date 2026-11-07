import fs from 'node:fs';

['scripts/fetch_detailed_osm.mjs', 'scripts/fetch_detailed_osm2.mjs', 'scripts/fetch_wide_osm.mjs'].forEach(f => {
  if (fs.existsSync(f)) {
    console.log('--- ' + f + ' ---');
    console.log(fs.readFileSync(f, 'utf8').slice(0, 500));
  }
});
