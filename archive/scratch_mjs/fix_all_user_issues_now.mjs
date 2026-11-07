import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('=== FIXING ALL ISSUES REPORTED BY USER ===');

// 1. UPDATE index.html
console.log('1. Updating index.html ...');
let html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

// Add DM Serif Display and Playfair Display to <head>
if (!html.includes('family=DM+Serif+Display')) {
  html = html.replace(
    '</head>',
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">\n</head>'
  );
}

// Update Logo in svg-1334768056_3843: match exact CASA MOMO bold serif typography & size
html = html.replaceAll(
  /<svg viewBox="0 0 216\.285 27" overflow="visible" id="svg-1334768056_3843">[\s\S]*?<\/svg>/g,
  `<svg viewBox="0 0 216.285 27" overflow="visible" id="svg-1334768056_3843">
  <text x="50%" y="22.5" text-anchor="middle" font-family="'DM Serif Display', 'Playfair Display', Didot, 'Bodoni MT', Georgia, serif" font-size="26" font-weight="900" letter-spacing="0.06em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`
);

// Fix giant footer marquee: ensure it says THE GRAND
html = html.replaceAll('>GRAND</text>', '>THE GRAND</text>');

// Ensure footer attribution: Built by Edifice
html = html.replaceAll('Built by Nexene', 'Built by Edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');

fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf-8');
console.log('✓ index.html updated');

// 2. UPDATE server.mjs: MIME type auto-detection for PNGs named .webp
console.log('2. Updating server.mjs MIME handling ...');
let server = fs.readFileSync(path.join(projectDir, 'server.mjs'), 'utf-8');

server = server.replace(
  `  // 3. Serve other local files if exist
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',`,
  `  // 3. Serve other local files if exist
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = MIME[ext] || 'application/octet-stream';
    if (ext === '.webp') {
      try {
        const fd = fs.openSync(filePath, 'r');
        const buf = Buffer.alloc(4);
        fs.readSync(fd, buf, 0, 4, 0);
        fs.closeSync(fd);
        if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) {
          mimeType = 'image/png';
        }
      } catch (e) {}
    }
    res.writeHead(200, {
      'Content-Type': mimeType,`
);

// Ensure swapText replaces >GRAND</text> with >THE GRAND</text>
server = server.replaceAll('>GRAND</text>', '>THE GRAND</text>');
fs.writeFileSync(path.join(projectDir, 'server.mjs'), server, 'utf-8');
console.log('✓ server.mjs updated with auto MIME detection');

// 3. UPDATE shared-lib.DganPNQZ.mjs
console.log('3. Updating shared-lib.DganPNQZ.mjs ...');
let shared = fs.readFileSync(path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs'), 'utf-8');
shared = shared.replaceAll('>GRAND</text>', '>THE GRAND</text>');
shared = shared.replaceAll('eYOd1t1bt:`Edifice`', 'eYOd1t1bt:`Edifice`');
shared = shared.replaceAll('children:`Built by`', 'children:`Built by`');
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
fs.writeFileSync(path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs'), shared, 'utf-8');
console.log('✓ shared-lib updated');

// 4. UPDATE kUR3... (About page)
console.log('4. Updating kUR3 (Pills and Locations image) ...');
let kur = fs.readFileSync(path.join(projectDir, 'scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs'), 'utf-8');

// Ensure pill 1 is N°01 and pill 2 is completely hidden/removed
kur = kur.replaceAll('children:`Venue N°7`', 'children:`N°01`');
kur = kur.replaceAll('children:`Venue N°3`', 'children:``');

// Ensure Locations image is /images/map_cutout.webp
kur = kur.replaceAll('/images/card_1_open_earth.webp', '/images/map_cutout.webp');
kur = kur.replaceAll(
  'altText:`Bright room in a The Grand venue with tall windows, parquet flooring and a wooden trestle desk`',
  'altText:`The Grand estate map location on Raibareli Road, Bindaua, Lucknow`'
);

fs.writeFileSync(path.join(projectDir, 'scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs'), kur, 'utf-8');
console.log('✓ kUR3 updated');

console.log('ALL FIXES COMPLETED!');
