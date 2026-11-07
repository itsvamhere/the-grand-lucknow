import fs from 'node:fs';
import path from 'node:path';

// 1. Path data for THE GRAND vector SVG (exact coordinates from authoritative home page SVG)
const pathD = `M 112.277 34.868 L 115.879 34.868 L 115.879 250.105 L 101.047 295.392 L 180.812 295.392 L 165.980 250.105 L 165.980 34.868 L 169.582 34.868 C 208.064 34.868 236.928 44.086 264.581 59.719 L 273.798 4.803 L 8.061 4.803 L 17.679 59.719 C 44.942 44.086 74.195 34.868 112.277 34.868 M 323.855 49.701 L 323.855 250.105 L 309.033 295.392 L 388.788 295.392 L 373.955 250.105 L 373.955 142.287 L 401.218 142.287 C 439.289 142.287 467.753 151.504 495.005 166.737 L 495.005 250.105 L 480.172 295.392 L 559.938 295.392 L 545.106 250.105 L 545.106 49.701 L 559.938 4.803 L 480.172 4.803 L 495.005 49.701 L 495.005 116.235 L 373.955 116.235 L 373.955 49.701 L 388.788 4.803 L 309.033 4.803 M 611.595 49.701 L 611.595 250.105 L 596.774 295.392 L 798.379 295.392 L 788.761 240.076 C 761.498 256.109 732.245 265.327 694.163 265.327 L 661.696 265.327 L 661.696 147.090 C 690.560 149.903 714.210 158.320 737.048 171.540 L 746.265 116.235 L 661.696 116.235 L 661.696 34.868 L 687.347 34.868 C 725.829 34.868 754.693 44.086 781.945 59.719 L 791.563 4.803 L 596.774 4.803 M 1210.115 244.490 L 1238.168 295.392 L 1249.798 295.392 L 1249.798 123.841 L 1095.481 123.841 L 1105.099 178.756 C 1132.362 163.123 1161.215 153.906 1199.697 153.906 L 1199.697 173.541 C 1199.697 223.642 1177.649 268.940 1134.364 268.940 C 1091.078 268.940 1052.597 232.059 1037.364 173.942 C 1032.961 157.108 1030.548 141.486 1030.548 127.054 C 1030.548 82.568 1051.396 49.701 1089.066 36.870 C 1099.896 32.867 1111.114 31.255 1121.933 31.255 C 1158.413 31.255 1194.082 50.902 1220.934 84.169 L 1220.534 20.837 C 1196.884 9.217 1164.417 0.000 1133.563 0.000 L 1126.347 0.000 C 1044.980 3.602 984.061 61.720 984.061 149.903 C 984.061 238.475 1046.982 300.206 1111.515 300.206 C 1162.816 300.206 1193.682 274.555 1210.115 244.490 M 1305.069 49.701 L 1305.069 250.105 L 1290.237 295.392 L 1369.991 295.392 L 1355.170 250.105 L 1355.170 183.971 L 1387.637 183.971 L 1456.973 295.392 L 1523.107 295.392 L 1477.009 246.892 L 1432.122 174.353 C 1474.607 166.737 1511.477 143.487 1511.477 90.985 C 1511.477 40.072 1464.589 4.803 1407.672 4.803 L 1290.237 4.803 M 1355.170 153.906 L 1355.170 34.868 L 1398.055 34.868 C 1444.142 34.868 1461.376 66.134 1461.376 96.188 C 1461.376 125.853 1443.341 153.906 1396.854 153.906 M 1585.594 243.689 L 1554.728 295.392 L 1633.693 295.392 C 1628.079 280.159 1625.277 264.926 1625.277 248.893 C 1625.277 234.072 1627.678 218.439 1632.482 201.605 L 1638.897 201.605 C 1676.578 201.605 1705.431 210.422 1732.683 226.055 C 1733.895 233.671 1734.696 241.288 1734.696 248.493 C 1734.696 264.926 1731.482 280.159 1725.879 295.392 L 1830.083 295.392 L 1796.015 243.689 L 1707.032 4.803 L 1653.729 4.803 L 1662.146 26.852 M 1641.699 175.554 L 1678.580 70.938 L 1717.462 175.554 M 1876.937 49.701 L 1876.937 250.105 L 1862.105 295.392 L 1921.835 295.392 L 1907.002 250.105 L 1907.002 73.339 L 2052.090 295.392 L 2111.809 295.392 L 2096.977 250.105 L 2096.977 49.701 L 2111.809 4.803 L 2052.090 4.803 L 2066.923 49.701 L 2066.923 226.856 L 1921.835 4.803 L 1862.105 4.803 M 2163.478 49.701 L 2163.478 250.105 L 2148.645 295.392 L 2270.495 295.392 C 2335.017 295.392 2396.748 230.458 2396.748 151.904 C 2396.748 64.522 2342.233 5.604 2271.696 4.803 L 2148.645 4.803 M 2213.578 34.868 L 2259.265 34.868 C 2306.164 34.868 2346.647 80.155 2346.647 150.703 C 2346.647 221.241 2306.564 265.327 2260.477 265.327 L 2213.578 265.327`;

