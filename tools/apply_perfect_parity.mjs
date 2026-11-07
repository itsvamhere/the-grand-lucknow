import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');
const subHtmlPath = 'venues/open-earth-lawn.html';
let subHtml = fs.readFileSync(subHtmlPath, 'utf8');

console.log('1. REPLACING FOOTER WITH EXACT REPLICA OF HOME PAGE FOOTER');
// Extract exact <footer>...</footer> from index.html
const homeFStart = homeHtml.indexOf('<footer');
const homeFEnd = homeHtml.indexOf('</footer>', homeFStart) + 9;
const exactHomeFooter = homeHtml.slice(homeFStart, homeFEnd);

// Replace <footer>...</footer> in subpage
const subFStart = subHtml.indexOf('<footer');
const subFEnd = subHtml.indexOf('</footer>', subFStart) + 9;
subHtml = subHtml.slice(0, subFStart) + exactHomeFooter + subHtml.slice(subFEnd);

// Remove custom conflicting grand-ticker CSS or overrides
subHtml = subHtml.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/g, '');
subHtml = subHtml.replace(/<style id="grand-ticker-motion">[\s\S]*?<\/style>/g, '');

console.log('2. UPDATING GALLERY WITH 6 PROFESSIONAL HIGH-RES STOCK PHOTOS');
const stockPhotos = [
  '/images/venues/open_earth_lawn_1.webp',
  '/images/venues/open_earth_lawn_2.webp',
  '/images/venues/open_earth_lawn_3.webp',
  '/images/venues/open_earth_lawn_4.webp',
  '/images/venues/open_earth_lawn_5.webp',
  '/images/venues/open_earth_lawn_6.webp'
];

// In the gallery section, replace images sequentially
const galStart = subHtml.indexOf('data-framer-name="Gallery"');
if (galStart !== -1) {
  let galSection = subHtml.slice(galStart, galStart + 15000);
  let pIdx = 0;
  galSection = galSection.replace(/src="[^"]*?(?:the_grand_open_earth_lawn_hero\.jpg|UayMv2I16UbQQBQkbI90HsJMv5o\.webp|open_earth_lawn_\d\.webp)[^"]*"/g, (match) => {
    const photo = stockPhotos[pIdx % stockPhotos.length];
    pIdx++;
    return `src="${photo}"`;
  });
  
  // Also update srcset
  pIdx = 0;
  galSection = galSection.replace(/srcset="[^"]*?(?:the_grand_open_earth_lawn_hero\.jpg|UayMv2I16UbQQBQkbI90HsJMv5o\.webp|open_earth_lawn_\d\.webp)[^"]*"/g, (match) => {
    const photo = stockPhotos[pIdx % stockPhotos.length];
    pIdx++;
    return `srcset="${photo} 1920w"`;
  });
  
  subHtml = subHtml.slice(0, galStart) + galSection + subHtml.slice(galStart + 15000);
}

// Also update Hero background image to open_earth_lawn_1.webp
subHtml = subHtml.replace(
  /src="[^"]*?the_grand_open_earth_lawn_hero\.jpg"/g,
  'src="/images/venues/open_earth_lawn_1.webp"'
);
subHtml = subHtml.replace(
  /srcset="[^"]*?the_grand_open_earth_lawn_hero\.jpg[^"]*"/g,
  'srcset="/images/venues/open_earth_lawn_1.webp 1920w"'
);

console.log('3. UPDATING LOCATION SCROLL SCRIPT: FADES ONLY DURING OVERLAP');
// Replace the onLocScroll function so it stays 100% opaque (#4E5240) and ONLY dims when the navbar actually overlaps it
const accurateLocScript = `
    // Accurate Casa Momo Location overlap fade: ONLY dims when sticky navbar overlaps it
    var locSec = document.getElementById('bigtext-1');
    var navWrapper = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    if (locSec) {
      function onLocScroll() {
        var locH = locSec.querySelector('h2') || locSec;
        var r = locH.getBoundingClientRect();
        var navHeight = navWrapper ? navWrapper.offsetHeight : 110;
        
        // Overlap zone: heading intersects top navbar area (between top 10px and navHeight)
        var isOverlapping = (r.top <= navHeight - 15) && (r.bottom >= 20);
        
        if (isOverlapping) {
          // Dim only during actual physical overlap so navbar logo is readable
          locH.style.opacity = '0.45';
        } else {
          // 100% crisp, dark olive fully opaque when not overlapping
          locH.style.opacity = '1';
        }
      }
      window.addEventListener('scroll', onLocScroll, { passive: true });
      window.addEventListener('resize', onLocScroll, { passive: true });
      onLocScroll();
    }
`;

subHtml = subHtml.replace(
  /\/\/(?:\s*\d+\.)?\s*Scroll-driven fade-out for Location section matching Casa Momo[\s\S]*?window\.addEventListener\('resize', onLocScroll, \{ passive: true \}\);\s*onLocScroll\(\);\s*\}\s*\}/,
  accurateLocScript.trim() + '\n    }'
);

console.log('4. ENSURING MAP PIN IS DEAD CENTER (left: 50%, top: 40%)');
subHtml = subHtml.replace(
  /<div id="grand-live-pointer" style="[^"]*">/,
  '<div id="grand-live-pointer" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%); pointer-events: none; z-index: 3;">'
);

// Also enforce in CSS rules so !important overrides do not skew the coordinates
subHtml = subHtml.replace(
  /#grand-live-pointer\s*\{\s*left:\s*50%\s*!important;\s*top:\s*(?:50%|40%)\s*!important;\s*\}/g,
  '#grand-live-pointer {\n    left: 50% !important;\n    top: 40% !important;\n  }'
);
subHtml = subHtml.replace(
  /#subpage-vector-map\s*\{[\s\S]*?overflow:\s*hidden;\s*\}/,
  `#subpage-vector-map {
    width: 100% !important;
    height: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    background: #FFF0CA;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }`
);
subHtml = subHtml.replace(
  /@media \(max-width: 809\.98px\) \{\s*#subpage-vector-map \{\s*width: (?:170%|100%) !important;\s*left: (?:-69%|0) !important;\s*\}\s*#grand-live-pointer \{\s*left: 50% !important;\s*top: (?:50%|40%) !important;\s*\}\s*\}/,
  `@media (max-width: 809.98px) {
    #subpage-vector-map {
      width: 100% !important;
      left: 0 !important;
    }
    #grand-live-pointer {
      left: 50% !important;
      top: 40% !important;
    }
  }`
);

fs.writeFileSync(subHtmlPath, subHtml, 'utf8');
console.log('Successfully applied all changes to venues/open-earth-lawn.html!');
