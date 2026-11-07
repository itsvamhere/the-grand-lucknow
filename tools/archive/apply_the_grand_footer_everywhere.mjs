import fs from 'fs';
import path from 'path';

const rootDir = "C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo";

const desktopSvg = fs.readFileSync(path.join(rootDir, "tools/the_grand_footer_desktop.svg"), "utf8");
const mobileSvg = fs.readFileSync(path.join(rootDir, "tools/the_grand_footer_mobile.svg"), "utf8");
const desktopBgImage = fs.readFileSync(path.join(rootDir, "tools/the_grand_footer_bg_image.txt"), "utf8");

// 1. Update scripts/shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(rootDir, "scripts/shared-lib.DganPNQZ.mjs");
let sharedLibContent = fs.readFileSync(sharedLibPath, "utf8");

const idx = sharedLibContent.indexOf('layoutId:`AOxZDvmqQ`');
if (idx !== -1) {
  const svgStart = sharedLibContent.indexOf('svg:`', idx);
  const svgEnd = sharedLibContent.indexOf('`', svgStart + 5);
  if (svgStart !== -1 && svgEnd !== -1) {
    sharedLibContent = sharedLibContent.slice(0, svgStart + 5) + desktopSvg + sharedLibContent.slice(svgEnd);
    fs.writeFileSync(sharedLibPath, sharedLibContent, "utf8");
    console.log("Updated shared-lib.DganPNQZ.mjs successfully!");
  } else {
    console.error("Could not find svg backtick bounds in shared-lib!");
  }
} else {
  console.error("Could not find AOxZDvmqQ in shared-lib!");
}

// 2. Update all HTML files in root and subdirectories
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'tools') {
        results = results.concat(getHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);
console.log(`Found ${htmlFiles.length} HTML files to update.`);

let updatedCount = 0;
for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Replace background-image on framer-xj8hz2
  // Regex to match background-image:url('data:image/svg+xml,...')
  const bgRegex = /background-image:url\('data:image\/svg\+xml,[^']+'\)/g;
  if (bgRegex.test(content)) {
    content = content.replace(bgRegex, `background-image:url('${desktopBgImage}')`);
    modified = true;
  }

  // Replace mobile SVG definition: <svg viewBox="0 0 1202.351 150.096" overflow="visible" id="svg870196829_4253">...</svg>
  const svgRegex = /<svg\s+viewBox="0\s+0\s+1202\.351\s+150\.096"[^>]*id="svg870196829_4253"[^>]*>[\s\S]*?<\/svg>/g;
  if (svgRegex.test(content)) {
    content = content.replace(svgRegex, mobileSvg);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    updatedCount++;
  }
}

console.log(`Updated ${updatedCount} HTML files with THE GRAND footer vector!`);
