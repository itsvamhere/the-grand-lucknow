import fs from 'fs';

let h = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// 1. Update active-venue-chip z-index from 10 to 2
h = h.replace(
  /\.casa-map-chip\.active-venue-chip\s*\{([^}]*?)z-index:\s*10\s*!important;([^}]*?)\}/g,
  '.casa-map-chip.active-venue-chip {$1z-index: 2 !important;$2}'
);

// 2. Update grand-live-pointer inline style z-index from 3 to 2
h = h.replace(
  /id="grand-live-pointer" style="position: absolute; left: 50%; top: 40%; transform: translate\(-50%, -50%\); pointer-events: none; z-index: 3;"/g,
  'id="grand-live-pointer" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%); pointer-events: none; z-index: 2;"'
);

// 3. Add explicit z-index: 40 to Sticky Button and Button Overlay in casa-sticky-button style block
const stickyOverlayCss = `
[data-framer-name="Button Overlay"],
.framer-8m2qta {
  z-index: 40 !important;
}
[data-framer-name="Sticky Button"],
.framer-1n8t7q3 {
  z-index: 40 !important;
}
`;

if (!h.includes('z-index: 40 !important;')) {
  h = h.replace(
    /<style id="casa-sticky-button">/g,
    `<style id="casa-sticky-button">${stickyOverlayCss}`
  );
}

fs.writeFileSync('venues/open-earth-lawn.html', h, 'utf8');
console.log('Successfully updated venues/open-earth-lawn.html with button stacking fix!');
