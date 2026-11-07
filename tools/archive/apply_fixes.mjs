import fs from 'fs';

console.log('=== STARTING VENUE SUBPAGE REPLICATION FIXES ===');

const srcHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const homeHtml = fs.readFileSync('index.html', 'utf8');

let html = srcHtml;

// =========================================================================
// 1. BREAKPOINT CSS MEDIA QUERIES
// =========================================================================
console.log('--- 1. Injecting breakpoint CSS definitions ---');
const oldBp = '<style data-framer-breakpoint-css>@media(min-width: 1600px){.hidden-1azqig2{display:none!important}}@media(min-width: 810px) and (max-width: 1599.98px){.hidden-1l94oxb{display:none!important}}@media(max-width: 809.98px){.hidden-u6hac7{display:none!important}}</style>';
const newBp = '<style data-framer-breakpoint-css>@media(min-width: 1600px){.hidden-1azqig2,.hidden-72rtr7{display:none!important}}@media(min-width: 810px) and (max-width: 1599.98px){.hidden-1l94oxb,.hidden-p8zd8m{display:none!important}}@media(max-width: 809.98px){.hidden-u6hac7,.hidden-o5o8qi{display:none!important}}</style>';

if (html.includes(oldBp)) {
  html = html.replace(oldBp, newBp);
  console.log('Successfully injected .hidden-o5o8qi, .hidden-72rtr7, .hidden-p8zd8m into breakpoint CSS');
} else {
  console.warn('Warning: oldBp exact match not found, checking existing content...');
}

// =========================================================================
// 2. GALLERY: IMAGES, CAPTIONS, RIGHT-ALIGN COUNTER & FRACTION FORMAT
// =========================================================================
console.log('--- 2. Updating Gallery Carousel ---');

// Replace 6 slide photos
const galleryImageHashes = [
  'CVXtCf6tZR6dJm2eWWVQtlAQ',
  'vdC19zZ0zxxk4ZeoeHw8fvtyjY',
  'SddmKT60VwqookDK5SjzoRisU',
  'Kl8CafSwMaWFZNyMbuVHEagIE',
  'udW0XMjifUBJrksLR03ScdX72U8',
  'jucoMWZeVI2eh02fLXEfvUJsSg'
];

galleryImageHashes.forEach((hash, idx) => {
  // Regex to match the img tag containing this hash
  const r = new RegExp(`<img src="https:\\/\\/framerusercontent\\.com\\/images\\/${hash}[^"]*" srcset="[^"]*"[^>]*>`, 'g');
  const replacement = `<img src="/images/venues/the_grand_open_earth_lawn_hero.jpg" srcset="/images/venues/the_grand_open_earth_lawn_hero.jpg 512w, /images/venues/the_grand_open_earth_lawn_hero.jpg 1024w, /images/venues/the_grand_open_earth_lawn_hero.jpg 1500w" sizes="(min-width: 1600px) min(100vw, 1500px), (min-width: 810px) and (max-width: 1599.98px) min(100vw, 1200px), (max-width: 809.98px) min(100vw, 810px)" alt="Open Earth Lawn • The Grand" loading="lazy" decoding="async" fetchpriority="auto" draggable="false" style="position:absolute;top:-8%;left:0;right:0;width:100%;height:116%;object-fit:cover;display:block">`;
  html = html.replace(r, replacement);
  console.log(`Replaced slide photo ${idx + 1} (${hash})`);
});

// Remove room/space captions (<div class="framer-1dt4o5i">...</div>)
const captionRegex = /<div class="framer-1dt4o5i" data-framer-component-type="RichTextContainer"[\s\S]*?<\/div>/g;
const capCount = (html.match(captionRegex) || []).length;
html = html.replace(captionRegex, '');
console.log(`Removed ${capCount} caption containers (Living Room / Bedroom)`);

// Format slide counters strictly as 1/6, 2/6, 3/6, 4/6, 5/6, 6/6 and remove .framer-1fsmaa4
for (let n = 1; n <= 6; n++) {
  const counterRegex = new RegExp(`<div class="framer-1denn2w" data-framer-component-type="RichTextContainer"[^>]*><p [^>]*>${n}<\\/p><\\/div><div class="framer-1fsmaa4" data-framer-component-type="RichTextContainer"[^>]*><p [^>]*>\\/ 6<\\/p><\\/div>`, 'g');
  const replacement = `<div class="framer-1denn2w" data-framer-component-type="RichTextContainer" style="--extracted-r6o4lv:var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2);transform:none"><p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var(--extracted-r6o4lv, var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2))">${n}/6</p></div>`;
  html = html.replace(counterRegex, replacement);
  console.log(`Formatted slide counter ${n}/6`);
}

