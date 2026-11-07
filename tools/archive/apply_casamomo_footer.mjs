import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Read the exact casamomo footer SVG
const exactSvg = fs.readFileSync(path.join(root, 'tools', 'casamomo_footer_decoded.svg'), 'utf8').trim();
const exactBgImg = fs.readFileSync(path.join(root, 'tools', 'casamomo_footer_bg_image.txt'), 'utf8').trim();

console.log('Exact SVG length:', exactSvg.length);
console.log('Exact bg image length:', exactBgImg.length);

// 1. Update scripts/shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(root, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

// Replace the <text ...>THE GRAND</text> in desktop footer logo
const desktopTargetRegex = /svg:`<svg[^>]+viewBox="0 0 2404\.809 300\.206"[^>]*><text[^>]*>THE GRAND<\/text><\/svg>`/;
if (desktopTargetRegex.test(sharedLib)) {
  sharedLib = sharedLib.replace(desktopTargetRegex, 'svg:`' + exactSvg + '`');
  console.log('Replaced desktop footer SVG in shared-lib.DganPNQZ.mjs');
} else {
  console.log('Could not find desktopTargetRegex in shared-lib');
}

// For mobile variant: generate scaled 0.5 SVG
// Or use exactSvg with viewBox 0 0 2404.809 300.206 (SVG scales automatically!)
const mobileTargetRegex = /svg:`<svg[^>]+viewBox="0 0 1202\.351 150\.096"[^>]*><text[^>]*>THE GRAND<\/text><\/svg>`/;
if (mobileTargetRegex.test(sharedLib)) {
  sharedLib = sharedLib.replace(mobileTargetRegex, 'svg:`' + exactSvg + '`');
  console.log('Replaced mobile footer SVG in shared-lib.DganPNQZ.mjs');
}

// In shared-lib, also remove the transparent children that were overlapping, or keep them if transparent
fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');

// 2. Update all HTML files: replace any data:image/svg+xml with THE GRAND <text> in framer-xj8hz2
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let htmlUpdated = 0;

for (const file of files) {
  const filePath = path.join(root, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Search for the broken background-image:url('data:image/svg+xml,...THE%20GRAND...')
  const brokenBgRegex = /background-image:\s*url\(['"]data:image\/svg\+xml,[^'"]*THE%20GRAND[^'"]*['"]\)/g;
  if (brokenBgRegex.test(content)) {
    content = content.replace(brokenBgRegex, 'background-image:' + exactBgImg);
    changed = true;
  }

  // Also check if any background-image in framer-xj8hz2 has <text>
  const altBgRegex = /background-image:\s*url\(['"]data:image\/svg\+xml,[^'"]*THE%20GRAND[^'"]*['"]\)/g;

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    htmlUpdated++;
    console.log('Updated HTML:', file);
  }
}

console.log(`Updated ${htmlUpdated} HTML files.`);
