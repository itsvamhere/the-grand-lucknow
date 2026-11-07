import fs from 'node:fs';

let html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Update the mask on #subpage-vector-map img to match Casa Momo's broad top fade
const oldMaskRegex = /mask-image:\s*linear-gradient[^;]+;\s*-webkit-mask-image:\s*linear-gradient[^;]+;/;
const newMask = `mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 9%, black 22%, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 9%, black 22%, black 85%, transparent 100%);
    mask-composite: intersect;
    -webkit-mask-composite: source-in;`;

if (oldMaskRegex.test(html)) {
  html = html.replace(oldMaskRegex, newMask);
  console.log('Updated map mask image.');
} else {
  console.log('Old mask pattern not matched, inserting in #grand-subpage-map-styles');
  html = html.replace('#subpage-vector-map img {', `#subpage-vector-map img {\n    ${newMask}`);
}

// 2. Ensure #bigtext-1 has will-change: opacity
const bigTextStyle = `
  #bigtext-1 {
    will-change: opacity;
    transition: opacity 0.08s ease-out;
  }
`;
if (!html.includes('#bigtext-1 {')) {
  html = html.replace('</style id="grand-subpage-map-styles">', `${bigTextStyle}\n</style>`);
}

// 3. Add scroll-driven fade-out logic in casa-details-reveal-engine-js
const fadeScript = `
    // 5. Scroll-driven fade-out for Location heading & button as it reaches the fixed navbar (matching Casa Momo)
    var locSection = document.getElementById('bigtext-1');
    if (locSection) {
      function updateLocationFade() {
        var rect = locSection.getBoundingClientRect();
        // Between top = 140px (fully visible) and top = 35px (reaching navbar logo level), fade out smoothly
        var fadeStart = 140;
        var fadeEnd = 35;
        var opacity = 1;
        if (rect.top < fadeStart) {
          opacity = (rect.top - fadeEnd) / (fadeStart - fadeEnd);
          if (opacity < 0) opacity = 0;
          if (opacity > 1) opacity = 1;
        }
        locSection.style.opacity = opacity.toFixed(3);
      }
      window.addEventListener('scroll', updateLocationFade, { passive: true });
      updateLocationFade();
    }
`;

// Insert into initCasaReveals before the end of the function
if (!html.includes('updateLocationFade')) {
  html = html.replace('obs.observe(head);\n    });\n  }', `obs.observe(head);\n    });\n${fadeScript}\n  }`);
  console.log('Inserted scroll fade-out script for Location section.');
}

fs.writeFileSync('venues/open-earth-lawn.html', html);
console.log('venues/open-earth-lawn.html updated successfully with Casa Momo fade mechanics!');
