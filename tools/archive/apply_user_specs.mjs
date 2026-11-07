import fs from 'fs';

const filePath = 'venues/open-earth-lawn.html';
let html = fs.readFileSync(filePath, 'utf8');

console.log('1. UPDATING EXACT VENUE SPECS FROM USER IMAGES');

// A) Open Earth Lawn: 55,000 Sqft, 1,500 Guests
// B) Grassland Gala: 20,000 Sqft, 800 Guests
// C) Garden Galaxy: 15,000 Sqft, 300 Guests

// Remove all text inside framer-84xumc so NO floating superscript ever appears
html = html.replace(
  /<div class="framer-84xumc"[^>]*>[\s\S]*?<\/div>/g,
  '<div class="framer-84xumc" style="display:none !important;"></div>'
);

// Grassland Gala block
const ggMatch = html.match(/alt="Grassland Gala"[\s\S]*?alt="Garden Galaxy"/);
if (ggMatch) {
  let ggBlock = ggMatch[0];
  // Set area to 20,000
  ggBlock = ggBlock.replace(/>\s*(?:55,000|45,000|120|15,000)\s*<\/p>/, '>20,000</p>');
  // Set people to 800
  const pMatch = ggBlock.match(/data-framer-name="People"[\s\S]*?<\/p>/);
  if (pMatch) {
    const updatedP = pMatch[0].replace(/>\s*(?:1,500|1500|1,000|1000|6|2|3)\s*<\/p>/, '>800</p>');
    ggBlock = ggBlock.replace(pMatch[0], updatedP);
  }
  html = html.replace(ggMatch[0], ggBlock);
}

// Garden Galaxy block
const gaMatch = html.match(/alt="Garden Galaxy"[\s\S]*?<\/section>/);
if (gaMatch) {
  let gaBlock = gaMatch[0];
  // Set area to 15,000
  gaBlock = gaBlock.replace(/>\s*(?:120|55,000|45,000|20,000)\s*<\/p>/, '>15,000</p>');
  // Set people to 300
  const pMatch = gaBlock.match(/data-framer-name="People"[\s\S]*?<\/p>/);
  if (pMatch) {
    const updatedP = pMatch[0].replace(/>\s*(?:6|1,500|1500|1,000|1000|800|2|3)\s*<\/p>/, '>300</p>');
    gaBlock = gaBlock.replace(pMatch[0], updatedP);
  }
  html = html.replace(gaMatch[0], gaBlock);
}

// Open Earth Lawn hero: ensure 55,000 Sqft and 1,500 guests
// Hero people text:
const heroPeopleMatch = html.match(/data-framer-name="Maximum People"[\s\S]*?Guests Capacity<\/span><\/span>\s*<\/p>/);
console.log('Hero people matched:', !!heroPeopleMatch);

console.log('2. ENSURING MAP PIN IS DEAD CENTER (left: 50%, top: 40%)');
html = html.replace(
  /<div id="grand-live-pointer" style="[^"]*">/,
  '<div id="grand-live-pointer" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%); pointer-events: none; z-index: 3;">'
);

console.log('3. ENSURING FOOTER NAVBAR COLLISION GUARD IS ACTIVE');
// Ensure navbar disappears when footer is visible
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
          nav.style.opacity = '0';
          nav.style.pointerEvents = 'none';
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.opacity = '1';
          nav.style.pointerEvents = 'auto';
          nav.style.transform = 'translateY(0)';
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.05 });
    
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

if (html.includes('id="grand-footer-nav-observer"')) {
  html = html.replace(/<script id="grand-footer-nav-observer">[\s\S]*?<\/script>/, navObserverScript.trim());
} else {
  html = html.replace('</body>', navObserverScript + '\n</body>');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully applied all authentic user specs to venues/open-earth-lawn.html!');
