import fs from 'fs';

// 1. Read authentic serif vector SVG
const serifSvg = fs.readFileSync('tools/archive/the_grand_footer_desktop.svg', 'utf8').trim();
let cleanSvg = serifSvg;
if (!cleanSvg.includes('fill=')) {
  cleanSvg = cleanSvg.replace('<path d=', '<path fill="rgb(255,240,202)" d=');
}
const encodedSvg = encodeURIComponent(cleanSvg);

// 2. Read upstream boutique-n1 footer
const upHtml = fs.readFileSync('archive/upstream_html/upstream_boutique-n1.html', 'utf8');
const ufStart = upHtml.indexOf('<footer');
const ufEnd = upHtml.indexOf('</footer>', ufStart) + 9;
let footer = upHtml.slice(ufStart, ufEnd);
console.log('Original upstream footer length:', footer.length);

// 3. Content swap on footer
// Email & Phone
footer = footer.replace(/office@casamomo\.at/g, 'office@thegrandlucknow.in');
footer = footer.replace(/\+43[^<"']+/g, '+91 9129127091');
// Apartments -> Venues
footer = footer.replace(/Apartments/g, 'Venues');
footer = footer.replace(/\.\/apartments/g, '/venues');
footer = footer.replace(/href="\/apartments"/g, 'href="/venues"');
// Year / Copyright
footer = footer.replace(/©202[0-9] Casa Momo/g, '©2026 The Grand');
footer = footer.replace(/©202[0-9] The Grand/g, '©2026 The Grand');
footer = footer.replace(/Casa Momo/g, 'The Grand');
// Socials: ensure Facebook & Instagram
footer = footer.replace(/Twitter/g, 'Facebook');
footer = footer.replace(/https:\/\/twitter\.com[^\"]*/g, 'https://facebook.com/thegrandlucknow');
footer = footer.replace(/https:\/\/www\.instagram\.com[^\"]*/g, 'https://instagram.com/thegrandlucknow');

// Ensure background-image for .framer-xj8hz2 uses authentic serif SVG
footer = footer.replace(
  /background-image:url\('data:image\/svg\+xml,[^']*'\)/g,
  `background-image:url('data:image/svg+xml,${encodedSvg}')`
);

// 4. Update venues/open-earth-lawn.html
let lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Replace footer
const curFStart = lawn.indexOf('<footer');
const curFEnd = lawn.indexOf('</footer>', curFStart) + 9;
lawn = lawn.slice(0, curFStart) + footer + lawn.slice(curFEnd);

// Replace svg870196829_4253 definition with authentic serif vector
const p2 = lawn.indexOf('id="svg870196829_4253"');
if (p2 !== -1) {
  const lsStart = lawn.lastIndexOf('<svg', p2);
  const lsEnd = lawn.indexOf('</svg>', p2) + 6;
  const newSvgDef = `<svg viewBox="0 0 2404.809 300.206" overflow="visible" id="svg870196829_4253">${cleanSvg.slice(cleanSvg.indexOf('<path'), cleanSvg.indexOf('</svg>'))}</svg>`;
  lawn = lawn.slice(0, lsStart) + newSvgDef + lawn.slice(lsEnd);
}

// Ensure .framer-xj8hz2 in CSS uses the authentic serif vector
lawn = lawn.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-ticker-motion">[\s\S]*?<\/style>/g, '');

// Add scoped CSS for .framer-xj8hz2 to guarantee serif background-image and proper ticker animation
const scopedFooterCss = `
<style id="grand-authentic-serif-footer-css">
  /* Guaranteed authentic serif vector for footer ticker */
  .framer-xj8hz2 {
    background-image: url("data:image/svg+xml,${encodedSvg}") !important;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
  }
  footer.framer-svwim0 {
    background-color: #964317 !important;
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow: clip !important;
  }
  /* Ensure ticker ul items loop seamlessly */
  footer.framer-svwim0 .framer-n49p1z ul {
    opacity: 1 !important;
  }
</style>
`;

// Insert before </head>
lawn = lawn.replace('</head>', `${scopedFooterCss}\n</head>`);

fs.writeFileSync('venues/open-earth-lawn.html', lawn, 'utf8');
console.log('Successfully installed authentic subpage footer into venues/open-earth-lawn.html!');