// Add CSS for .framer-6rg8a { justify-content: flex-end !important; }
if (!html.includes('.framer-6rg8a{justify-content:flex-end!important}')) {
  html = html.replace('</head>', '<style id="grand-gallery-custom-css">.framer-6rg8a, .framer-6iEzR .framer-6rg8a { justify-content: flex-end !important; }</style></head>');
  console.log('Injected .framer-6rg8a justify-content: flex-end CSS');
}

// =========================================================================
// 3. LOCATION OVERLAP & BUTTON STYLING
// =========================================================================
console.log('--- 3. Updating Location Overlap & Button ---');

// Set watermark contrast to #4E5240, text-transform: capitalize, and button styling in CSS
const locCustomCss = `
<style id="grand-location-contrast-css">
#bigtext-1 h2 {
  color: #4E5240 !important;
  text-transform: capitalize !important;
}
#bigtext-1 h2 span {
  color: #4E5240 !important;
  text-transform: capitalize !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2,
#bigtext-1 a.dark-btn {
  background-color: #616452 !important;
  color: #FFF0CA !important;
  opacity: 1 !important;
  border-color: #616452 !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2 *,
#bigtext-1 a.dark-btn * {
  color: #FFF0CA !important;
  fill: #FFF0CA !important;
}
</style>
`;
if (!html.includes('id="grand-location-contrast-css"')) {
  html = html.replace('</head>', `${locCustomCss}</head>`);
  console.log('Injected grand-location-contrast-css');
}

// Update scroll handler at lines 2352+:
// dimOpacity = 0.50, target locH.style.opacity instead of locSec.style.opacity
const oldLocScroll = `        var fadeStart = 180;
        var fadeEnd = 50;
        var dimOpacity = 0.35;

        if (r.top >= fadeStart) {
          locSec.style.opacity = '1';
        } else if (r.top <= fadeEnd) {
          locSec.style.opacity = dimOpacity.toString();
        } else {
          var progress = (r.top - fadeEnd) / (fadeStart - fadeEnd);
          var currentOpacity = dimOpacity + progress * (1 - dimOpacity);
          locSec.style.opacity = currentOpacity.toFixed(3);
        }`;

const newLocScroll = `        var fadeStart = 180;
        var fadeEnd = 50;
        var dimOpacity = 0.50;

        locSec.style.opacity = '1';
        if (r.top >= fadeStart) {
          locH.style.opacity = '1';
        } else if (r.top <= fadeEnd) {
          locH.style.opacity = dimOpacity.toString();
        } else {
          var progress = (r.top - fadeEnd) / (fadeStart - fadeEnd);
          var currentOpacity = dimOpacity + progress * (1 - dimOpacity);
          locH.style.opacity = currentOpacity.toFixed(3);
        }`;

if (html.includes(oldLocScroll)) {
  html = html.replace(oldLocScroll, newLocScroll);
  console.log('Updated onLocScroll to dim heading only with dimOpacity = 0.50 and keep locSec at solid 1');
} else {
  console.warn('Warning: oldLocScroll snippet not matched directly!');
}

// =========================================================================
// 4. MAP BADGE & PULSE POSITIONING
// =========================================================================
console.log('--- 4. Repositioning Map Badge & Pulse ---');

// In inline style
html = html.replace(
  'id="grand-live-pointer" style="position: absolute; left: 50%; top: 50%;',
  'id="grand-live-pointer" style="position: absolute; left: 32%; top: 38%;'
);

// In grand-subpage-map-styles CSS tag
const mapCssReplacement = `
  #grand-live-pointer {
    left: 32% !important;
    top: 38% !important;
  }
  @media (max-width: 809.98px) {
    #grand-live-pointer {
      left: 28% !important;
      top: 36% !important;
    }
  }
`;
if (!html.includes('#grand-live-pointer {\n    left: 32% !important;')) {
  html = html.replace('</style>\n\n  <style id="grand-subpage-map-styles">', `</style>\n  <style id="grand-subpage-map-styles">\n${mapCssReplacement}`);
  console.log('Injected map pointer position rules into grand-subpage-map-styles');
}

// =========================================================================
// 5. OTHER VENUES CARDS & LINKS
// =========================================================================
console.log('--- 5. Updating Other Venues Cards ---');

