import fs from 'fs';
import path from 'path';

// 1. Create archive directories if they don't exist
const dirs = [
  'archive',
  'archive/scratch_mjs',
  'archive/scratch_png',
  'archive/scratch_json',
  'archive/upstream_html'
];
for (const d of dirs) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
}

// 2. Move loose .mjs files from root
const rootFiles = fs.readdirSync('.');
let mjsMoved = 0;
for (const f of rootFiles) {
  if (f.endsWith('.mjs') && f !== 'server.mjs') {
    fs.renameSync(f, path.join('archive/scratch_mjs', f));
    mjsMoved++;
  }
}
console.log(`Moved ${mjsMoved} loose .mjs files to archive/scratch_mjs/`);

// 3. Move loose .png files from root
let pngMoved = 0;
for (const f of rootFiles) {
  if (f.endsWith('.png')) {
    fs.renameSync(f, path.join('archive/scratch_png', f));
    pngMoved++;
  }
}
console.log(`Moved ${pngMoved} loose .png files to archive/scratch_png/`);

// 4. Move upstream HTML files and temporary HTML files from root
const htmlToMove = [
  'temp_google_map.html',
  'upstream_boutique-n1.html',
  'upstream_boutique-n2.html',
  'upstream_boutique-n3.html',
  'upstream_boutique-n4.html',
  'upstream_boutique_n2.html',
  'upstream_loft-n1.html'
];
for (const f of htmlToMove) {
  if (fs.existsSync(f)) {
    fs.renameSync(f, path.join('archive/upstream_html', f));
    console.log(`Moved ${f} to archive/upstream_html/`);
  }
}

// 5. Move loose JSON report and original backup
if (fs.existsSync('index.html.original')) {
  fs.renameSync('index.html.original', 'archive/index.html.original');
}
if (fs.existsSync('verification_report.json')) {
  fs.renameSync('verification_report.json', 'archive/scratch_json/verification_report.json');
}

console.log('Root directory cleanup completed successfully!');