// Clean vector SVG markup with scalable viewBox
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2404.809 300.206" overflow="visible" style="width: 100%; height: 100%; display: block;"><path d="${pathD}" fill="#FFF0CA"></path></svg>`;

const singleTickerItem = `
<li class="grand-ticker-item" aria-hidden="false" style="flex-grow: 0; flex-shrink: 0; position: relative; height: fit-content; width: fit-content; transform: none;">
  <div data-framer-component-type="SVG" data-framer-name="Footer Logo" class="framer-xj8hz2" aria-hidden="true" style="flex-shrink: 0; opacity: 1;">
    ${svgLogo}
  </div>
</li>
`.trim();

// 4 identical items in track so there is always endless smooth looping on any display
const tickerTrackItems = `${singleTickerItem}\n${singleTickerItem}\n${singleTickerItem}\n${singleTickerItem}`;

// 2. Base CSS extracted directly from live home page
let css = fs.readFileSync('scripts/exact_home_footer_css.css', 'utf8');
css = css.replace(/\.framer-zrroz\s+/g, '');
css = css.replace(/#bc6f45/g, '#C2653A');

const extraCss = `
  footer.framer-18na9ah {
    --token-86299043-b8f8-4618-9585-4835ac76e9b7: #C2653A !important;
    --token-8ecd7124-9686-4bd8-bf72-4f81314652d2: #F3ECDD !important;
    --grand-p1-size: calc(var(--grand-page-w, 100vw) * 0.020000) !important;
    --grand-p1-lh: 1.2em !important;
    --grand-p1-ls: -0.2px !important;
    background-color: #964317 !important;
    width: 100% !important;
    max-width: 100% !important;
    display: flex !important;
    position: relative !important;
    justify-content: center !important;
    align-items: center !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    height: min-content !important;
    padding: 0 !important;
  }
  footer.framer-18na9ah * {
    box-sizing: border-box !important;
  }
  footer.framer-18na9ah .framer-192t1bg-container {
    width: 100% !important;
    height: auto !important;
    position: relative !important;
    opacity: 1 !important;
    transform: none !important;
  }
  footer.framer-18na9ah .framer-1aamxx2 {
    background-color: var(--token-86299043-b8f8-4618-9585-4835ac76e9b7, #C2653A) !important;
    width: 100% !important;
    max-width: 1600px !important;
    margin: 0 auto !important;
    padding-top: max(256px, calc(var(--grand-page-w, 100vw) * 0.160000)) !important;
    padding-right: max(48px, calc(var(--grand-page-w, 100vw) * 0.030000)) !important;
    padding-bottom: max(48px, calc(var(--grand-page-w, 100vw) * 0.030000)) !important;
    padding-left: max(48px, calc(var(--grand-page-w, 100vw) * 0.030000)) !important;
    row-gap: max(80px, calc(var(--grand-page-w, 100vw) * 0.050000)) !important;
    column-gap: max(80px, calc(var(--grand-page-w, 100vw) * 0.050000)) !important;
    height: min-content !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    align-items: center !important;
    opacity: 1 !important;
    transform: none !important;
  }
  @media (max-width: 809.98px) {
    footer.framer-18na9ah {
      --grand-p1-size: 24px !important;
    }
    footer.framer-18na9ah .framer-1aamxx2 {
      padding-top: max(96px, calc(var(--grand-page-w, 100vw) * 0.060000)) !important;
      padding-right: max(12px, calc(var(--grand-page-w, 100vw) * 0.007500)) !important;
      padding-bottom: max(12px, calc(var(--grand-page-w, 100vw) * 0.007500)) !important;
      padding-left: max(12px, calc(var(--grand-page-w, 100vw) * 0.007500)) !important;
      row-gap: max(48px, calc(var(--grand-page-w, 100vw) * 0.030000)) !important;
      column-gap: max(48px, calc(var(--grand-page-w, 100vw) * 0.030000)) !important;
    }
  }
  footer.framer-18na9ah a {
    text-decoration: none !important;
    cursor: pointer !important;
  }

  /* ========================================================================= */
  /* FLUID RESPONSIVE TICKER DIMENSIONS & SCALING (EXACT 1:1 WITH HOME PAGE)   */
  /* ========================================================================= */
  .framer-n49p1z {
    overflow-x: clip !important;
    overflow-y: visible !important;
    display: flex !important;
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    height: min(300px, calc(var(--grand-page-w, 100vw) * 0.187500)) !important;
    opacity: 1 !important;
  }
  .framer-n49p1z ul.grand-ticker-track {
    display: flex !important;
    position: relative !important;
    list-style-type: none !important;
    padding: 0px !important;
    margin: 0px !important;
    justify-content: flex-start !important;
    flex-direction: row !important;
    gap: min(162px, calc(var(--grand-page-w, 100vw) * 0.101250)) !important;
    opacity: 1 !important;
    align-items: center !important;
    width: max-content !important;
    will-change: transform !important;
    animation: grandInfiniteScrollFluid 32s linear infinite !important;
  }
  .framer-n49p1z li.grand-ticker-item {
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
    position: relative !important;
    height: fit-content !important;
    width: fit-content !important;
    transform: none !important;
  }
  .framer-n49p1z .framer-xj8hz2 {
    width: min(2405px, calc(var(--grand-page-w, 100vw) * 1.503125)) !important;
    height: min(300px, calc(var(--grand-page-w, 100vw) * 0.187500)) !important;
    position: relative !important;
    background-image: none !important;
    display: block !important;
  }
  .framer-n49p1z .framer-xj8hz2 svg {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
  }

  @keyframes grandInfiniteScrollFluid {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(calc(-1 * (min(2405px, calc(var(--grand-page-w, 100vw) * 1.503125)) + min(162px, calc(var(--grand-page-w, 100vw) * 0.101250)))), 0, 0);
    }
  }

  @media (max-width: 809.98px) {
    .framer-n49p1z {
      height: 150px !important;
    }
    .framer-n49p1z ul.grand-ticker-track {
      gap: 81px !important;
      animation: grandInfiniteScrollMobile 32s linear infinite !important;
    }
    .framer-n49p1z .framer-xj8hz2 {
      width: 1203px !important;
      height: 150px !important;
    }
    .framer-n49p1z .framer-xj8hz2 svg {
      width: 100% !important;
      height: 100% !important;
    }
    @keyframes grandInfiniteScrollMobile {
      0% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(-1284px, 0, 0);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .framer-n49p1z ul.grand-ticker-track {
      animation-play-state: paused !important;
    }
  }

  /* =================================================== */
  /* DUAL-LAYER ROLLING TEXT HOVER INTERACTION ON LINKS  */
  /* =================================================== */
  footer.framer-18na9ah a span[style*="position: relative"] > span:nth-child(2),
  footer.framer-18na9ah a span[style*="position:relative"] > span:nth-child(2),
  footer.framer-18na9ah a span[style*="position: relative"] > span:nth-child(3),
  footer.framer-18na9ah a span[style*="position:relative"] > span:nth-child(3) {
    will-change: transform !important;
  }
`;

css += '\n' + extraCss;

// 3. Load rendered home footer markup
let footerHtml = fs.readFileSync('scripts/rendered_home_footer.html', 'utf8');

// Ensure all opacities inside are 1 and transforms none
footerHtml = footerHtml.replace(/opacity:\s*(?:0(?:\.\d+)?|1);/g, 'opacity: 1;');
footerHtml = footerHtml.replace(/transform:\s*translateY\(-210px\);/g, 'transform: none;');
footerHtml = footerHtml.replace(/transform:\s*translateY\(10px\);/g, 'transform: none;');

// Standardize universal links across all directories
footerHtml = footerHtml.replace(/href="\.\/venues"/g, 'href="/venues.html"');
footerHtml = footerHtml.replace(/href="\.\/about"/g, 'href="/about.html"');
footerHtml = footerHtml.replace(/href="\.\/contact"/g, 'href="/contact.html"');
footerHtml = footerHtml.replace(/href="\.\/imprint"/g, 'href="/imprint.html"');
footerHtml = footerHtml.replace(/href="\.\/terms"/g, 'href="/terms.html"');
footerHtml = footerHtml.replace(/href="\.\/privacy"/g, 'href="/privacy.html"');
footerHtml = footerHtml.replace(/href="tel:\+436641999605"/g, 'href="tel:+919129127091"');

// Replace ticker inside rendered footer with pristine 4-item infinite track
const tickerOpen = '<div class="framer-n49p1z"';
const tickerIdx = footerHtml.indexOf(tickerOpen);
if (tickerIdx !== -1) {
  const ulIdx = footerHtml.indexOf('<ul', tickerIdx);
  const ulEnd = footerHtml.indexOf('</ul>', ulIdx) + 5;
  const newUl = `<ul class="grand-ticker-track" data-grand-gap="162px">\n${tickerTrackItems}\n</ul>`;
  footerHtml = footerHtml.slice(0, ulIdx) + newUl + footerHtml.slice(ulEnd);
}

// 4. Client-side script to wire staggered 3D text roll on hover + dynamic page-w synchronization
const footerScript = `
<script id="grand-footer-motion-script">
(function() {
  function syncPageWidth() {
    var pw = window.innerWidth + 'px';
    document.documentElement.style.setProperty('--grand-page-w', pw);
  }
  syncPageWidth();
  window.addEventListener('resize', syncPageWidth, { passive: true });

  function initGrandFooterMotions() {
    syncPageWidth();
    var footer = document.querySelector('footer.framer-18na9ah');
    if (!footer) return;

    // 1. Wire rolling text hover on all footer links
    var links = footer.querySelectorAll('a');
    links.forEach(function(link) {
      // Find ONLY the individual character groups inside data-rolling-label
      var charGroups = link.querySelectorAll('span[data-rolling-label] > span[aria-hidden="true"]');
      if (charGroups.length === 0) return;

      // Ensure initial styles for character layers (DO NOT touch parent container)
      charGroups.forEach(function(group) {
        var topSpan = group.children[1];
        var botSpan = group.children[2];
        if (topSpan) {
          topSpan.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)';
          topSpan.style.transform = 'none';
        }
        if (botSpan) {
          botSpan.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)';
          botSpan.style.transform = 'translateY(100%)';
        }
      });

      link.addEventListener('mouseenter', function() {
        charGroups.forEach(function(group, i) {
          var topSpan = group.children[1];
          var botSpan = group.children[2];
          var delay = (i * 0.016).toFixed(3) + 's';
          if (topSpan) {
            topSpan.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ' + delay;
            topSpan.style.transform = 'translateY(-100%)';
          }
          if (botSpan) {
            botSpan.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ' + delay;
            botSpan.style.transform = 'translateY(0%)';
          }
        });
      });

      link.addEventListener('mouseleave', function() {
        charGroups.forEach(function(group, i) {
          var topSpan = group.children[1];
          var botSpan = group.children[2];
          var delay = (i * 0.012).toFixed(3) + 's';
          if (topSpan) {
            topSpan.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ' + delay;
            topSpan.style.transform = 'none';
          }
          if (botSpan) {
            botSpan.style.transition = 'transform 0.42s cubic-bezier(0.16, 1, 0.3, 1) ' + delay;
            botSpan.style.transform = 'translateY(100%)';
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrandFooterMotions);
  } else {
    initGrandFooterMotions();
  }
})();
</script>
`;

const universalFooter = `
<!-- ========================================== -->
<!-- UNIVERSAL FOOTER (EXACT HOME REPLICA 1:1)  -->
<!-- ========================================== -->
<style id="universal-grand-footer-styles">
${css}
</style>

${footerHtml}

${footerScript}
<!-- ========================================== -->
`;

fs.writeFileSync('scripts/master_universal_footer_snippet.html', universalFooter, 'utf8');
console.log('Saved scripts/master_universal_footer_snippet.html!');
