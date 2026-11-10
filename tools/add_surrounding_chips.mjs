import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/Administrator/.gemini/antigravity/scratch/the-grand-lucknow/venues';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const surroundingChipsHTML = `
        <!-- Surrounding Regional Context (10-15km Area Radius) -->
        <div class="casa-map-chip location-chip" style="left: 48%; top: 18%;">Amar Shaheed Path</div>
        <div class="casa-map-chip location-chip" style="left: 26%; top: 28%;">SGPGI Lucknow</div>
        <div class="casa-map-chip location-chip" style="left: 78%; top: 38%;">Kisan Path (Outer Ring)</div>
        <div class="casa-map-chip location-chip" style="left: 32%; top: 62%;">Raebareli Rd (NH-24B)</div>
        <div class="casa-map-chip location-chip" style="left: 58%; top: 76%;">Mohanlalganj</div>
`;

const chipCSS = `
  .casa-map-chip.location-chip {
    background: rgba(16, 35, 29, 0.92) !important;
    color: #FFF0CA !important;
    border: 1px solid rgba(255, 240, 202, 0.16) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border-radius: 2px !important;
    padding: 6px 12px 7px 12px !important;
    font-family: 'Lay Grotesk Regular', system-ui, -apple-system, sans-serif !important;
    font-size: 13px !important;
    line-height: 1.2em !important;
    letter-spacing: 0.01em !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    pointer-events: none !important;
    position: absolute !important;
    transform: translate(-50%, -50%) !important;
    z-index: 2 !important;
    white-space: nowrap !important;
  }
  @media (max-width: 809.98px) {
    .casa-map-chip.location-chip {
      font-size: 11px !important;
      padding: 4px 8px 5px 8px !important;
    }
  }
`;

let count = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  let changed = false;

  // 1. Add CSS
  if (content.includes('id="grand-subpage-map-styles"') && !content.includes('.casa-map-chip.location-chip {')) {
    const endStyleIdx = content.indexOf('</style>', content.indexOf('id="grand-subpage-map-styles"'));
    if (endStyleIdx !== -1) {
      content = content.substring(0, endStyleIdx) + chipCSS + '\n' + content.substring(endStyleIdx);
      changed = true;
    }
  }

  // 2. Add chips into subpage-vector-map
  if (content.includes('id="grand-live-pointer"') && !content.includes('Amar Shaheed Path')) {
    const pointerIdx = content.indexOf('</div>', content.indexOf('id="grand-live-pointer"'));
    const outerPointerClose = content.indexOf('</div>', pointerIdx + 10);
    const finalPointerClose = content.indexOf('</div>', outerPointerClose + 10);

    if (finalPointerClose !== -1) {
      content = content.substring(0, finalPointerClose + 6) + surroundingChipsHTML + content.substring(finalPointerClose + 6);
      changed = true;
      count++;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log(`Added surrounding location chips to ${count} subpages.`);
