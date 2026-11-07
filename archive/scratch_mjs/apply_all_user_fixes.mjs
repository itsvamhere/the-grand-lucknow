import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('=== APPLYING ALL USER-REQUESTED FIXES ===');

// -----------------------------------------------------------------------------
// 1. FIX GIANT FOOTER TEXT: "GRAND" -> "THE GRAND"
// -----------------------------------------------------------------------------
console.log('\n--- 1. Fixing Giant Footer Text to THE GRAND ---');
const sharedPath = path.join(projectDir, 'scripts/shared-lib.DganPNQZ.mjs');
let shared = fs.readFileSync(sharedPath, 'utf-8');

// Replace >GRAND</text> with >THE GRAND</text>
shared = shared.replaceAll('>GRAND</text>', '>THE GRAND</text>');
// Adjust x coordinates if needed or font size so THE GRAND spans gracefully
shared = shared.replaceAll(
  'font-family="\'Lay Grotesk Regular\', sans-serif" font-size="260" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>',
  'font-family="\'Lay Grotesk Regular\', sans-serif" font-size="230" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>'
);

// Ensure footer attribution: Built by Edifice
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
shared = shared.replaceAll('eYOd1t1bt:`Edifice`', 'eYOd1t1bt:`Edifice`');
shared = shared.replaceAll('children:`Built by`', 'children:`Built by`');
shared = shared.replaceAll('children:`Edifice`', 'children:`Edifice`');

fs.writeFileSync(sharedPath, shared, 'utf-8');
console.log('✓ Updated shared-lib with THE GRAND marquee & Built by Edifice');

// Update index.html giant footer text & attribution
const indexPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');
html = html.replaceAll('>GRAND</text>', '>THE GRAND</text>');
html = html.replaceAll('Built by Nexene', 'Built by Edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
html = html.replaceAll('https://elvar.in/edifice', 'https://elvar.in/edifice');
fs.writeFileSync(indexPath, html, 'utf-8');
console.log('✓ Updated index.html with THE GRAND marquee & Built by Edifice');

// -----------------------------------------------------------------------------
// 2. REMOVE 2ND PILL & NORMALIZE IN kUR3 (About Page)
// -----------------------------------------------------------------------------
console.log('\n--- 2. Removing duplicate 2nd pill & fixing Location in kUR3 ---');
const kurPath = path.join(projectDir, 'scripts/kUR3CfpW9NIyRzidNwuOKmKl470PoGVqflldEj15ME4.Sg5Y4YBO.mjs');
let kur = fs.readFileSync(kurPath, 'utf-8');

// Change pill from "Venue N°7" to "N°01"
kur = kur.replaceAll('children:`Venue N°7`', 'children:`N°01`');
kur = kur.replaceAll('children:`Venue N°3`', 'children:``'); // clear 2nd pill text

// Hide the second pill div
kur = kur.replaceAll(
  'className:`framer-1q2r93m`,"data-framer-name":`Text`',
  'className:`framer-1q2r93m`,"data-framer-name":`Text`,style:{display:`none`}'
);

// -----------------------------------------------------------------------------
// 3. FIX BLANK LOCATION IMAGE IN kUR3 (Use Google Maps Cutout)
// -----------------------------------------------------------------------------
console.log('\n--- 3. Fixing blank Location image in kUR3 ---');
// In kUR3, Gv5LQ5HQ0 is the Locations image
kur = kur.replaceAll(
  '/images/card_1_open_earth.webp',
  '/images/map_cutout.webp'
);
kur = kur.replaceAll(
  'altText:`Bright room in a The Grand venue with tall windows, parquet flooring and a wooden trestle desk`',
  'altText:`The Grand estate map location on Raibareli Road, Bindaua, Lucknow`'
);

fs.writeFileSync(kurPath, kur, 'utf-8');
console.log('✓ kUR3 updated: single pill "N°01", second pill removed, Location image set to map_cutout.webp');

// -----------------------------------------------------------------------------
// 4. ENSURE ParallaxImage DOES NOT SUPPRESS map_cutout.webp
// -----------------------------------------------------------------------------
console.log('\n--- 4. Updating ParallaxImage filter ---');
const parallaxPath = path.join(projectDir, 'scripts/ParallaxImage.B0avVUfL.mjs');
let parallax = fs.readFileSync(parallaxPath, 'utf-8');

// Only suppress Casa Momo card interior photos (qwHsbw|AXYlw7|16UbQQ|TB8epk), NEVER suppress map_cutout or logo
parallax = parallax.replaceAll(
  'function x(e){',
  'function x(e){if(!e)return null;if(typeof e=="string"&&(/qwHsbw|AXYlw7|16UbQQ|TB8epk|casamomo/i.test(e)))return null;if(typeof e=="object"&&(!e.src||/qwHsbw|AXYlw7|16UbQQ|TB8epk|casamomo/i.test(e.src)))return null;'
);
fs.writeFileSync(parallaxPath, parallax, 'utf-8');
console.log('✓ ParallaxImage filter updated (map_cutout is allowed)');

// -----------------------------------------------------------------------------
// 5. UPDATE server.mjs swapText
// -----------------------------------------------------------------------------
console.log('\n--- 5. Updating server.mjs swapText ---');
const serverPath = path.join(projectDir, 'server.mjs');
let server = fs.readFileSync(serverPath, 'utf-8');

// Ensure server swapText replaces >GRAND</text> with >THE GRAND</text>
server = server.replaceAll('>GRAND</text>', '>THE GRAND</text>');
server = server.replaceAll('Venue N°7', 'N°01');
server = server.replaceAll('Venue N°3', 'N°01');

fs.writeFileSync(serverPath, server, 'utf-8');
console.log('✓ server.mjs updated');

console.log('\nAll user-requested fixes applied successfully!');
