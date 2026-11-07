import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const exactBgImg = fs.readFileSync(path.join(root, 'tools', 'casamomo_footer_bg_image.txt'), 'utf8').trim();
const exactSvg870 = fs.readFileSync(path.join(root, 'tools', 'casamomo_svg870196829_4253.svg'), 'utf8').trim();
const exactDecoded = fs.readFileSync(path.join(root, 'tools', 'casamomo_footer_decoded.svg'), 'utf8').trim();

// 1. Update shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(root, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

// Replace any <text ...> in AOxZDvmqQ
const textRegex = /svg:`<svg[^>]+viewBox="0 0 2404\.809 300\.206"[^>]*>[\s\S]*?<\/svg>`/;
if (textRegex.test(sharedLib)) {
  sharedLib = sharedLib.replace(textRegex, 'svg:`' + exactDecoded + '`');
  console.log('Updated desktop SVG in shared-lib');
}

const mobileTextRegex = /svg:`<svg[^>]+viewBox="0 0 1202\.351 150\.096"[^>]*>[\s\S]*?<\/svg>`/;
if (mobileTextRegex.test(sharedLib)) {
  sharedLib = sharedLib.replace(mobileTextRegex, 'svg:`' + exactSvg870 + '`');
  console.log('Updated mobile SVG in shared-lib');
}

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');

// 2. Update all HTML files in root and subdirectories
function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace background-image with <text> in framer-xj8hz2
  // Match any background-image on framer-xj8hz2 containing %3Ctext or THE%20GRAND
  const bgImgRegex = /background-image:\s*url\(['"]data:image\/svg\+xml,[^'"]*?(?:%3Ctext|THE%20GRAND)[^'"]*?['"]\)/g;
  if (bgImgRegex.test(content)) {
    content = content.replace(bgImgRegex, 'background-image:' + exactBgImg);
    changed = true;
  }

  // Replace svg870196829_4253 template
  const svgDefRegex = /<svg[^>]*id="svg870196829_4253"[^>]*>[\s\S]*?<\/svg>/;
  if (svgDefRegex.test(content)) {
    content = content.replace(svgDefRegex, exactSvg870);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated HTML file:', path.relative(root, filePath));
  }
}

const allHtmls = fs.readdirSync(root).filter(f => f.endsWith('.html'));
for (const f of allHtmls) {
  processHtmlFile(path.join(root, f));
}

for (const sub of ['apartments', 'venues']) {
  const p = path.join(root, sub);
  if (fs.existsSync(p)) {
    const subs = fs.readdirSync(p).filter(f => f.endsWith('.html'));
    for (const f of subs) {
      processHtmlFile(path.join(p, f));
    }
  }
}

console.log('Done restoring footer vector on all files!');
