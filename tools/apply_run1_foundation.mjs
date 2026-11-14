import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// Strictly additive CSS (never replaces 0b5a520's #grand-palette or Framer dark/light styling)
const GRAND_RUN1_CSS = `
/* THE GRAND LUCKNOW - ADDITIVE RUN 1 FOUNDATION */
:root {
  --bg-espresso: #14120E;
  --bg-espresso-elevated: #1C1915;
  --bg-sand: #F5EEDB;
  --bg-sand-muted: #EAE0C8;
  --bg-taupe-mid: #6E6853;
  --bg-terracotta-footer: #C46335;
  --bg-terracotta-card: #B85D3B;
  --text-cream: #F5EEDB;
  --text-cream-muted: #B5AEA0;
  --text-charcoal: #14120E;
  --text-charcoal-muted: #5C564B;
  --status-unavailable: #E06D53;
  --gold-accent: #D9A520;
}

[data-surface="dark"] { --bg: #14120E; --fg: #F5EEDB; --fg-muted: #B5AEA0; }
[data-surface="light"] { --bg: #F5EEDB; --fg: #14120E; --fg-muted: #5C564B; }
[data-surface="sand-muted"] { --bg: #EAE0C8; --fg: #14120E; --fg-muted: #5C564B; }
[data-surface="taupe"] { --bg: #6E6853; --fg: #F5EEDB; --fg-muted: #EAE0C8; }
[data-surface="terracotta"] { --bg: #C46335; --fg: #F5EEDB; --fg-muted: #EAE0C8; }
[data-surface="terracotta-card"] { --bg: #B85D3B; --fg: #F5EEDB; --fg-muted: #EAE0C8; }

html, body {
  overflow-x: hidden !important;
  max-width: 100vw !important;
}

/* Mobile Header Centering Fix (neutralize left:50% without translateX(-50%)) & Appear Visibility */
html body header,
html body header.framer-bg7hsc,
html body [data-framer-name="Navbar Wrapper"] {
  pointer-events: none !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: 100vw !important;
  transform: none !important;
}

header a,
header button,
header [role="button"],
header input,
header nav,
header nav a,
header [data-framer-name="Logo"],
header [data-framer-name="Menu Button"],
header .framer-1s5ig4a,
[data-framer-name="Navbar Wrapper"] a,
[data-framer-name="Navbar Wrapper"] button,
[data-framer-name="Navbar Wrapper"] [role="button"] {
  pointer-events: auto !important;
}

/* Prevent vertical clipping on Menu / Close rolling label */
.framer-1s5ig4a [data-rolling-label],
[data-framer-name="Menu Button"] [data-rolling-label],
[data-framer-name="Menu Roll"] [data-rolling-label],
.mc-ch-wrap {
  height: 1.25em !important;
  line-height: 1.25 !important;
  overflow: hidden !important;
}

/* Preserve 8:1 wordmark aspect ratio inside 44px touch target on all viewports */
html body header [data-framer-name="Logo"] img,
html body header a.framer-4iomze img,
html body header a.framer-1ngqbpf img {
  object-fit: contain !important;
  object-position: left center !important;
}

/* Guarantee visible Logo on all non-Home routes immediately at 0% scroll */
html body:not([data-grand-route="/"]) header .framer-QnCu0,
html body:not([data-grand-route="/"]) header .framer-1q3kxxd-container,
html body:not([data-grand-route="/"]).grand-home-ready header .framer-QnCu0,
html body:not([data-grand-route="/"]).grand-home-ready header .framer-1q3kxxd-container {
  opacity: 1 !important;
  visibility: visible !important;
}

html body:not([data-grand-route="/"]) header [data-framer-name="Logo"],
html body:not([data-grand-route="/"]) header a.framer-4iomze,
html body:not([data-grand-route="/"]) header a.framer-1ngqbpf,
html body:not([data-grand-route="/"]).grand-home-ready header [data-framer-name="Logo"],
html body:not([data-grand-route="/"]).grand-home-ready header a.framer-4iomze,
html body:not([data-grand-route="/"]).grand-home-ready header a.framer-1ngqbpf {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

@media (min-width: 810px) {
  html body header .framer-1nw9de0-container,
  html body header nav[name="Navbar Menu"],
  html body header .framer-1kcv8in,
  html body header .framer-1t6aeyj-container {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
}

/* Tablet and Phone touch target minimum (>= 44px) & Menu Button visibility */
@media (max-width: 809.98px) {
  html body header .framer-p57yy4-container,
  html body header [data-framer-name="Mobile Menu"],
  html body header .framer-1s5ig4a,
  html body header [data-framer-name="Menu Button"],
  html body header [data-framer-name="Mobile Menu"] [data-highlight="true"],
  html body header [data-framer-name="Mobile Navbar"] [data-highlight="true"] {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
  }

  html body header .framer-1s5ig4a,
  html body header [data-framer-name="Menu Button"],
  html body header [data-framer-name="Mobile Menu"] [data-highlight="true"],
  html body header [data-framer-name="Mobile Navbar"] [data-highlight="true"] {
    min-height: 44px !important;
    height: 44px !important;
    max-height: 44px !important;
    min-width: 68px !important;
    width: auto !important;
    max-width: none !important;
    padding: 8px 14px !important;
    top: 14px !important;
    right: 16px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}

@media (max-width: 1023.98px) {
  html body header nav a,
  html body header [data-framer-name="Logo"],
  html body [data-framer-name="Menu Overlay"] a,
  html body .framer-1763xqs a {
    min-height: 44px !important;
    min-width: 44px !important;
    display: inline-flex !important;
    align-items: center !important;
  }

  /* Context-aware Mobile Menu drawer polarity */
  body.casa-menu-open.grand-menu-light .framer-1763xqs,
  body.casa-menu-open.grand-menu-light [data-framer-name="Menu Overlay"],
  body.menu-open.grand-menu-light .framer-1763xqs,
  body.menu-open.grand-menu-light [data-framer-name="Menu Overlay"] {
    background-color: #F5EEDB !important;
    color: #14120E !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    z-index: 9999 !important;
  }

  body.casa-menu-open.grand-menu-light [data-framer-name="Menu Overlay"] a,
  body.casa-menu-open.grand-menu-light [data-framer-name="Menu Overlay"] a *,
  body.menu-open.grand-menu-light [data-framer-name="Menu Overlay"] a,
  body.menu-open.grand-menu-light [data-framer-name="Menu Overlay"] a * {
    color: #14120E !important;
  }

  body.casa-menu-open:not(.grand-menu-light) .framer-1763xqs,
  body.casa-menu-open:not(.grand-menu-light) [data-framer-name="Menu Overlay"],
  body.menu-open:not(.grand-menu-light) .framer-1763xqs,
  body.menu-open:not(.grand-menu-light) [data-framer-name="Menu Overlay"] {
    background-color: #14120E !important;
    color: #F5EEDB !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    z-index: 9999 !important;
  }

  body.casa-menu-open:not(.grand-menu-light) [data-framer-name="Menu Overlay"] a,
  body.casa-menu-open:not(.grand-menu-light) [data-framer-name="Menu Overlay"] a *,
  body.menu-open:not(.grand-menu-light) [data-framer-name="Menu Overlay"] a,
  body.menu-open:not(.grand-menu-light) [data-framer-name="Menu Overlay"] a * {
    color: #F5EEDB !important;
  }
}

/* Hide floating scroll-to-top button when mobile menu or sticky CTA is active */
body.casa-menu-open .scroll-to-top,
body.menu-open .scroll-to-top,
body.casa-menu-open [data-framer-name="Scroll Top"],
body.menu-open [data-framer-name="Scroll Top"],
body.casa-menu-open [data-framer-name="Scroll to top"],
body.menu-open [data-framer-name="Scroll to top"],
body.casa-menu-open a[href="#top"],
body.menu-open a[href="#top"],
body.sticky-cta-open a[href="#top"] {
  opacity: 0 !important;
  pointer-events: none !important;
  visibility: hidden !important;
}
`;

