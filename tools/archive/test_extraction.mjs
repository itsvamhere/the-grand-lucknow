import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 1. Extract Header
const headerMatch = indexHtml.match(/<header\b[^>]*data-framer-name="Navbar Wrapper"[\s\S]*?<\/header>/i) || indexHtml.match(/<header[\s\S]*?<\/header>/i);
if (!headerMatch) throw new Error('Navbar not found in index.html');
const rawHeader = headerMatch[0];

// 2. Extract Footer
const footerMatch = indexHtml.match(/<footer\b[^>]*data-framer-name="Footer"[\s\S]*?<\/footer>/i) || indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (!footerMatch) throw new Error('Footer not found in index.html');
const rawFooter = footerMatch[0];

// 3. Extract necessary SVGs at bottom of index.html
const svgIds = ['svg-1334768056_3843', 'svg-1267704399_390', 'svg870196829_4253'];
const extractedSvgs = [];
for (const id of svgIds) {
  const regex = new RegExp(`<svg[^>]*id="${id}"[\\s\\S]*?<\\/svg>`, 'i');
  const m = indexHtml.match(regex);
  if (m) {
    extractedSvgs.push(m[0]);
    console.log(`Found SVG ${id}, length: ${m[0].length}`);
  } else {
    console.warn(`Warning: SVG ${id} not found in index.html`);
  }
}

console.log('Header length:', rawHeader.length);
console.log('Footer length:', rawFooter.length);
console.log('Total SVGs extracted:', extractedSvgs.length);
