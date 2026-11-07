import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 1. Extract raw Header from index.html
const headerMatch = indexHtml.match(/<header\b[^>]*data-framer-name="Navbar Wrapper"[\s\S]*?<\/header>/i) || indexHtml.match(/<header[\s\S]*?<\/header>/i);
if (!headerMatch) throw new Error('Header not found in index.html');
let canonicalHeader = headerMatch[0];

// Normalize header links to root-relative
canonicalHeader = canonicalHeader
  .replace(/href="\.\/venues"/g, 'href="/venues"')
  .replace(/href="\.\/about"/g, 'href="/about"')
  .replace(/href="\.\/contact"/g, 'href="/contact"')
  .replace(/href="\.\/book"/g, 'href="/contact"')
  .replace(/href="\.\/"/g, 'href="/"');

// 2. Extract raw Footer from index.html
const footerMatch = indexHtml.match(/<footer\b[^>]*data-framer-name="Footer"[\s\S]*?<\/footer>/i) || indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (!footerMatch) throw new Error('Footer not found in index.html');
let canonicalFooter = footerMatch[0];

// Normalize footer links and contact info to authentic Grand Lucknow details
canonicalFooter = canonicalFooter
  .replace(/href="\.\/venues"/g, 'href="/venues"')
  .replace(/href="\.\/about"/g, 'href="/about"')
  .replace(/href="\.\/contact"/g, 'href="/contact"')
  .replace(/href="\.\/imprint"/g, 'href="/imprint"')
  .replace(/href="\.\/terms"/g, 'href="/terms"')
  .replace(/href="\.\/privacy"/g, 'href="/privacy"')
  .replace(/href="mailto:Thegrandbanquet07@gmail.com"/g, 'href="mailto:office@thegrandlucknow.in"')
  .replace(/Thegrandbanquet07@gmail.com/g, 'office@thegrandlucknow.in')
  .replace(/href="tel:\+436641999605"/g, 'href="tel:+919129127091"')
  .replace(/\+43\s*664\s*1999605/g, '+91 91291 27091')
  .replace(/\+436641999605/g, '+919129127091')
  .replace(/Made with love by/g, 'Built by')
  .replace(/Nexene/g, 'Edifice')
  .replace(/https:\/\/nexene\.at\/?/g, 'https://elvar.in/edifice');

// In canonicalFooter, ensure NO fallback <text x="50%" y="225"> exists in the SVG!
// If any <text x="50%" y="225" ...>THE GRAND</text> exists, replace it with the authentic serif path!
const desktopSvg = fs.readFileSync(path.join(ROOT, 'tools', 'archive', 'the_grand_footer_desktop.svg'), 'utf8');
const desktopSvgDataUri = 'data:image/svg+xml,' + encodeURIComponent(desktopSvg);

// Replace any occurrence of the text-based SVG with the authentic vector SVG
canonicalFooter = canonicalFooter.replace(
  /url\(["']?data:image\/svg\+xml,[^"'\)]*Lay%20Grotesk[^"'\)]*["']?\)/g,
  `url("${desktopSvgDataUri}")`
);
canonicalFooter = canonicalFooter.replace(
  /url\(["']?data:image\/svg\+xml,[^"'\)]*Lay Grotesk[^"'\)]*["']?\)/g,
  `url("${desktopSvgDataUri}")`
);

// 3. Extract the 3 critical SVG symbols from bottom of index.html
const svgIds = ['svg-1334768056_3843', 'svg-1267704399_390', 'svg870196829_4253'];
const canonicalSvgs = [];
for (const id of svgIds) {
  const regex = new RegExp(`<svg[^>]*id="${id}"[\\s\\S]*?<\\/svg>`, 'i');
  const m = indexHtml.match(regex);
  if (m) {
    canonicalSvgs.push(m[0]);
  } else {
    throw new Error(`SVG ${id} not found in index.html`);
  }
}

// 4. Save the canonical blocks to disk
fs.writeFileSync(path.join(ROOT, 'tools', 'canonical_header.html'), canonicalHeader);
fs.writeFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), canonicalFooter);
fs.writeFileSync(path.join(ROOT, 'tools', 'canonical_svgs.html'), canonicalSvgs.join('\n'));

console.log('Canonical Header created, length:', canonicalHeader.length);
console.log('Canonical Footer created, length:', canonicalFooter.length);
console.log('Canonical SVGs created, count:', canonicalSvgs.length);
