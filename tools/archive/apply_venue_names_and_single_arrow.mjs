import fs from 'fs';
import path from 'path';

const indexPath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const venueMap = [
  { n: 'N°01', oldName: 'Venue N°1', newName: 'Open Earth Lawn', slug: 'open-earth-lawn', href: '/venues/venue-n1' },
  { n: 'N°02', oldName: 'Venue N°2', newName: 'Grassland Gala', slug: 'grassland-gala', href: '/venues/venue-n2' },
  { n: 'N°03', oldName: 'Venue N°3', newName: 'Garden Galaxy', slug: 'garden-galaxy', href: '/venues/venue-n3' },
  { n: 'N°04', oldName: 'Venue N°4', newName: 'The Royal Legacy Banquet', slug: 'the-royal-legacy-banquet', href: '/venues/venue-n4' },
  { n: 'N°05', oldName: 'Loft N°1', newName: 'Garden Pavilion', slug: 'garden-pavilion', href: '/venues/venue-n5' },
  { n: 'N°06', oldName: 'Loft N°2', newName: 'The Royal Mandap', slug: 'the-royal-mandap', href: '/venues/venue-n6' },
  { n: 'N°07', oldName: 'Loft N°3', newName: 'The Dining Expanse', slug: 'the-dining-expanse', href: '/venues/venue-n7' },
  { n: 'N°08', oldName: 'Garden N°1', newName: 'VIP Atrium', slug: 'vip-atrium', href: '/venues/venue-n8' },
  { n: 'N°09', oldName: 'Urban N°1', newName: 'Presidential Suite', slug: 'presidential-suite', href: '/venues/venue-n9' },
];

// 1. Update JSON data in __framer__handoverData
for (const v of venueMap) {
  html = html.replaceAll(`"${v.n}"`, `"${v.newName}"`);
  html = html.replaceAll(v.oldName, v.newName);
}

// 2. Fix Double Arrow on Location Button & Nav Button
// In grand-locations-override:
html = html.replaceAll('Open in Maps ↗', 'Open in Maps');
html = html.replaceAll('Open in Maps  ↗', 'Open in Maps');
html = html.replaceAll('Open in Maps ↗ ↗', 'Open in Maps');

// Remove unicode arrow from rolling label inside navbar button on index.html
html = html.replaceAll('>Open in Maps ↗<', '>Open in Maps<');

// 3. Inject CSS to hide duplicate hover arrow and style venue names
const singleArrowStyle = `
<style id="grand-single-arrow-fix">
  /* Enforce single arrow for all buttons */
  .framer-1ko9uiy .framer-m12jrg {
    display: none !important;
  }
  .framer-1ko9uiy {
    overflow: visible !important;
  }
  /* Venue Card Title Styling */
  [data-framer-name="Venues Grid"] h2,
  #mefgjz h2 {
    white-space: normal !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
    line-height: 1.15em !important;
  }
</style>
`;

if (!html.includes('id="grand-single-arrow-fix"')) {
  html = html.replace('</head>', `${singleArrowStyle}\n</head>`);
}

// 4. Inject Client-Side DOM Enforcer Script for Venue Names & Single Arrow
const clientEnforcer = `
<script id="grand-venue-names-sync">
(function() {
  var venues = [
    { href: '/venues/venue-n1', name: 'Open Earth Lawn' },
    { href: '/venues/venue-n2', name: 'Grassland Gala' },
    { href: '/venues/venue-n3', name: 'Garden Galaxy' },
    { href: '/venues/venue-n4', name: 'The Royal Legacy Banquet' },
    { href: '/venues/venue-n5', name: 'Garden Pavilion' },
    { href: '/venues/venue-n6', name: 'The Royal Mandap' },
    { href: '/venues/venue-n7', name: 'The Dining Expanse' },
    { href: '/venues/venue-n8', name: 'VIP Atrium' },
    { href: '/venues/venue-n9', name: 'Presidential Suite' }
  ];

  function syncVenuesAndArrows() {
    // 1. Sync Venue Names on Grid Cards
    var grid = document.getElementById('mefgjz') || document.querySelector('[data-framer-name="Venues Grid"]');
    if (grid) {
      var items = grid.querySelectorAll('[data-framer-name="Venue Item"]');
      items.forEach(function(item, idx) {
        if (idx < venues.length) {
          var v = venues[idx];
          var h2 = item.querySelector('h2');
          if (h2 && h2.getAttribute('data-venue-named') !== v.name) {
            h2.setAttribute('data-venue-named', v.name);
            h2.innerHTML = '<span style="display:inline-block; transform:none; opacity:1; font-family:\\'Lay Grotesk Regular\\', sans-serif;">' + v.name + '</span>';
          }
          // Wire card link cleanly
          var a = item.querySelector('a');
          if (a && a.getAttribute('href') !== v.href) {
            a.setAttribute('href', v.href);
          }
        }
      });
    }

    // 2. Fix Double Arrow on All Buttons (Navbar & Location)
    document.querySelectorAll('a, button').forEach(function(el) {
      if (el.textContent && el.textContent.indexOf('Open in Maps') !== -1) {
        // Remove text arrow ↗ so only SVG arrow renders
        var rolling = el.querySelector('[data-rolling-label], .framer-nbr5p7-container');
        if (rolling && rolling.getAttribute('data-arrow-cleaned') !== 'true') {
          rolling.setAttribute('data-arrow-cleaned', 'true');
          rolling.innerHTML = '<span style="font-family:inherit; font-size:inherit; color:inherit; letter-spacing:0.04em; margin-right:6px;">Open in Maps</span>';
        }
        // Hide duplicate second SVG arrow
        var secondArrow = el.querySelector('.framer-m12jrg');
        if (secondArrow) {
          secondArrow.style.display = 'none';
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncVenuesAndArrows);
  } else {
    syncVenuesAndArrows();
  }

  // Periodic and scroll check to handle Framer's dynamic virtualization
  setInterval(syncVenuesAndArrows, 300);
  window.addEventListener('scroll', syncVenuesAndArrows, { passive: true });
})();
</script>
`;

if (!html.includes('id="grand-venue-names-sync"')) {
  html = html.replace('</body>', `${clientEnforcer}\n</body>`);
} else {
  html = html.replace(/<script id="grand-venue-names-sync">[\s\S]*?<\/script>/, clientEnforcer.trim());
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully applied venue names and single arrow fix to index.html!');
