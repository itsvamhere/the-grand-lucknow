import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// 1. Read index.html as the single source of truth
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 2. Extract Navbar
const headerMatch = indexHtml.match(/<header\b[^>]*data-framer-name="Navbar Wrapper"[\s\S]*?<\/header>/i) || indexHtml.match(/<header[\s\S]*?<\/header>/i);
if (!headerMatch) throw new Error('Navbar Wrapper not found in index.html');
let canonicalHeader = headerMatch[0];

// Normalize header links to root-relative
canonicalHeader = canonicalHeader
  .replace(/href="\.\/venues"/g, 'href="/venues"')
  .replace(/href="\.\/about"/g, 'href="/about"')
  .replace(/href="\.\/contact"/g, 'href="/contact"')
  .replace(/href="\.\/book"/g, 'href="/contact"')
  .replace(/href="\.\/"/g, 'href="/"');

// 3. Read the authentic serif vector SVG
const desktopSvg = fs.readFileSync(path.join(ROOT, 'tools', 'archive', 'the_grand_footer_desktop.svg'), 'utf8');
const desktopSvgDataUri = 'data:image/svg+xml,' + encodeURIComponent(desktopSvg);

// 4. Extract Footer from index.html
const footerMatch = indexHtml.match(/<footer\b[^>]*data-framer-name="Footer"[\s\S]*?<\/footer>/i) || indexHtml.match(/<footer[\s\S]*?<\/footer>/i);
if (!footerMatch) throw new Error('Footer not found in index.html');
let canonicalFooter = footerMatch[0];

// Normalize footer links and contact info
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

