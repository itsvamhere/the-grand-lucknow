import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// 1. Update scripts/shared-lib.DganPNQZ.mjs
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

// Replace dark and light nav logos
sharedLib = sharedLib.replaceAll(
  'https://framerusercontent.com/images/sOGC2IUkuolV0DKVBiFEJveSs0.svg?width=216&height=27',
  '/images/logo-dark.svg'
);
sharedLib = sharedLib.replaceAll(
  'https://framerusercontent.com/images/sOGC2IUkuolV0DKVBiFEJveSs0.svg',
  '/images/logo-dark.svg'
);
sharedLib = sharedLib.replaceAll(
  'https://framerusercontent.com/images/AR2Rq8AO90zXACnVeViCZnmOhw.svg?width=216&height=27',
  '/images/logo-light.svg'
);
sharedLib = sharedLib.replaceAll(
  'https://framerusercontent.com/images/AR2Rq8AO90zXACnVeViCZnmOhw.svg',
  '/images/logo-light.svg'
);

// Desktop footer SVG
const oldDesktopFooter = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="50%" y="225" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="192" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;
const newDesktopFooter = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="601.2" y="245" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="225" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text><text x="1803.6" y="245" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="225" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;

sharedLib = sharedLib.replace(oldDesktopFooter, newDesktopFooter);

// Mobile footer SVG
const oldMobileFooter = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1202.351 150.096" overflow="visible"><text x="50%" y="115" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="96" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;
const newMobileFooter = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1202.351 150.096" overflow="visible"><text x="300.6" y="122" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="112" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text><text x="901.8" y="122" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="112" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text></svg>`;

sharedLib = sharedLib.replace(oldMobileFooter, newMobileFooter);

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');
console.log('Updated shared-lib.DganPNQZ.mjs');

// 2. Update index.html
const indexHtmlPath = path.join(projectDir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const oldIndexFooter = `<svg viewBox="0 0 1202.351 150.096" overflow="visible" id="svg870196829_4253">
  <text x="50%" y="115" text-anchor="middle" font-family="'Lay Grotesk Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="96" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;

const newIndexFooter = `<svg viewBox="0 0 1202.351 150.096" overflow="visible" id="svg870196829_4253">
  <text x="300.6" y="122" text-anchor="middle" font-family="'Lay Grotesk Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="112" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
  <text x="901.8" y="122" text-anchor="middle" font-family="'Lay Grotesk Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="112" font-weight="700" letter-spacing="0.04em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">THE GRAND</text>
</svg>`;

indexHtml = indexHtml.replace(oldIndexFooter, newIndexFooter);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('Updated index.html');

// 3. Update server.mjs
const serverPath = path.join(projectDir, 'server.mjs');
let serverMjs = fs.readFileSync(serverPath, 'utf8');

if (!serverMjs.includes('/images/logo-dark.svg')) {
  serverMjs = serverMjs.replace(
    ".replaceAll('https://framerusercontent.com/images/jHPR40TEGNdp27MUIjYyaJnHRGU.jpg', '/images/hero_bg.webp')",
    ".replaceAll('https://framerusercontent.com/images/sOGC2IUkuolV0DKVBiFEJveSs0.svg', '/images/logo-dark.svg')\n" +
    "    .replaceAll('https://framerusercontent.com/images/AR2Rq8AO90zXACnVeViCZnmOhw.svg', '/images/logo-light.svg')\n" +
    "    .replaceAll('https://framerusercontent.com/images/jHPR40TEGNdp27MUIjYyaJnHRGU.jpg', '/images/hero_bg.webp')"
  );
  fs.writeFileSync(serverPath, serverMjs, 'utf8');
  console.log('Updated server.mjs');
}