// Card 1: Grassland Gala (replace black SVG and heading)
// 1. Image
const oldCard1ImgRegex = /<img src="data:image\/svg\+xml;utf8,<svg [^"]*fill='%23141a15'[^"]*" srcset="[^"]*" sizes="[^"]*" alt="[^"]*" loading="lazy" decoding="async" fetchpriority="auto" draggable="false" style="position:absolute;top:-8%;left:0;right:0;width:100%;height:116%;object-fit:cover;display:block">/;
const newCard1Img = `<img src="/images/card_2_grassland_gala.webp" srcset="/images/card_2_grassland_gala.webp 512w, /images/card_2_grassland_gala.webp 1024w" sizes="(min-width: 1600px) min(125vw, 1200px), (min-width: 810px) and (max-width: 1599.98px) min(125vw, 1200px), (max-width: 809.98px) min(125vw, 1200px)" alt="Grassland Gala" loading="lazy" decoding="async" fetchpriority="auto" draggable="false" style="position:absolute;top:-8%;left:0;right:0;width:100%;height:116%;object-fit:cover;display:block">`;

if (oldCard1ImgRegex.test(html)) {
  html = html.replace(oldCard1ImgRegex, newCard1Img);
  console.log('Replaced Card 1 black SVG with /images/card_2_grassland_gala.webp');
} else {
  console.warn('Warning: oldCard1ImgRegex did not match!');
}

// 2. Card 1 heading: "Open Earth Lawn" ... "N°2" -> "Grassland Gala"
const oldCard1Heading = '<span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(50px) rotate(8deg)">Open Earth Lawn</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(50px) rotate(8deg)">N°2</span>';
const newCard1Heading = '<span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(50px) rotate(8deg)">Grassland Gala</span>';

if (html.includes(oldCard1Heading)) {
  html = html.replace(oldCard1Heading, newCard1Heading);
  console.log('Replaced Card 1 heading with Grassland Gala');
} else {
  console.warn('Warning: oldCard1Heading not matched directly!');
}

