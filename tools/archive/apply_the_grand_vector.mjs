import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const theGrandD = fs.readFileSync(path.join(root, 'tools', 'the_grand_matched_d.txt'), 'utf8').trim();

// Get the current CASA MOMO d
const wordmarkSvg = fs.readFileSync(path.join(root, 'images', 'wordmark.svg'), 'utf8');
const oldDMatch = wordmarkSvg.match(/d="([^"]+)"/);
if (!oldDMatch) {
  console.error('Cannot find current d in wordmark.svg');
  process.exit(1);
}
const oldD = oldDMatch[1];
console.log('Old d length:', oldD.length);
console.log('New d length:', theGrandD.length);

let filesChanged = 0;

function updateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldD)) {
    content = content.replaceAll(oldD, theGrandD);
    fs.writeFileSync(filePath, content, 'utf8');
    filesChanged++;
    console.log('Updated:', path.relative(root, filePath));
  }
}

// Update images
updateFile(path.join(root, 'images', 'wordmark.svg'));
updateFile(path.join(root, 'images', 'logo-light.svg'));
updateFile(path.join(root, 'images', 'logo-dark.svg'));

// Update scripts
updateFile(path.join(root, 'scripts', 'shared-lib.DganPNQZ.mjs'));

// Update HTML files
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
for (const f of htmlFiles) {
  updateFile(path.join(root, f));
}

// Check subdirectories for html files
const subdirs = ['apartments', 'venues'];
for (const sub of subdirs) {
  const p = path.join(root, sub);
  if (fs.existsSync(p)) {
    const subs = fs.readdirSync(p).filter(f => f.endsWith('.html'));
    for (const f of subs) {
      updateFile(path.join(p, f));
    }
  }
}

console.log(`Total files updated: ${filesChanged}`);
