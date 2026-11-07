import fs from 'node:fs';

const filePath = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo/venues/open-earth-lawn.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Update mask on #subpage-vector-map img
const targetImgCss = `#subpage-vector-map img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
    /* Soft vertical blend into section header and footer */
    mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
  }`;

const replacementImgCss = `#subpage-vector-map img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
    /* Casa Momo Exact 10% Feathered Dissolve Mask on all 4 borders */
    mask-image: linear-gradient(to right, transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent), linear-gradient(transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent), linear-gradient(transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent);
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
  }
  #bigtext-1 {
    will-change: opacity;
    transition: opacity 0.05s ease-out;
  }`;

if (html.includes(targetImgCss)) {
  html = html.replace(targetImgCss, replacementImgCss);
  console.log('Successfully replaced #subpage-vector-map img CSS mask.');
} else {
  console.log('Target CSS not found exactly, attempting regex replacement...');
  html = html.replace(/#subpage-vector-map img\s*\{[^}]+mask-image:[^}]+\}/, replacementImgCss);
  console.log('Regex replacement completed.');
}

// 2. Add scroll fade listener in casa-details-reveal-engine-js
const jsTarget = `obs.observe(head);
    });
  }`;

const jsReplacement = `obs.observe(head);
    });

    // 5. Scroll-driven fade-out for Location section matching Casa Momo
    var locSec = document.getElementById('bigtext-1');
    if (locSec) {
      function onLocScroll() {
        var r = locSec.getBoundingClientRect();
        // Between top 150px (fully visible) and top 35px (reaching navbar logo), fade out smoothly
        if (r.top >= 150) {
          locSec.style.opacity = '1';
        } else if (r.top <= 35) {
          locSec.style.opacity = '0';
        } else {
          var progress = (r.top - 35) / (150 - 35);
          locSec.style.opacity = progress.toFixed(3);
        }
      }
      window.addEventListener('scroll', onLocScroll, { passive: true });
      window.addEventListener('resize', onLocScroll, { passive: true });
      onLocScroll();
    }
  }`;

if (html.includes(jsTarget)) {
  html = html.replace(jsTarget, jsReplacement);
  console.log('Successfully inserted onLocScroll into initCasaReveals.');
} else {
  console.error('jsTarget not found in HTML!');
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('open-earth-lawn.html updated and saved successfully.');