// Card 2: Garden Galaxy (replace Framer image and heading)
// 1. Image
const oldCard2ImgRegex = /<img src="https:\/\/framerusercontent\.com\/images\/UayMv2I16UbQQBQkbI90HsJMv5o\.webp[^"]*" srcset="[^"]*" sizes="[^"]*" alt="[^"]*" loading="lazy" decoding="async" fetchpriority="auto" draggable="false" style="position:absolute;top:-8%;left:0;right:0;width:100%;height:116%;object-fit:cover;display:block">/;
const newCard2Img = `<img src="/images/card_3_ballroom.webp" srcset="/images/card_3_ballroom.webp 512w, /images/card_3_ballroom.webp 1024w" sizes="(min-width: 1600px) min(125vw, 1200px), (min-width: 810px) and (max-width: 1599.98px) min(125vw, 1200px), (max-width: 809.98px) min(125vw, 1200px)" alt="Garden Galaxy" loading="lazy" decoding="async" fetchpriority="auto" draggable="false" style="position:absolute;top:-8%;left:0;right:0;width:100%;height:116%;object-fit:cover;display:block">`;

if (oldCard2ImgRegex.test(html)) {
  html = html.replace(oldCard2ImgRegex, newCard2Img);
  console.log('Replaced Card 2 image with /images/card_3_ballroom.webp');
} else {
  console.warn('Warning: oldCard2ImgRegex did not match!');
}

// 2. Card 2 heading: "Open Earth Lawn" ... "N°3" -> "Garden Galaxy"
const oldCard2Heading = '<span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(50px) rotate(8deg)">Open Earth Lawn</span></span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(50px) rotate(8deg)">N°3</span>';
const newCard2Heading = '<span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY(50px) rotate(8deg)">Garden Galaxy</span>';

if (html.includes(oldCard2Heading)) {
  html = html.replace(oldCard2Heading, newCard2Heading);
  console.log('Replaced Card 2 heading with Garden Galaxy');
} else {
  console.warn('Warning: oldCard2Heading not matched directly!');
}

// =========================================================================
// 6. UNIVERSAL FOOTER REPLICATION
// =========================================================================
console.log('--- 6. Replicating Universal Footer from index.html ---');

// Extract canonical footer from index.html
const homeFooterMatch = homeHtml.match(/<footer[\s\S]*?<\/footer>/);
let canonicalFooter = homeFooterMatch[0];

// Replace ticker with pure CSS 2-track marquee ticker in both variants
const tickerRegex = /<div class="framer-n49p1z"[^>]*data-framer-name="Footer Logo"[^>]*>[\s\S]*?<\/ul><\/div>/g;

const pureCssTicker = `<div class="framer-n49p1z grand-ticker-container" data-framer-name="Footer Logo">
  <div class="grand-ticker-track track-a">
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
  </div>
  <div class="grand-ticker-track track-b" aria-hidden="true">
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
    <div class="ticker-item"><div class="framer-xj8hz2" aria-label="THE GRAND"></div></div>
  </div>
</div>`;

canonicalFooter = canonicalFooter.replace(tickerRegex, pureCssTicker);

// Clean up rolling labels and eliminate character splitting
// Replace <!--$--><span data-rolling-label ...>...</span><!--/$--> with solid text span
canonicalFooter = canonicalFooter.replace(/<!--\$--><span data-rolling-label style="([^"]*)"[\s\S]*?<\/span><!--\/\$-->/g, (match, styleAttr) => {
  const srMatch = match.match(/<span style="[^"]*clip:rect\(0 0 0 0\)[^"]*">([^<]+)<\/span>/);
  let label = srMatch ? srMatch[1].trim() : '';
  if (!label) {
    const chars = [...match.matchAll(/<span style="visibility:hidden">([^<]+)<\/span>/g)].map(m => m[1]).join('');
    label = chars || '';
  }
  if (label === 'Apartments' || label === 'Boutique' || label === 'Venue' || label === 'Venues') {
    label = 'Venues';
  } else if (label === 'About') {
    label = 'About';
  } else if (label === 'Contact') {
    label = 'Contact';
  } else if (label === 'Instagram') {
    label = 'Instagram';
  } else if (label === 'Facebook' || label === 'LinkedIn') {
    label = 'Facebook';
  } else if (label === 'Imprint') {
    label = 'Imprint';
  } else if (label === 'Terms') {
    label = 'Terms';
  } else if (label === 'Privacy') {
    label = 'Privacy';
  } else if (label.includes('@')) {
    label = 'Thegrandbanquet07@gmail.com';
  } else if (label.includes('+') || label.includes('43') || label.includes('91')) {
    label = '+91 91291 27091';
  }
  return `<!--$--><span class="grand-footer-link-text" style="${styleAttr}">${label}</span><!--/$-->`;
});

