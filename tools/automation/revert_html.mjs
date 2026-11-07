import fs from 'node:fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Remove the custom style tag added in the previous turn
html = html.replace(/<style id="casa-momo-location-color-harmony">[\s\S]*?<\/style>\s*/, '');

// 2. Restore chip position to left of dot (matching Casa Momo and media_1793962672297_fc726559.jpg)
html = html.replace(
  'left:18px !important; top:-14px !important; transform:translateY(-100%) !important;',
  'right:20px !important; left:auto !important; top:50% !important; transform:translateY(-50%) !important;'
);

// 3. Set cache-buster to ?v=reverted_clean
html = html.replaceAll('?v=osm_match_v4', '?v=reverted_clean');
html = html.replaceAll('?v=osm_match_v3', '?v=reverted_clean');

fs.writeFileSync('venues/open-earth-lawn.html', html);
console.log('Reverted venues/open-earth-lawn.html cleanly.');
