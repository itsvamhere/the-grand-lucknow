import fs from 'fs';

// 1. Read authentic serif vector SVG
const serifSvg = fs.readFileSync('tools/archive/the_grand_footer_desktop.svg', 'utf8').trim();
let cleanSvg = serifSvg;
if (!cleanSvg.includes('fill=')) {
  cleanSvg = cleanSvg.replace('<path d=', '<path fill="rgb(255,240,202)" d=');
}
const encodedSvg = encodeURIComponent(cleanSvg);

// 2. Read index.html footer
const idx = fs.readFileSync('index.html', 'utf8');
const idxFStart = idx.indexOf('<footer');
const idxFEnd = idx.indexOf('</footer>') + 9;
let homeFooter = idx.slice(idxFStart, idxFEnd);
console.log('Home footer length:', homeFooter.length);

// In homeFooter, replace any background-image on .framer-xj8hz2 with the serif vector
homeFooter = homeFooter.replace(
  /background-image:url\('data:image\/svg\+xml,[^']*'\)/g,
  `background-image:url('data:image/svg+xml,${encodedSvg}')`
);

// 3. Read venues/open-earth-lawn.html
let lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Replace footer in lawn
const lawnFStart = lawn.indexOf('<footer');
const lawnFEnd = lawn.indexOf('</footer>') + 9;
lawn = lawn.slice(0, lawnFStart) + homeFooter + lawn.slice(lawnFEnd);

// Replace svg870196829_4253 definition in lawn to draw THE GRAND in serif vector paths
const p2 = lawn.indexOf('id="svg870196829_4253"');
if (p2 !== -1) {
  const lsStart = lawn.lastIndexOf('<svg', p2);
  const lsEnd = lawn.indexOf('</svg>', p2) + 6;
  const newSvgDef = `<svg viewBox="0 0 2404.809 300.206" overflow="visible" id="svg870196829_4253">${cleanSvg.slice(cleanSvg.indexOf('<path'), cleanSvg.indexOf('</svg>'))}</svg>`;
  lawn = lawn.slice(0, lsStart) + newSvgDef + lawn.slice(lsEnd);
  console.log('Replaced svg870196829_4253 with authentic serif vector in lawn!');
}

// Remove any lingering custom style blocks that override footer
lawn = lawn.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-ticker-motion">[\s\S]*?<\/style>/g, '');

// Also add a clean scoped style for the ticker and footer if needed, or check if native Framer CSS handles it
fs.writeFileSync('venues/open-earth-lawn.html', lawn, 'utf8');
console.log('Successfully wrote 108KB authentic footer into venues/open-earth-lawn.html!');
