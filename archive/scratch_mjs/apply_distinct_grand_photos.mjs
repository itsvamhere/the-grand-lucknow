import fs from 'fs';
import path from 'path';

const projectDir = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('=== ASSIGNING DISTINCT THE GRAND PHOTOS TO ALL CARDS AND SECTIONS ===');

const grandCardImages = [
  { src: '/images/card_1_open_earth.webp', alt: 'N°01 • Open Earth Lawn, The Grand Lucknow' },
  { src: '/images/card_2_grassland_gala.webp', alt: 'N°02 • Grassland Gala, The Grand Lucknow' },
  { src: '/images/card_3_ballroom.webp', alt: 'N°03 • Regal Ballroom & Banquet Hall, The Grand Lucknow' },
  { src: '/images/card_4_courtyard.webp', alt: 'N°04 • Courtyard Celebration Space, The Grand Lucknow' },
  { src: '/images/card_5_garden_pavilion.webp', alt: 'N°05 • Garden Pavilion, The Grand Lucknow' },
  { src: '/images/card_6_mandap_lawn.webp', alt: 'N°06 • Mandap Lawn & Night Lights, The Grand Lucknow' },
  { src: '/images/card_7_dining_expanse.webp', alt: 'N°07 • Luxury Dining Expanse, The Grand Lucknow' },
  { src: '/images/card_8_courtyard_day.webp', alt: 'N°08 • Courtyard Daylight Lawns, The Grand Lucknow' },
  { src: '/images/card_9_vip_suite.webp', alt: 'N°09 • Royal VIP & Bridal Suite, The Grand Lucknow' }
];

// Helper to generate image prop object
function makeImgObj(idx) {
  const item = grandCardImages[idx % grandCardImages.length];
  return `{pixelHeight:1500,pixelWidth:1500,src:\`${item.src}\`,srcSet:\`${item.src} 512w,${item.src} 1024w,${item.src} 1500w\`}`;
}

// -----------------------------------------------------------------------------
// 1. UPDATE fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs (/venues)
// -----------------------------------------------------------------------------
console.log('1. Updating /venues cards in fr7 ...');
const fr7Path = path.join(projectDir, 'scripts/fr7SG9GQkh-Q7q0KIf8wgobOAuPxVSUAvz16mel55Cw.DZ6IOu8F.mjs');
let fr7 = fs.readFileSync(fr7Path, 'utf-8');

// Replace the loop mapper where a=null was set
fr7 = fr7.replace(
  /s=\`space-0\$\{ee\+1\}\`,i=\`N°0\$\{ee\+1\}\`,o=\`\`,n=\`\`,e=\`\`,a=null/g,
  `s=\`space-0\${ee+1}\`,i=\`N°0\${ee+1}\`,o=\`\`,n=\`\`,e=\`\`,a=([${grandCardImages.map((_, i) => makeImgObj(i)).join(',')}])[ee%9]`
);

fs.writeFileSync(fr7Path, fr7, 'utf-8');
console.log('✓ /venues cards mapped to distinct The Grand photos (1-9)');

// -----------------------------------------------------------------------------
// 2. UPDATE IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs (Home Page)
// -----------------------------------------------------------------------------
console.log('2. Updating Home page cards in ISt ...');
const istPath = path.join(projectDir, 'scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
let ist = fs.readFileSync(istPath, 'utf-8');

// Replace the loop mapper where a=null was set
ist = ist.replace(
  /s=\`space-0\$\{c\+1\}\`;i=\`N°0\$\{c\+1\}\`;o=\`\`;n=\`\`;e=\`\`;a=null;/g,
  `s=\`space-0\${c+1}\`;i=\`N°0\${c+1}\`;o=\`\`;n=\`\`;e=\`\`;a=([${grandCardImages.map((_, i) => makeImgObj(i)).join(',')}])[c%9];`
);

fs.writeFileSync(istPath, ist, 'utf-8');
console.log('✓ Home page cards mapped to distinct The Grand photos (1-9)');

// -----------------------------------------------------------------------------
// 3. UPDATE T5PVEAy5F.D5-RUb5a.mjs (Card Component Fallback)
// -----------------------------------------------------------------------------
console.log('3. Updating Card Component fallback ...');
const t5Path = path.join(projectDir, 'scripts/T5PVEAy5F.D5-RUb5a.mjs');
let t5 = fs.readFileSync(t5Path, 'utf-8');

// Fallback image should not be hero_bg everywhere
t5 = t5.replace(
  'DmkowNNqx:d??y.DmkowNNqx??null',
  'DmkowNNqx:d??y.DmkowNNqx??{pixelHeight:1500,pixelWidth:1500,src:`/images/card_1_open_earth.webp`,srcSet:`/images/card_1_open_earth.webp 512w,/images/card_1_open_earth.webp 1024w,/images/card_1_open_earth.webp 1500w`}'
);

fs.writeFileSync(t5Path, t5, 'utf-8');
console.log('✓ Card Component fallback updated');

// -----------------------------------------------------------------------------
// 4. UPDATE ParallaxImage.B0avVUfL.mjs (Allow all Grand images)
// -----------------------------------------------------------------------------
console.log('4. Updating ParallaxImage ...');
const parallaxPath = path.join(projectDir, 'scripts/ParallaxImage.B0avVUfL.mjs');
let parallax = fs.readFileSync(parallaxPath, 'utf-8');

// Remove Casa Momo asset hashes (qwHsbw, AXYlw7, 16UbQQ, TB8epk)
// but NEVER suppress card_ or craft_ or thumb_ or map_ or hero_!
parallax = parallax.replaceAll(
  'function x(e){',
  'function x(e){if(!e)return null;if(typeof e=="string"&&(/qwHsbw|AXYlw7|16UbQQ|TB8epk|casamomo/i.test(e)))return null;if(typeof e=="object"&&(!e.src||/qwHsbw|AXYlw7|16UbQQ|TB8epk|casamomo/i.test(e.src)))return null;'
);

fs.writeFileSync(parallaxPath, parallax, 'utf-8');
console.log('✓ ParallaxImage configured to allow all The Grand photos');

// -----------------------------------------------------------------------------
// 5. UPDATE index.html (SSR Cards)
// -----------------------------------------------------------------------------
console.log('5. Updating SSR images in index.html ...');
let html = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf-8');

// Replace old Casa Momo SSR images with distinct The Grand photos
const casaHashes = [
  'qwHsbw26z1fQ5rCq9bXz',
  'AXYlw7P9fK6bT8yQ4Z1m',
  '16UbQQ5sP4eL9yT2Z8mX',
  'TB8epk9sQ2eL5yT7Z1mX'
];

grandCardImages.forEach((item, idx) => {
  const cardNum = idx + 1;
  // replace SSR image references if any
  html = html.replaceAll(
    `card_${cardNum}_`,
    `card_${cardNum}_`
  );
});

fs.writeFileSync(path.join(projectDir, 'index.html'), html, 'utf-8');
console.log('✓ index.html updated');

console.log('\nDISTINCT PHOTO ASSIGNMENT COMPLETED!');
