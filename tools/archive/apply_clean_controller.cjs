const fs = require('fs');

const indexPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add CSS in <head>
const styleBlock = `
<style id="grand-bulletproof-btn-css">
/* Bulletproof styling for Open in Maps button - zero purple, zero clipping, exact single arrow */
.grand-nav-maps-btn, a.grand-nav-maps-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 8px 16px !important;
  background-color: var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, #FFF0CA) !important;
  color: #0E1201 !important;
  text-decoration: none !important;
  border-radius: 2px !important;
  white-space: nowrap !important;
  width: auto !important;
  height: auto !important;
  opacity: 1 !important;
  visibility: visible !important;
  transition: opacity 0.2s ease, transform 0.2s ease !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
}
.grand-nav-maps-btn.dark-btn {
  background-color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, #0E1201) !important;
  color: #FFF0CA !important;
}
.grand-nav-maps-btn:hover {
  opacity: 0.9 !important;
  transform: translateY(-1px) !important;
}
.grand-nav-maps-btn:visited, .grand-nav-maps-btn:active, .grand-nav-maps-btn:focus {
  color: #0E1201 !important;
}
.grand-nav-maps-btn.dark-btn:visited, .grand-nav-maps-btn.dark-btn:active, .grand-nav-maps-btn.dark-btn:focus {
  color: #FFF0CA !important;
}
.grand-nav-maps-text {
  font-family: 'Lay Grotesk Regular', sans-serif !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em !important;
  color: inherit !important;
  line-height: 1 !important;
  white-space: nowrap !important;
}
.grand-nav-maps-arrow {
  width: 9px !important;
  height: 9px !important;
  flex-shrink: 0 !important;
  color: inherit !important;
}
.framer-1t6aeyj-container, .framer-1kcv8in {
  opacity: 1 !important;
  transform: none !important;
}
</style>
`;

if (html.includes('id="grand-bulletproof-btn-css"')) {
  html = html.replace(/<style id="grand-bulletproof-btn-css">[\s\S]*?<\/style>/, styleBlock);
} else {
  html = html.replace('</head>', styleBlock + '\n</head>');
}

// 2. Replace grand-venue-names-sync script with new robust unified controller
const newSyncScript = `<script id="grand-venue-names-sync">
(function() {
  'use strict';

  // 1. Native bypass of Framer SPA router for all subpage links to prevent client-side 404
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (a && a.getAttribute('href')) {
      var href = a.getAttribute('href');
      if (
        href.startsWith('/venues/') ||
        href.startsWith('./venues/') ||
        href.startsWith('venues/') ||
        href.includes('open-earth-lawn') ||
        href.includes('venue-')
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (href.startsWith('.')) href = href.substring(1);
        if (!href.startsWith('/')) href = '/' + href;
        window.location.href = href;
      }
    }
  }, true);

  var venues = [
    { href: '/venues/open-earth-lawn', name: 'Open Earth Lawn' },
    { href: '/venues/grassland-gala', name: 'Grassland Gala' },
    { href: '/venues/garden-galaxy', name: 'Garden Galaxy' },
    { href: '/venues/the-royal-legacy-banquet', name: 'The Royal Legacy Banquet' },
    { href: '/venues/garden-pavilion', name: 'Garden Pavilion' },
    { href: '/venues/the-royal-mandap', name: 'The Royal Mandap' },
    { href: '/venues/the-dining-expanse', name: 'The Dining Expanse' },
    { href: '/venues/vip-atrium', name: 'VIP Atrium' },
    { href: '/venues/presidential-suite', name: 'Presidential Suite' }
  ];

  function syncHomeElements() {
    // 2. Sync Venue Cards
    var grid = document.getElementById('mefgjz') || document.querySelector('[data-framer-name="Venues Grid"]');
    if (grid) {
      var items = grid.querySelectorAll('[data-framer-name="Venue Item"]');
      items.forEach(function(item, idx) {
        if (idx < venues.length) {
          var v = venues[idx];
          var h2 = item.querySelector('h2');
          if (h2 && h2.getAttribute('data-venue-named') !== v.name) {
            h2.setAttribute('data-venue-named', v.name);
            h2.innerHTML = '<span style="display:inline-block; font-family:\'Lay Grotesk Regular\', sans-serif;">' + v.name + '</span>';
          }
          var a = item.querySelector('a');
          if (a && a.getAttribute('href') !== v.href) {
            a.setAttribute('href', v.href);
          }
        }
      });
    }

    // 3. Bulletproof Navbar Open in Maps button
    var navBtn = document.querySelector('.framer-1t6aeyj-container a, nav .framer-vO7O2');
    if (navBtn && navBtn.getAttribute('data-grand-styled') !== 'true') {
      navBtn.setAttribute('data-grand-styled', 'true');
      navBtn.setAttribute('href', 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117');
      navBtn.setAttribute('target', '_blank');
      navBtn.setAttribute('rel', 'noopener noreferrer');
      navBtn.className = 'grand-nav-maps-btn';
      navBtn.innerHTML = '<span class="grand-nav-maps-text">Open in Maps</span>' +
        '<svg class="grand-nav-maps-arrow" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">' +
        '<path d="M 3 0 L 3 1 L 5.98 1 C 6.83 1 7.26 2.03 6.66 2.63 L 0 9.29 L 0.71 10 L 7.37 3.34 C 7.97 2.74 9 3.16 9 4.02 L 9 7 L 10 7 L 10 0 Z" fill="currentColor"/>' +
        '</svg>';
    }

    // 4. Bulletproof Location Section Open in Maps button
    var locBtn = document.querySelector('#locations-1 a, .framer-1c38j8y-container a');
    if (locBtn && locBtn.getAttribute('data-grand-styled') !== 'true') {
      locBtn.setAttribute('data-grand-styled', 'true');
      locBtn.setAttribute('href', 'https://maps.app.goo.gl/94Dr1K1iPbZ3kR117');
      locBtn.setAttribute('target', '_blank');
      locBtn.setAttribute('rel', 'noopener noreferrer');
      locBtn.className = 'grand-nav-maps-btn dark-btn';
      locBtn.innerHTML = '<span class="grand-nav-maps-text">Open in Maps</span>' +
        '<svg class="grand-nav-maps-arrow" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">' +
        '<path d="M 3 0 L 3 1 L 5.98 1 C 6.83 1 7.26 2.03 6.66 2.63 L 0 9.29 L 0.71 10 L 7.37 3.34 C 7.97 2.74 9 3.16 9 4.02 L 9 7 L 10 0 Z" fill="currentColor"/>' +
        '</svg>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncHomeElements);
  } else {
    syncHomeElements();
  }

  setInterval(syncHomeElements, 300);
  window.addEventListener('scroll', syncHomeElements, { passive: true });
})();
</script>`;

html = html.replace(/<script id="grand-venue-names-sync">[\s\S]*?<\/script>/, newSyncScript);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html with clean controller!');
