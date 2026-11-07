import fs from 'fs';

const filePath = 'venues/open-earth-lawn.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('1. FIXING MAP POINTER POSITION (Centered at left: 50%, top: 40%, zero overlap)');
// Replace #grand-live-pointer position
html = html.replace(
  /<div id="grand-live-pointer" style="[^"]*">/,
  '<div id="grand-live-pointer" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%); pointer-events: none; z-index: 3;">'
);

console.log('2. FIXING VENUE DETAILS AND NUMBERS (Open Earth Lawn, Grassland Gala, Garden Galaxy)');
// Fix floating superscript: hide .framer-84xumc globally so no stray exponents appear over Sqft
const hideSuperscriptCss = `
  /* Hide stray superscript on Sqft */
  .framer-84xumc {
    display: none !important;
  }
`;

// Fix Grassland Gala card: Area = 20,000 Sqft, Guests = 800 (from 500-800)
// Find Grassland Gala details block
const ggMatch = html.match(/alt="Grassland Gala"[\s\S]*?alt="Garden Galaxy"/);
if (ggMatch) {
  let ggBlock = ggMatch[0];
  // Replace area to 20,000
  ggBlock = ggBlock.replace(/>\s*(?:55,000|45,000|120)\s*<\/p>/, '>20,000</p>');
  // Replace guests to 800
  ggBlock = ggBlock.replace(/>\s*(?:1,500|1500|6|2|3)\s*<\/p>(?=[\s\S]*?framer-anl3iy)/, '>800</p>');
  html = html.replace(ggMatch[0], ggBlock);
}

// Fix Garden Galaxy card: Area = 15,000 Sqft, Guests = 300 (from 250-300)
const gaMatch = html.match(/alt="Garden Galaxy"[\s\S]*?<\/section>/);
if (gaMatch) {
  let gaBlock = gaMatch[0];
  // Replace area to 15,000
  gaBlock = gaBlock.replace(/>\s*(?:120|55,000|45,000)\s*<\/p>/, '>15,000</p>');
  // Replace guests to 300
  gaBlock = gaBlock.replace(/>\s*(?:6|1,500|1500|2|3)\s*<\/p>(?=[\s\S]*?framer-anl3iy)/, '>300</p>');
  html = html.replace(gaMatch[0], gaBlock);
}

// Fix Open Earth Lawn hero: Area = 55,000 Sqft, Guests = 1,500
// Check hero numbers
html = html.replace(
  /<p[^>]*class="[^"]*framer-text[^"]*"[^>]*>\s*(?:120|45,000)\s*<\/p>\s*<\/div>\s*<div[^>]*data-framer-name="Squaremeter"/,
  '<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var(--extracted-r6o4lv, var(--variable-reference-SynSWk5OK-T5PVEAy5F))">55,000</p></div><div class="framer-83dt0r" data-framer-name="Squaremeter"'
);

console.log('3. FIXING NAVBAR OVERLAP OVER FOOTER');
// When the footer is in view, fade/slide out the sticky navbar so it never collides with footer links
const navFooterFixCss = `
<style id="grand-nav-footer-collision-guard">
  /* Ensure footer has higher z-index than sticky navbar */
  footer.framer-18na9ah {
    position: relative !important;
    z-index: 50 !important;
    background-color: #964317 !important;
  }
  
  /* Navbar smooth hide when footer is reached */
  header[data-framer-name="Navbar Wrapper"] {
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease !important;
  }
  
  header[data-framer-name="Navbar Wrapper"].nav-hidden-over-footer {
    transform: translateY(-110%) !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  
  ${hideSuperscriptCss}
</style>
`;

if (!html.includes('id="grand-nav-footer-collision-guard"')) {
  html = html.replace('</head>', navFooterFixCss + '\n</head>');
} else {
  html = html.replace(/<style id="grand-nav-footer-collision-guard">[\s\S]*?<\/style>/, navFooterFixCss.trim());
}

// Script to trigger nav-hidden-over-footer via IntersectionObserver
const navObserverScript = `
<script id="grand-footer-nav-observer">
(function() {
  'use strict';
  function setupNavObserver() {
    var footer = document.querySelector('footer.framer-18na9ah');
    var nav = document.querySelector('header[data-framer-name="Navbar Wrapper"]');
    if (!footer || !nav) return;
    
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          nav.classList.add('nav-hidden-over-footer');
        } else {
          nav.classList.remove('nav-hidden-over-footer');
        }
      });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.05 });
    
    observer.observe(footer);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupNavObserver);
  } else {
    setupNavObserver();
  }
})();
</script>
`;

if (!html.includes('id="grand-footer-nav-observer"')) {
  html = html.replace('</body>', navObserverScript + '\n</body>');
} else {
  html = html.replace(/<script id="grand-footer-nav-observer">[\s\S]*?<\/script>/, navObserverScript.trim());
}

console.log('4. FIXING FOOTER MARQUEE (GIANT CONTINUOUS LOOP LIKE INDEX.HTML)');
// In index.html, the marquee uses the full 2405px SVG at 300px height.
// Let's ensure the marquee ticker uses full responsive scale (not clamped to 92vw) and continuous infinite keyframes.
const marqueeFixCss = `
<style id="grand-marquee-full-parity">
  .grand-ticker-container,
  .framer-n49p1z.grand-ticker-container {
    display: flex !important;
    overflow: hidden !important;
    width: 100% !important;
    position: relative !important;
    gap: 0 !important;
    mask-image: none !important;
    -webkit-mask-image: none !important;
    padding: 30px 0 10px 0 !important;
  }

  .grand-ticker-track {
    display: flex !important;
    flex-shrink: 0 !important;
    align-items: center !important;
    animation: grand-ticker-scroll 24s linear infinite !important;
    will-change: transform !important;
    gap: 0 !important;
  }

  .grand-ticker-track .ticker-item {
    flex-shrink: 0 !important;
    margin-right: 120px !important;
    display: flex !important;
    align-items: center !important;
  }

  /* Full-bleed giant SVG logo matching index.html */
  .framer-xj8hz2 {
    width: 2164px !important;
    height: 270px !important;
    background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%202404.809%20300.206%22%20overflow%3D%22visible%22%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22225%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Lay%20Grotesk%20Regular'%2C%20sans-serif%22%20font-size%3D%22192%22%20font-weight%3D%22700%22%20letter-spacing%3D%220.08em%22%20fill%3D%22rgb(255%2C%20240%2C%20202)%22%3ETHE%20GRAND%3C%2Ftext%3E%3C%2Fsvg%3E") !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    display: block !important;
  }

  @keyframes grand-ticker-scroll {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
  }

  @media (max-width: 809.98px) {
    .framer-xj8hz2 {
      width: 1200px !important;
      height: 150px !important;
    }
    .grand-ticker-track .ticker-item {
      margin-right: 60px !important;
    }
    .grand-ticker-track {
      animation: grand-ticker-scroll 16s linear infinite !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .grand-ticker-track {
      animation-play-state: paused !important;
    }
  }
</style>
`;

if (!html.includes('id="grand-marquee-full-parity"')) {
  html = html.replace('</head>', marqueeFixCss + '\n</head>');
} else {
  html = html.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/, marqueeFixCss.trim());
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully applied all fixes to venues/open-earth-lawn.html!');
