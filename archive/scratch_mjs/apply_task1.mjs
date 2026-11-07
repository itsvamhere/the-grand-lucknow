import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// Read font as base64
const fontBuf = fs.readFileSync(path.join(projectDir, 'fonts', 'el_pacre_regular.woff2'));
const fontBase64 = fontBuf.toString('base64');

// --- 1. Update SVGs in images/ ---
const imagesDir = path.join(projectDir, 'images');

// wordmark.svg
const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27">
  <defs>
    <style>
      @font-face {
        font-family: 'EL PACRE Regular';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </defs>
  <text x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="21" font-weight="400" letter-spacing="0.03em" fill="#FFF0CA">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'wordmark.svg'), wordmarkSvg, 'utf8');

// logo-dark.svg
const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <defs>
    <style>
      @font-face {
        font-family: 'EL PACRE Regular';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </defs>
  <text x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="21" font-weight="400" letter-spacing="0.03em" fill="#0E1201">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-dark.svg'), logoDarkSvg, 'utf8');

// logo-light.svg
const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.285 27" width="216.285" height="27" fill="none">
  <defs>
    <style>
      @font-face {
        font-family: 'EL PACRE Regular';
        src: url('data:font/woff2;base64,${fontBase64}') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </defs>
  <text x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="21" font-weight="400" letter-spacing="0.03em" fill="#FFF0CA">THE GRAND</text>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, 'logo-light.svg'), logoLightSvg, 'utf8');
console.log('1. Updated images/ SVGs with embedded base64 EL PACRE font.');

// --- 2. Update scripts/shared-lib.DganPNQZ.mjs ---
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

// Replace nav logo SVG
const oldNavSvgPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="0 0 216\.285 27"[^>]*>[\s\S]*?<\/svg>/g;
const newNavSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 216.285 27" overflow="visible"><text x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="21" font-weight="400" letter-spacing="0.03em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;

sharedLib = sharedLib.replaceAll(oldNavSvgPattern, newNavSvg);

// Replace desktop footer SVG (2404.809 x 300.206)
const oldDesktopFooterPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="0 0 2404\.809 300\.206"[^>]*>[\s\S]*?<\/svg>/g;
const newDesktopFooterSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="225" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="280" font-weight="400" letter-spacing="0.03em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;
sharedLib = sharedLib.replaceAll(oldDesktopFooterPattern, newDesktopFooterSvg);

// Replace mobile footer SVG (1202.351 x 150.096)
const oldMobileFooterPattern = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="0 0 1202\.351 150\.096"[^>]*>[\s\S]*?<\/svg>/g;
const newMobileFooterSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1202.351 150.096" overflow="visible"><text x="50%" y="112" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="140" font-weight="400" letter-spacing="0.03em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;
sharedLib = sharedLib.replaceAll(oldMobileFooterPattern, newMobileFooterSvg);

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');
console.log('2. Updated scripts/shared-lib.DganPNQZ.mjs');

// --- 3. Update all HTML files ---
const newHtmlNavSvg = `<svg viewBox="0 0 216.285 27" overflow="visible" id="svg-1334768056_3843">
  <text x="50%" y="20.5" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="21" font-weight="400" letter-spacing="0.03em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;

const newHtmlFooterSvg = `<svg viewBox="0 0 1202.351 150.096" overflow="visible" id="svg870196829_4253">
  <text x="50%" y="112" text-anchor="middle" font-family="'EL PACRE Regular', 'EL PACRE Regular Placeholder', serif" font-size="140" font-weight="400" letter-spacing="0.03em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;

function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('id="svg-1334768056_3843"')) {
    content = content.replace(
      /<svg[^>]*id="svg-1334768056_3843"[^>]*>[\s\S]*?<\/svg>/,
      newHtmlNavSvg
    );
    changed = true;
  }

  if (content.includes('id="svg870196829_4253"')) {
    content = content.replace(
      /<svg[^>]*id="svg870196829_4253"[^>]*>[\s\S]*?<\/svg>/,
      newHtmlFooterSvg
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated HTML: ${path.relative(projectDir, filePath)}`);
  }
}

function walkDir(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== '.vercel') {
        walkDir(full);
      }
    } else if (item.endsWith('.html')) {
      updateHtmlFile(full);
    }
  }
}

walkDir(projectDir);
console.log('Task 1 code updates complete!');