// Force all initial hidden states to visible in the footer
canonicalFooter = canonicalFooter.replace(/opacity:\s*(?:0|0\.1)(;|\")/g, 'opacity: 1$1');
canonicalFooter = canonicalFooter.replace(/transform:\s*translateY\(-?[0-9]+px\)/g, 'transform: none');

// Apply subpage routing and contact info
canonicalFooter = canonicalFooter.replaceAll('href="./venues"', 'href="/venues"');
canonicalFooter = canonicalFooter.replaceAll('href="./about"', 'href="/about"');
canonicalFooter = canonicalFooter.replaceAll('href="./contact"', 'href="/contact"');
canonicalFooter = canonicalFooter.replaceAll('href="./imprint"', 'href="/imprint"');
canonicalFooter = canonicalFooter.replaceAll('href="./terms"', 'href="/terms"');
canonicalFooter = canonicalFooter.replaceAll('href="./privacy"', 'href="/privacy"');
canonicalFooter = canonicalFooter.replaceAll('tel:+436641999605', 'tel:+919129127091');
canonicalFooter = canonicalFooter.replaceAll('+43 664 1999605', '+91 91291 27091');
canonicalFooter = canonicalFooter.replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com');
canonicalFooter = canonicalFooter.replaceAll('https://nexene.at/', 'https://elvar.in/edifice');
canonicalFooter = canonicalFooter.replaceAll('https://nexene.at', 'https://elvar.in/edifice');
canonicalFooter = canonicalFooter.replaceAll('Nexene', 'Edifice');

// Build modern CSS for universal-grand-footer-styles
const newFooterStyles = `
<style id="universal-grand-footer-styles">
footer.framer-18na9ah {
  max-width: 100% !important;
  height: min-content !important;
  overflow: clip !important;
  background-color: var(--token-16db3221-68a2-44ed-9694-dc30db0040db, rgb(20, 26, 21)) !important;
  position: relative !important;
  display: block !important;
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

footer.framer-18na9ah .ssr-variant {
  width: 100% !important;
}

footer.framer-18na9ah .framer-192t1bg-container {
  width: 100% !important;
  height: auto !important;
  position: relative !important;
  opacity: 1 !important;
  transform: none !important;
}

footer.framer-18na9ah .framer-zHQwT {
  width: 100% !important;
  opacity: 1 !important;
  transform: none !important;
}

/* THE GRAND LOGO BANNER (EXACT MATCH WITH index.html:520) */
.framer-xj8hz2 {
  width: min(1203px, 92vw) !important;
  height: 150px !important;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%202404.809%20300.206%22%20overflow%3D%22visible%22%3E%3Ctext%20x%3D%2250%25%22%20y%3D%22225%22%20text-anchor%3D%22middle%22%20font-family%3D%22'Lay%20Grotesk%20Regular'%2C%20sans-serif%22%20font-size%3D%22192%22%20font-weight%3D%22700%22%20letter-spacing%3D%220.08em%22%20fill%3D%22var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2%2C%20rgb(243%2C%20236%2C%20221))%22%3ETHE%20GRAND%3C%2Ftext%3E%3C%2Fsvg%3E") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  margin: 0 auto !important;
  display: block !important;
}

@media (max-width: 809.98px) {
  .framer-xj8hz2 {
    width: 90vw !important;
    height: 70px !important;
  }
}

/* PURE CSS 2-TRACK MARQUEE TICKER (SEAMLESS INFINITE LOOP) */
.grand-ticker-container {
  display: flex !important;
  overflow: hidden !important;
  width: 100% !important;
  position: relative !important;
  mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
}

.grand-ticker-track {
  display: flex !important;
  flex-shrink: 0 !important;
  align-items: center !important;
  animation: grand-ticker-scroll 25s linear infinite !important;
  will-change: transform !important;
}

.grand-ticker-track .ticker-item {
  flex-shrink: 0 !important;
  margin-right: 81px !important;
  display: flex !important;
  align-items: center !important;
}

@keyframes grand-ticker-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}

@media (max-width: 809.98px) {
  .grand-ticker-track {
    animation: grand-ticker-scroll 18s linear infinite !important;
  }
  .grand-ticker-track .ticker-item {
    margin-right: 40px !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .grand-ticker-track {
    animation-play-state: paused !important;
  }
}

/* SOLID FOOTER LINK HOVER TRANSITION (ZERO CHARACTER TEARING) */
footer.framer-18na9ah a {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  text-decoration: none !important;
}

footer.framer-18na9ah a:hover {
  opacity: 0.65 !important;
}

.grand-footer-link-text {
  display: inline-block !important;
}
</style>
`;

// Locate footer section in open-earth-lawn.html:
// From <style id="universal-grand-footer-styles"> up to the end of <script id="grand-footer-motion-script">...</script>
const footerStartIdx = html.indexOf('<style id="universal-grand-footer-styles">');
const footerEndIdx = html.indexOf('</script>\n\n<!-- ========================================== -->', footerStartIdx);

if (footerStartIdx !== -1 && footerEndIdx !== -1) {
  const replaceEnd = footerEndIdx + '</script>'.length;
  // Also add sticky CTA observer script
  const ctaObserverScript = `
<script id="grand-footer-cta-observer">
(function() {
  var stickyBtn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
  var footer = document.querySelector('footer.framer-18na9ah');
  if (stickyBtn && footer && window.IntersectionObserver) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          stickyBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          stickyBtn.style.opacity = '0';
          stickyBtn.style.pointerEvents = 'none';
        } else {
          stickyBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          stickyBtn.style.opacity = '1';
          stickyBtn.style.pointerEvents = 'auto';
        }
      });
    }, { threshold: 0.05 });
    observer.observe(footer);
  }
})();
</script>
`;
  const fullFooterBlock = `${newFooterStyles}\n${canonicalFooter}\n${ctaObserverScript}`;
  html = html.slice(0, footerStartIdx) + fullFooterBlock + html.slice(replaceEnd);
  console.log('Replaced entire footer section with canonical dual-variant SSR footer, pure CSS marquee, and eliminated initGrandFooterMotions');
} else {
  console.error('Could not locate footerStartIdx or footerEndIdx in open-earth-lawn.html!');
  process.exit(1);
}

// Write the transformed file
fs.writeFileSync('venues/open-earth-lawn.html', html, 'utf8');
console.log('Successfully wrote updated venues/open-earth-lawn.html (Size:', html.length, 'bytes)');
