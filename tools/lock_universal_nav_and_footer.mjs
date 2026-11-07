import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo';

// 1. Text swapping function matching server.mjs
function swapText(content) {
  if (typeof content !== 'string') return content;
  return content
    // Attribution
    .replaceAll('https://nexene.at/', 'https://elvar.in/edifice')
    .replaceAll('https://nexene.at', 'https://elvar.in/edifice')
    .replaceAll('Made with love by', 'Built by')
    .replaceAll('eYOd1t1bt:`Nexene`', 'eYOd1t1bt:`Edifice`')
    .replaceAll('children:`Nexene`', 'children:`Edifice`')
    .replaceAll('children:`Made with love by`', 'children:`Built by`')
    .replaceAll('children:`Design & development`', 'children:`Built by`')

    // Contact & collective voice
    .replaceAll('or your stay?', 'or your celebration?')
    .replaceAll('or your stay', 'or your celebration')
    .replaceAll('send me an email', 'send us an email')
    .replaceAll('give me a call', 'give us a call')
    .replaceAll('send me', 'send us')
    .replaceAll('give me', 'give us')
    .replaceAll("I'd be happy to help you personally", 'We would be delighted to assist you with your celebration')
    .replaceAll('I’d be happy to help you personally', 'We would be delighted to assist you with your celebration')

    // Socials: Facebook only, NO LinkedIn
    .replaceAll('https://www.linkedin.com/in/thegrand-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/thegrand-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b/', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('https://www.linkedin.com/in/moritz-steinlechner-045a4417b', 'https://www.facebook.com/thegrandlucknow/')
    .replaceAll('eYOd1t1bt:`LinkedIn`', 'eYOd1t1bt:`Facebook`')
    .replaceAll('>LinkedIn<', '>Facebook<')

    // Venue Names
    .replaceAll('Boutique N°1', 'Open Earth Lawn')
    .replaceAll('Venue N°1', 'Open Earth Lawn')
    .replaceAll('Boutique N°2', 'Grassland Gala')
    .replaceAll('Venue N°2', 'Grassland Gala')
    .replaceAll('Boutique N°3', 'Garden Galaxy')
    .replaceAll('Venue N°3', 'Garden Galaxy')
    .replaceAll('Boutique N°4', 'The Royal Legacy Banquet')
    .replaceAll('Venue N°4', 'The Royal Legacy Banquet')
    .replaceAll('Loft N°1', 'Garden Pavilion')
    .replaceAll('Venue N°5', 'Garden Pavilion')
    .replaceAll('Loft N°2', 'The Royal Mandap')
    .replaceAll('Venue N°6', 'The Royal Mandap')
    .replaceAll('Loft N°3', 'The Dining Expanse')
    .replaceAll('Venue N°7', 'The Dining Expanse')
    .replaceAll('Garden N°1', 'VIP Atrium')
    .replaceAll('Venue N°8', 'VIP Atrium')
    .replaceAll('Urban N°1', 'Presidential Suite')
    .replaceAll('Venue N°9', 'Presidential Suite')

    // Cursor
    .replaceAll('label:`Venue Details`', 'label:`Details`')
    .replaceAll('label:`Apartment Details`', 'label:`Details`')
    .replaceAll('text:`Venue Details`', 'text:`Details`')
    .replaceAll('text:`Apartment Details`', 'text:`Details`')
    .replaceAll('Apartment Details ↗', 'Details ↗')
    .replaceAll('Venue Details ↗', 'Details ↗')
    .replaceAll('Apartment Details', 'Details')
    .replaceAll('Venue Details', 'Details')
    .replaceAll('Apartment Size', 'Venue Scale')
    .replaceAll('Apartment size', 'Venue scale')
    .replaceAll('45 m²', '20,000 sq ft')
    .replaceAll('45&nbsp;m²', '20,000 sq ft')
    .replaceAll('20,000 sq ft sq ft', '20,000 sq ft')
    .replaceAll('>m²<', '>sq ft<')
    .replaceAll('>m²</span>', '>sq ft</span>')
    .replaceAll('m²', 'sq ft')

    // Philosophy & About
    .replaceAll('My Philosophy', 'Our Vision')
    .replaceAll('a temporary home deserves just as much care as your own home.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll('a temporary home deserves as much care as your own.', 'every celebration deserves a setting as grand as your vision.')
    .replaceAll("Hi, I'm Moritz", "Architectural Poise & Estate Hospitality")
    .replaceAll('I believe', 'We believe')

    // Address & Contact
    .replaceAll('Schönaugasse 76, 8010 Lucknow, India', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India')
    .replaceAll('Schönaugasse 76, 8010 Graz', '22, Raibareli Rd, Bindaua, Lucknow, Uttar Pradesh 226301, India')
    .replaceAll('Moritz Steinlechner, The Grand', 'The Grand (Banquet & Event Estate)')
    .replaceAll('Moritz Steinlechner', 'The Grand')
    .replaceAll('office@casamomo.at', 'office@thegrandlucknow.in')
    .replaceAll('Thegrandbanquet07@gmail.com', 'office@thegrandlucknow.in')
    .replaceAll('+43 664 1999605', '+91 91291 27091')
    .replaceAll('+43 664 1555605', '+91 91291 27091')
    .replaceAll('+436641999605', '+919129127091')
    .replaceAll('+436641555605', '+919129127091')

    // Map Landmarks
    .replaceAll('Main Square', 'Shaheed Path')
    .replaceAll('Schlossberg', 'Gomti Riverfront')
    .replaceAll('Schloßberg', 'Gomti Riverfront')
    .replaceAll('Mur Island', 'Raibareli Road')
    .replaceAll('Stadtpark', 'Bindaua Estate')
    .replaceAll('Lendplatz', 'SGPGI Hub')
    .replaceAll('Opera', 'Mohanlalganj')
    .replaceAll('Jakominiplatz', 'Hazratganj')
    .replaceAll('Kunsthaus', 'Charbagh')
    .replaceAll('Main Station', 'Amar Shaheed Path')
    .replaceAll('Volksgarten', 'Kisan Path')
    .replaceAll('Augarten', 'Alambagh')

    // Brand and Paths
    .replaceAll('https://framerusercontent.com/sites/1bk9uGIcxVnDnwzQnwlcko/', '/scripts/')
    .replaceAll('https://www.casamomo.at', 'https://www.thegrandlucknow.in')
    .replaceAll('casamomo.at', 'thegrandlucknow.in')
    .replaceAll('Casa Momo', 'The Grand')
    .replaceAll('THE GRAND LUCKNOW', 'THE GRAND')
    .replaceAll('The Grand Lucknow', 'The Grand');
}

// 2. Read Canonical Header & Footer from tools/
const canonicalHeader = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_header.html'), 'utf8');
const canonicalFooter = fs.readFileSync(path.join(ROOT, 'tools', 'canonical_footer.html'), 'utf8');

// 3. Read Authentic Serif Vector SVG Data URI
const desktopSvg = fs.readFileSync(path.join(ROOT, 'tools', 'archive', 'the_grand_footer_desktop.svg'), 'utf8');
const desktopSvgDataUri = 'data:image/svg+xml,' + encodeURIComponent(desktopSvg);

// 4. Extract the 3 SVGs from index.html
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const svgIds = ['svg-1334768056_3843', 'svg-1267704399_390', 'svg870196829_4253'];
const canonicalSvgs = [];
for (const id of svgIds) {
  const regex = new RegExp(`<svg[^>]*id="${id}"[\\s\\S]*?<\\/svg>`, 'i');
  const m = indexHtml.match(regex);
  if (m) {
    canonicalSvgs.push(m[0]);
  }
}

// 5. Universal Style and Marquee Engine
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

export function lockPage(relativeFilePath) {
  const fullPath = path.join(ROOT, relativeFilePath);
  if (!fs.existsSync(fullPath)) {
    console.warn('File not found, skipping:', relativeFilePath);
    return false;
  }
  
  let html = fs.readFileSync(fullPath, 'utf8');
  
  // 1. Swap all text content
  html = swapText(html);
  
  // 2. Remove old custom footer styles and scripts
  html = html.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="universal-grand-nav-footer-lock">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="grand-marquee-full-parity">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<style id="grand-ticker-motion">[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script id="grand-footer-ticker-engine">[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script id="universal-grand-ticker-engine">[\s\S]*?<\/script>/gi, '');
  
  // 3. Replace Header
  const curHeaderMatch = html.match(/<header\b[^>]*data-framer-name="Navbar Wrapper"[\s\S]*?<\/header>/i) || html.match(/<header[\s\S]*?<\/header>/i);
  if (curHeaderMatch) {
    html = html.replace(curHeaderMatch[0], canonicalHeader);
  }
  
  // 4. Replace Footer
  const curFooterMatch = html.match(/<footer\b[^>]*data-framer-name="Footer"[\s\S]*?<\/footer>/i) || html.match(/<footer[\s\S]*?<\/footer>/i);
  if (curFooterMatch) {
    html = html.replace(curFooterMatch[0], canonicalFooter);
  }
  
  // 5. Ensure Canonical SVGs exist
  for (const svgId of svgIds) {
    if (!html.includes(`id="${svgId}"`)) {
      const svgTag = canonicalSvgs.find(s => s.includes(`id="${svgId}"`));
      if (svgTag) {
        html = html.replace('</body>', `${svgTag}\n</body>`);
      }
    }
  }
  
  // 6. Inject Universal Style in <head> and Universal Script before </body>
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

console.log(`\nSuccessfully locked universal navbar and footer across ${lockedCount} pages.`);
