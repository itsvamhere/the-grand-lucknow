import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// 1. shared-lib
const sharedLibPath = path.join(projectDir, 'scripts', 'shared-lib.DganPNQZ.mjs');
let sharedLib = fs.readFileSync(sharedLibPath, 'utf8');

const deskSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2404.809 300.206" overflow="visible"><text x="601.2" y="250" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="260" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">GRAND</text><text x="1803.6" y="250" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="260" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">GRAND</text></svg>`;

const mobSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1202.351 150.096" overflow="visible"><text x="300.6" y="125" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="130" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">GRAND</text><text x="901.8" y="125" text-anchor="middle" font-family="'Lay Grotesk Regular', sans-serif" font-size="130" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">GRAND</text></svg>`;

sharedLib = sharedLib.replace(
  /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="0 0 2404\.809 300\.206"[^>]*>[\s\S]*?<\/svg>/,
  deskSvg
);

sharedLib = sharedLib.replace(
  /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="0 0 1202\.351 150\.096"[^>]*>[\s\S]*?<\/svg>/,
  mobSvg
);

fs.writeFileSync(sharedLibPath, sharedLib, 'utf8');

// 2. index.html
const indexHtmlPath = path.join(projectDir, 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');
html = html.replace(
  /<svg viewBox="0 0 1202\.351 150\.096" overflow="visible" id="svg870196829_4253">[\s\S]*?<\/svg>/,
  `<svg viewBox="0 0 1202.351 150.096" overflow="visible" id="svg870196829_4253"><text x="300.6" y="125" text-anchor="middle" font-family="'Lay Grotesk Regular', -apple-system, sans-serif" font-size="130" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">GRAND</text><text x="901.8" y="125" text-anchor="middle" font-family="'Lay Grotesk Regular', -apple-system, sans-serif" font-size="130" font-weight="700" letter-spacing="0.08em" fill="var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, rgb(243, 236, 221))">GRAND</text></svg>`
);
fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('Applied GRAND double repetition with exact 198.4px seam gap.');
