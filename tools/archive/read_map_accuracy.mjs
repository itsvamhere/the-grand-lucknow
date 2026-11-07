import fs from 'fs';

console.log('=== apply_curated_map.mjs ===');
if (fs.existsSync('tools/apply_curated_map.mjs')) {
  console.log(fs.readFileSync('tools/apply_curated_map.mjs', 'utf8').slice(0, 1000));
}

console.log('=== apply_google_maps_accuracy.mjs ===');
if (fs.existsSync('tools/apply_google_maps_accuracy.mjs')) {
  console.log(fs.readFileSync('tools/apply_google_maps_accuracy.mjs', 'utf8').slice(0, 1000));
}
