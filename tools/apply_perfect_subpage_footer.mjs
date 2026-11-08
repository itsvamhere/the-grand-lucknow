import fs from 'fs';
import path from 'path';

function buildRollingSpans(text) {
  const chars = Array.from(text);
  const srSpan = `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${text}</span>`;
  const charSpans = chars.map(ch => {
    return `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`;
  }).join('');
  return srSpan + charSpans;
}

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

// 3. Clean rolling spans
// Apartments -> Venues
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:Apartments|Venues)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('Venues')}</span><!--/$-->`;
  }
);
footer = footer.replace(/href="[^"]*apartments[^"]*"/gi, 'href="/venues"');

// LinkedIn -> Facebook
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:LinkedIn|Facebook)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('Facebook')}</span><!--/$-->`;
  }
);
footer = footer.replace(/href="https:\/\/(?:www\.)?(?:linkedin|twitter)[^"]*"/gi, 'href="https://facebook.com/thegrandlucknow"');
footer = footer.replace(/href="https:\/\/www\.instagram\.com\/casamomo\.at\/"/gi, 'href="https://instagram.com/thegrandlucknow"');

// Email: office@thegrandlucknow.in
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:casamomo\.at|thegrandlucknow\.in)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('office@thegrandlucknow.in')}</span><!--/$-->`;
  }
);
footer = footer.replace(/href="mailto:[^"]*"/gi, 'href="mailto:office@thegrandlucknow.in"');

// Phone: +91 91291 27091
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:1999605|1555605|27091)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('+91 91291 27091')}</span><!--/$-->`;
  }
);
footer = footer.replace(/href="tel:[^"]*"/gi, 'href="tel:+919129127091"');

// Built by Nexene -> Built by Edifice
footer = footer.replace(
  /<span data-rolling-label[^>]*>[\s\S]*?(?:Nexene|Edifice)[\s\S]*?<\/span><!--\/\$-->/gi,
  (match) => {
    const openTag = match.match(/<span data-rolling-label[^>]*>/)[0];
    return `${openTag}${buildRollingSpans('Edifice')}</span><!--/$-->`;
  }
);

// Copyright
footer = footer.replace(/©202[0-9] Casa Momo/gi, '©2026 The Grand');
footer = footer.replace(/©202[0-9] The Grand/gi, '©2026 The Grand');

// Background image for .framer-xj8hz2 to authentic serif vector
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

// Replace svg870196829_4253 definition
const p2 = lawn.indexOf('id="svg870196829_4253"');
if (p2 !== -1) {
  const lsStart = lawn.lastIndexOf('<svg', p2);
  const lsEnd = lawn.indexOf('</svg>', p2) + 6;
  const newSvgDef = `<svg viewBox="0 0 2404.809 300.206" overflow="visible" id="svg870196829_4253">${cleanSvg.slice(cleanSvg.indexOf('<path'), cleanSvg.indexOf('</svg>'))}</svg>`;
  lawn = lawn.slice(0, lsStart) + newSvgDef + lawn.slice(lsEnd);
}

// Clean any leftover style tags
lawn = lawn.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-ticker-motion">[\s\S]*?<\/style>/g, '');
lawn = lawn.replace(/<style id="grand-authentic-serif-footer-css">[\s\S]*?<\/style>/g, '');

// Clean skip link style & authentic footer style
const finalCss = `
<style id="grand-authentic-serif-footer-css">
  /* Visually hide .casa-skip link unless focused */
  .casa-skip:not(:focus) {
    position: absolute !important;
    left: -9999px !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
  }
  
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
  
  /* Ticker items visible */
  footer.framer-svwim0 .framer-n49p1z ul {
    opacity: 1 !important;
  }
</style>
`;

lawn = lawn.replace('</head>', `${finalCss}\n</head>`);

// Ensure 6 gallery images point to /images/card_1_open_earth.webp
lawn = lawn.replace(
  /\/images\/venues\/open_earth_lawn_\d\.webp/g,
  '/images/card_1_open_earth.webp'
);

fs.writeFileSync('venues/open-earth-lawn.html', lawn, 'utf8');
console.log('Successfully written perfect parity subpage!');