// Additive runtime script preserving Framer hydration, single active <header>, Stay link, and menu polarity
const GRAND_RUN1_JS = `
(function() {
  if (window.__grandRun1Init) return;
  window.__grandRun1Init = true;

  function swapTagPreservingAttrs(el, targetTag) {
    if (!el || el.tagName.toLowerCase() === targetTag.toLowerCase()) return el;
    var fresh = document.createElement(targetTag);
    for (var i = 0; i < el.attributes.length; i++) {
      fresh.setAttribute(el.attributes[i].name, el.attributes[i].value);
    }
    while (el.firstChild) fresh.appendChild(el.firstChild);
    if (el.parentNode) el.parentNode.replaceChild(fresh, el);
    return fresh;
  }

  // Keep exactly ONE <header> element in the DOM: only the active visible .ssr-variant keeps <header>
  function syncActiveHeaderTag() {
    var candidates = document.querySelectorAll('header, [data-hidden-header="true"], .framer-bg7hsc[data-framer-name="Navbar Wrapper"]');
    var foundVisibleHeader = false;
    candidates.forEach(function(el) {
      var ssr = el.closest('.ssr-variant');
      var isHiddenVariant = ssr ? window.getComputedStyle(ssr).display === 'none' : window.getComputedStyle(el).display === 'none';
      if (!isHiddenVariant && !foundVisibleHeader) {
        foundVisibleHeader = true;
        el.removeAttribute('data-hidden-header');
        if (el.tagName.toLowerCase() !== 'header') {
          swapTagPreservingAttrs(el, 'header');
        }
      } else {
        el.setAttribute('data-hidden-header', 'true');
        if (el.tagName.toLowerCase() === 'header') {
          swapTagPreservingAttrs(el, 'div');
        }
      }
    });
  }

  // Safely clone Venues -> Stay (/book/rooms) inside BOTH desktop and mobile navs
  function updateNavLinkToStay(anchor) {
    anchor.setAttribute('href', '/book/rooms');
    anchor.setAttribute('data-grand-stay', 'true');
    var srOnly = anchor.querySelector('[data-rolling-label] > span:not([aria-hidden="true"])');
    if (srOnly) srOnly.textContent = 'Stay';

    var rollingLabel = anchor.querySelector('[data-rolling-label]');
    if (rollingLabel) {
      var charCols = Array.prototype.slice.call(
        rollingLabel.querySelectorAll(':scope > span[aria-hidden="true"]')
      );
      var letters = ['S', 't', 'a', 'y'];
      if (charCols.length > 0) {
        for (var i = 0; i < charCols.length; i++) {
          if (i < letters.length) {
            var innerSpans = charCols[i].querySelectorAll('span');
            if (innerSpans.length > 0) {
              innerSpans.forEach(function(sp) { sp.textContent = letters[i]; });
            } else {
              charCols[i].textContent = letters[i];
            }
          } else {
            charCols[i].remove();
          }
        }
      }
    } else if (anchor.textContent && anchor.textContent.trim().toLowerCase() === 'venues') {
      anchor.textContent = 'Stay';
    }
  }

  function ensureStayLinks() {
    var navs = document.querySelectorAll(
      'nav[name="Navbar Menu"] .framer-1kcv8in, nav[name="Navbar Menu"], [data-framer-name="Menu Overlay"] nav, .framer-1763xqs nav'
    );
    navs.forEach(function(nav) {
      var existingStay = nav.querySelector('a[href="/book/rooms"]');
      if (existingStay) return;
      var venuesLink = nav.querySelector('a[href="/venues"]');
      if (!venuesLink) return;
      var clone = venuesLink.cloneNode(true);
      updateNavLinkToStay(clone);
      venuesLink.parentNode.insertBefore(clone, venuesLink.nextSibling);
    });
  }

  // Ensure Home header becomes ready & scrolled cleanly across scroll stops, and keep non-Home header visible at 0% scroll
  function syncHomeScrollReady() {
    if (!document.body) return;
    var p = (window.location && window.location.pathname) ? window.location.pathname : '/';
    var isHome = (p === '/' || p === '/index.html');
    document.body.classList.add('grand-home-ready');
    if (!isHome || window.scrollY > 20) {
      document.body.classList.add('grand-home-scrolled');
    } else {
      document.body.classList.remove('grand-home-scrolled');
    }
  }

  function enforceHeaderAndNavVisibility() {
    var p = (window.location && window.location.pathname) ? window.location.pathname : '/';
    var isHome = (p === '/' || p === '/index.html');
    if (!isHome || window.scrollY > 20) {
      document.querySelectorAll('header .framer-QnCu0, header .framer-1q3kxxd-container').forEach(function(el) {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
      });
      document.querySelectorAll('header [data-framer-name="Logo"], header a.framer-4iomze, header a.framer-1ngqbpf').forEach(function(el) {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('pointer-events', 'auto', 'important');
      });
    }
    if (window.innerWidth >= 810) {
      document.querySelectorAll('header .framer-1nw9de0-container, header nav[name="Navbar Menu"], header .framer-1kcv8in, header .framer-1t6aeyj-container').forEach(function(el) {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
      });
    }
  }

  // Freeze surface polarity & sync menu classes + scroll lock
  function syncMenuOverlayClasses() {
    if (!document.body) return;
    var overlay = document.querySelector('[data-framer-name="Menu Overlay"], .framer-1763xqs');
    var isOpen = document.body.classList.contains('casa-menu-open') ||
      document.body.classList.contains('menu-open') ||
      (overlay && parseFloat(window.getComputedStyle(overlay).opacity || '0') > 0.5 && window.innerWidth < 810);

    document.body.classList.toggle('menu-open', !!isOpen);
    if (!isOpen) {
      document.body.classList.remove('grand-menu-light');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    ensureStayLinks();
  }

  document.addEventListener('click', function(e) {
    var btn = e.target && e.target.closest ? e.target.closest('.framer-1s5ig4a, [data-framer-name="Menu Button"]') : null;
    if (btn) {
      var willOpen = !(document.body.classList.contains('casa-menu-open') || document.body.classList.contains('menu-open'));
      if (willOpen) {
        var isLight = document.body.classList.contains('is-light-theme');
        document.body.classList.toggle('grand-menu-light', isLight);
      }
      setTimeout(syncMenuOverlayClasses, 40);
      setTimeout(syncMenuOverlayClasses, 180);
    }
  }, true);

  function tickRun1() {
    syncActiveHeaderTag();
    ensureStayLinks();
    syncHomeScrollReady();
    enforceHeaderAndNavVisibility();
  }

  tickRun1();
  window.addEventListener('scroll', function() {
    syncHomeScrollReady();
    syncActiveHeaderTag();
    enforceHeaderAndNavVisibility();
  }, { passive: true });
  window.addEventListener('resize', tickRun1, { passive: true });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tickRun1);
  }
  setTimeout(tickRun1, 150);
  setTimeout(tickRun1, 450);
  setTimeout(tickRun1, 1200);

  if (window.MutationObserver && document.body) {
    var timer = null;
    var mo = new MutationObserver(function() {
      if (timer) return;
      timer = setTimeout(function() {
        timer = null;
        ensureStayLinks();
        syncActiveHeaderTag();
        enforceHeaderAndNavVisibility();
      }, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
})();
`;