// Replace any data:image/svg+xml in canonicalFooter that contains text or fallback with the authentic serif vector
canonicalFooter = canonicalFooter.replace(
  /url\(["']?data:image\/svg\+xml,[^"'\)]*Lay(?:%20|\s*)Grotesk[^"'\)]*["']?\)/gi,
  `url("${desktopSvgDataUri}")`
);
canonicalFooter = canonicalFooter.replace(
  /url\(["']?data:image\/svg\+xml,[^"'\)]*(?:THE%20GRAND|THE GRAND)[^"'\)]*["']?\)/gi,
  `url("${desktopSvgDataUri}")`
);

// 5. Extract the 3 required SVGs from bottom of index.html
const svgIds = ['svg-1334768056_3843', 'svg-1267704399_390', 'svg870196829_4253'];
const canonicalSvgs = [];
for (const id of svgIds) {
  const regex = new RegExp(`<svg[^>]*id="${id}"[\\s\\S]*?<\\/svg>`, 'i');
  const m = indexHtml.match(regex);
  if (m) {
    canonicalSvgs.push(m[0]);
  }
}
const canonicalSvgsBlock = `\n<!-- Canonical The Grand SVGs -->\n` + canonicalSvgs.join('\n') + `\n`;

// 6. Build universal CSS & JS injection blocks
const universalStyle = `
<style id="universal-grand-nav-footer-lock">
/* UNIVERSAL LOCK: The Grand Lucknow Navbar & Authentic Serif Footer */
footer.framer-18na9ah {
  background-color: var(--token-16db3221-68a2-44ed-9694-dc30db0040db, rgb(20, 26, 21)) !important;
  width: 100% !important;
  max-width: 100% !important;
  display: block !important;
  position: relative !important;
}

footer.framer-18na9ah [data-framer-name="Footer Logo"] {
  overflow-x: clip !important;
  display: flex !important;
  position: relative !important;
  opacity: 1 !important;
}

footer.framer-18na9ah [data-framer-name="Footer Logo"] ul {
  display: flex !important;
  position: relative !important;
  list-style-type: none !important;
  padding: 0 !important;
  margin: 0 !important;
  justify-content: flex-start !important;
  flex-direction: row !important;
  gap: 162px !important;
  opacity: 1 !important;
  align-items: center !important;
  width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  max-width: 100% !important;
  will-change: transform !important;
}

footer.framer-18na9ah .framer-xj8hz2 {
  background-image: url("${desktopSvgDataUri}") !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  image-rendering: auto !important;
  display: block !important;
  opacity: 1 !important;
}
</style>
`;

const universalTickerScript = `
<script id="universal-grand-ticker-engine">
(function() {
  function initGrandTicker() {
    var ul = document.querySelector('footer.framer-18na9ah [data-framer-name="Footer Logo"] ul');
    if (!ul) return;
    ul.style.opacity = '1';
    
    var items = ul.querySelectorAll('li');
    if (items.length > 0 && items.length < 4) {
      for (var i = 0; i < 3; i++) {
        var clone = items[0].cloneNode(true);
        clone.classList.remove('ticker-item');
        clone.classList.add('clone-item');
        clone.setAttribute('aria-hidden', 'true');
        ul.appendChild(clone);
      }
    }
    
    var pos = 0;
    var speed = 1.0;
    var lastTime = performance.now();
    
    function tick(now) {
      var dt = (now - lastTime) / 1000;
      lastTime = now;
      pos += speed * 60 * dt;
      
      var firstLi = ul.querySelector('li');
      if (firstLi) {
        var w = firstLi.offsetWidth + 162;
        if (pos >= w) {
          pos -= w;
        }
      }
      ul.style.transform = 'translateX(-' + pos.toFixed(2) + 'px)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrandTicker);
  } else {
    initGrandTicker();
  }
})();
</script>
`;

// 7. Define function to apply lock to any HTML file
export function lockPage(relativeFilePath) {
  const fullPath = path.join(ROOT, relativeFilePath);
  if (!fs.existsSync(fullPath)) {
    console.warn('File not found, skipping:', relativeFilePath);
    return false;
  }
  
  let html = fs.readFileSync(fullPath, 'utf8');
  
  // 1. Remove old custom footer styles and scripts that break parity
  html = html.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="universal-grand-nav-footer-lock">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="grand-ticker-motion">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script id="grand-footer-ticker-engine">[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script id="universal-grand-ticker-engine">[\s\S]*?<\/script>/gi, '');
  
  // 2. Replace Header
  const curHeaderMatch = html.match(/<header\b[^>]*data-framer-name="Navbar Wrapper"[\s\S]*?<\/header>/i) || html.match(/<header[\s\S]*?<\/header>/i);
  if (curHeaderMatch) {
    html = html.replace(curHeaderMatch[0], canonicalHeader);
  } else {
    console.warn(`No <header> found in ${relativeFilePath}`);
  }
  
  // 3. Replace Footer
  const curFooterMatch = html.match(/<footer\b[^>]*data-framer-name="Footer"[\s\S]*?<\/footer>/i) || html.match(/<footer[\s\S]*?<\/footer>/i);
  if (curFooterMatch) {
    html = html.replace(curFooterMatch[0], canonicalFooter);
  } else {
    console.warn(`No <footer> found in ${relativeFilePath}`);
  }
  
  // 4. Ensure Canonical SVGs are present before </body>
  for (const svgId of svgIds) {
    if (!html.includes(`id="${svgId}"`)) {
      const svgTag = canonicalSvgs.find(s => s.includes(`id="${svgId}"`));
      if (svgTag) {
        html = html.replace('</body>', `${svgTag}\n</body>`);
      }
    }
  }
  
  // 5. Inject Universal Style in <head> and Universal Script before </body>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${universalStyle}\n</head>`);
  } else {
    html = universalStyle + html;
  }
  
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${universalTickerScript}\n</body>`);
  } else {
    html = html + universalTickerScript;
  }
  
  fs.writeFileSync(fullPath, html, 'utf8');
  console.log(`[LOCKED] ${relativeFilePath}`);
  return true;
}

// 8. Target files list
const TARGET_PAGES = [
  'index.html',
  'venues/open-earth-lawn.html',
  'about.html',
  'contact.html',
  'venues.html',
  'imprint.html',
  'privacy.html',
  'terms.html',
  'venues/venue-n1.html',
  'venues/venue-n2.html',
  'venues/venue-n3.html',
  'venues/venue-n4.html',
  'venues/venue-n5.html',
  'venues/boutique-n1.html',
  'venues/boutique-n2.html',
  'venues/boutique-n3.html',
  'venues/boutique-n4.html',
  'venues/boutique-n5.html',
  'venues/loft-n1.html',
  'apartments/boutique-n1.html',
  'apartments/boutique-n2.html',
  'apartments/boutique-n3.html',
  'apartments/boutique-n4.html',
  'apartments/boutique-n5.html',
  'apartments/loft-n1.html'
];

let lockedCount = 0;
for (const page of TARGET_PAGES) {
  if (lockPage(page)) lockedCount++;
}

console.log(`\nAll done! Successfully locked universal nav and footer across ${lockedCount} pages.`);
