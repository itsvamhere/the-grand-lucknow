import fs from 'fs';

// 1. Read authentic serif vector SVG
const serifSvg = fs.readFileSync('tools/archive/the_grand_footer_desktop.svg', 'utf8').trim();
let cleanSvg = serifSvg;
if (!cleanSvg.includes('fill=')) {
  cleanSvg = cleanSvg.replace('<path d=', '<path fill="rgb(255,240,202)" d=');
}
const encodedSvg = encodeURIComponent(cleanSvg);

// 2. Read venues/open-earth-lawn.html
let lawn = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Remove all the bad improvised rules from universal-grand-footer-styles
// Specifically:
// - footer.framer-18na9ah background-color rgb(20, 26, 21)
// - .framer-xj8hz2 width: min(1203px, 92vw) and height: 150px
// - .grand-ticker-container etc.

// Let's replace the entire universal-grand-footer-styles block with the EXACT HOMEPAGE PARITY STYLES
const badStyleStart = lawn.indexOf('<style id="universal-grand-footer-styles">');
const badStyleEnd = lawn.indexOf('</style>', badStyleStart) + 8;

const exactHomepageParityCss = `<style id="universal-grand-footer-styles">
/* EXACT 1:1 REPLICA OF HOMEPAGE FOOTER (NO IMPROVISATION) */
footer.framer-18na9ah {
  max-width: 100% !important;
  height: min-content !important;
  overflow: clip !important;
  background-color: #964317 !important;
  position: relative !important;
  display: flex !important;
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
  background-color: #C2653A !important;
  padding: 256px 48px 48px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  overflow: clip !important;
}

/* EXACT HOMEPAGE TICKER DIMENSIONS: 270px HEIGHT, MASSIVE SERIF LETTERS */
.framer-xj8hz2 {
  width: 2164.5px !important;
  height: 270px !important;
  background-image: url("data:image/svg+xml,${encodedSvg}") !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  margin: 0 -16.2px 0 0 !important;
  display: block !important;
  flex-shrink: 0 !important;
}

.framer-n49p1z {
  width: 2525.39px !important;
  height: 270px !important;
  display: flex !important;
  position: relative !important;
  overflow: clip !important;
}

.framer-n49p1z ul {
  height: 270px !important;
  display: flex !important;
  align-items: center !important;
  gap: 162px !important;
  opacity: 1 !important;
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
}

.framer-n49p1z li,
.framer-n49p1z .ticker-item {
  height: 270px !important;
  width: 2148.31px !important;
  flex-shrink: 0 !important;
  display: flex !important;
  align-items: center !important;
}

/* TICKER CONTINUOUS MOTION */
@keyframes grand-home-ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

footer.framer-18na9ah .framer-n49p1z ul {
  animation: grand-home-ticker 30s linear infinite !important;
  will-change: transform !important;
}

@media (prefers-reduced-motion: reduce) {
  footer.framer-18na9ah .framer-n49p1z ul {
    animation-play-state: paused !important;
  }
}

/* RESPONSIVE MOBILE ADJUSTMENTS */
@media (max-width: 809.98px) {
  footer.framer-18na9ah .framer-zHQwT {
    padding: 120px 24px 32px !important;
  }
  footer.framer-18na9ah .framer-1h4yz5c {
    flex-direction: column !important;
    gap: 36px !important;
    width: 100% !important;
  }
  footer.framer-18na9ah .framer-1bl146l {
    display: flex !important;
    justify-content: space-between !important;
    width: 100% !important;
    gap: 20px !important;
  }
  footer.framer-18na9ah .framer-1h0qpni,
  footer.framer-18na9ah .framer-1fp396q {
    width: auto !important;
    flex: 1 !important;
  }
  footer.framer-18na9ah .framer-vwpsk8 {
    width: 100% !important;
  }
  .framer-xj8hz2 {
    width: 1200px !important;
    height: 150px !important;
  }
  .framer-n49p1z,
  .framer-n49p1z ul,
  .framer-n49p1z li {
    height: 150px !important;
  }
}

/* SOLID FOOTER LINK HOVER */
footer.framer-18na9ah a {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  text-decoration: none !important;
}
footer.framer-18na9ah a:hover {
  opacity: 0.65 !important;
}

.casa-skip:not(:focus) {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}
</style>`;

lawn = lawn.slice(0, badStyleStart) + exactHomepageParityCss + lawn.slice(badStyleEnd);
fs.writeFileSync('venues/open-earth-lawn.html', lawn, 'utf8');
console.log('Replaced universal-grand-footer-styles with exact homepage parity styles!');