function getCleanBaselineHtml(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  try {
    return execSync(`git show 0b5a520:${relPath.replace(/\\/g, '/')}`, {
      cwd: ROOT_DIR,
      maxBuffer: 25 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString('utf8');
  } catch {
    return fs.readFileSync(fullPath, 'utf8');
  }
}

export function generateRouteShells() {
  console.log('Generating static route shells from clean baselines...');

  const venueBookHtml = getCleanBaselineHtml('book/venue.html');
  const roomsBookHtml = venueBookHtml
    .replace(/<title>.*?<\/title>/gi, '<title>Suites & Stays — The Grand Lucknow</title>')
    .replace(/property="og:title" content="[^"]*"/gi, 'property="og:title" content="Suites & Stays — The Grand Lucknow"')
    .replace(/property="og:url" content="[^"]*"/gi, 'property="og:url" content="https://www.thegrandlucknow.in/book/rooms"');
  fs.writeFileSync(path.join(ROOT_DIR, 'book', 'rooms.html'), roomsBookHtml, 'utf8');
  console.log('  -> Generated book/rooms.html');

  const termsHtml = getCleanBaselineHtml('terms.html');
  const refundsHtml = termsHtml
    .replace(/<title>.*?<\/title>/gi, '<title>Cancellation & Refund Policy — The Grand Lucknow</title>')
    .replace(/property="og:title" content="[^"]*"/gi, 'property="og:title" content="Cancellation & Refund Policy — The Grand Lucknow"')
    .replace(/property="og:url" content="[^"]*"/gi, 'property="og:url" content="https://www.thegrandlucknow.in/refunds"')
    .replaceAll('Terms &amp; Conditions', 'Cancellation &amp; Refund Policy')
    .replaceAll('Terms & Conditions', 'Cancellation & Refund Policy');
  fs.writeFileSync(path.join(ROOT_DIR, 'refunds.html'), refundsHtml, 'utf8');
  console.log('  -> Generated refunds.html');

  const serviceDeliveryHtml = termsHtml
    .replace(/<title>.*?<\/title>/gi, '<title>Service Delivery & Event Execution Policy — The Grand Lucknow</title>')
    .replace(/property="og:title" content="[^"]*"/gi, 'property="og:title" content="Service Delivery & Event Execution Policy — The Grand Lucknow"')
    .replace(/property="og:url" content="[^"]*"/gi, 'property="og:url" content="https://www.thegrandlucknow.in/service-delivery"')
    .replaceAll('Terms &amp; Conditions', 'Service Delivery &amp; Event Execution Policy')
    .replaceAll('Terms & Conditions', 'Service Delivery & Event Execution Policy');
  fs.writeFileSync(path.join(ROOT_DIR, 'service-delivery.html'), serviceDeliveryHtml, 'utf8');
  console.log('  -> Generated service-delivery.html');
}

export function patchHtmlFile(relPath) {
  const fullPath = path.join(ROOT_DIR, relPath);
  // Start from clean 0b5a520 for tracked pages (or strip previous Run 1 injection for clones)
  let html = ['book/rooms.html', 'refunds.html', 'service-delivery.html'].includes(relPath)
    ? fs.readFileSync(fullPath, 'utf8')
    : getCleanBaselineHtml(relPath);

  // Strip any previous Run 1 additive tags so runs remain idempotent
  html = html.replace(/<style id="grand-run1-foundation-css">[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/<script id="grand-run1-foundation-js">[\s\S]*?<\/script>\s*/g, '');

  // 1. Head sanitization: square SVG favicon
  html = html.replace(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*>/gi, '');
  html = html.replace(/<link[^>]*rel=["']apple-touch-icon["'][^>]*>/gi, '');
  const faviconTags = '<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n<link rel="apple-touch-icon" href="/favicon.svg">';
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${faviconTags}\n</head>`);
  }

  // 2. Remove unauthorized third-party analytics trackers
  html = html.replace(/<script[^>]*events\.framer\.com[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[^>]*googletagmanager\.com[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<noscript[^>]*googletagmanager\.com[\s\S]*?<\/noscript>/gi, '');
  html = html.replace(/<script[^>]*connect\.facebook\.net[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[^>]*google-analytics\.com[\s\S]*?<\/script>/gi, '');

  // 3. Clean malformed scale-down-to params from /images/... paths & eager-load images
  html = html.replace(/(\/images\/[^"'\s,)<]+?)(\?|&amp;|&)scale-down-to=\d+[^"'\s,)<]*/gi, '$1');
  html = html.replace(/(&amp;|&|\?)scale-down-to=\d+/gi, '');
  html = html.replaceAll('loading="lazy"', 'loading="eager"');

  // 4. Grammar fix safely inside <script> vs HTML text (prevents JS SyntaxError in single-quoted strings)
  html = html.replace(/(<script\b[^>]*>[\s\S]*?<\/script>)|Lucknow premier address/gi, (match, scriptBlock) => {
    if (scriptBlock) {
      return scriptBlock.replaceAll('Lucknow premier address', "Lucknow\\'s premier address");
    }
    return "Lucknow's premier address";
  });

  // 4b. Annotate body with current route for CSS selectors (e.g. non-Home 0%-scroll logo visibility)
  const routeAttr = relPath === 'index.html'
    ? '/'
    : '/' + relPath.replace(/\.html$/i, '').replace(/\\/g, '/');
  html = html.replace(/<body\b([^>]*)>/i, (m, attrs) => {
    const cleaned = attrs.replace(/\s*data-grand-route="[^"]*"/gi, '');
    return `<body${cleaned} data-grand-route="${routeAttr}">`;
  });

  // 5. Append additive Run 1 CSS + JS right before </body> (never overwriting 0b5a520's #grand-palette)
  const injection = `<style id="grand-run1-foundation-css">\n${GRAND_RUN1_CSS}\n</style>\n<script id="grand-run1-foundation-js">\n${GRAND_RUN1_JS}\n</script>\n</body>`;
  if (html.includes('</body>')) {
    html = html.replace('</body>', injection);
  } else {
    html += injection;
  }

  fs.writeFileSync(fullPath, html, 'utf8');
}

export function run() {
  console.log('\n======================================================');
  console.log('The Grand Lucknow — Additive Run 1 Foundation Engine');
  console.log('======================================================');

  generateRouteShells();

  const targetPages = [
    'index.html',
    'venues.html',
    'venues/open-earth-lawn.html',
    'venues/grassland-gala.html',
    'venues/garden-galaxy.html',
    'venues/the-grand-courtyard.html',
    'venues/the-royal-legacy-banquet.html',
    'about.html',
    'contact.html',
    'book/venue.html',
    'book/rooms.html',
    'imprint.html',
    'terms.html',
    'privacy.html',
    'refunds.html',
    'service-delivery.html',
  ];

  let patchedCount = 0;
  for (const rel of targetPages) {
    if (fs.existsSync(path.join(ROOT_DIR, rel))) {
      patchHtmlFile(rel);
      patchedCount++;
      console.log(`  [PATCHED] ${rel}`);
    } else {
      console.warn(`  [MISSING] ${rel}`);
    }
  }

  console.log(`\nSuccessfully applied additive Run 1 foundation to ${patchedCount} pages.`);
  console.log('======================================================\n');
}

run();
