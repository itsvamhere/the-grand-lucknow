import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/Administrator/.gemini/antigravity/scratch/the-grand-lucknow/venues';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const mapStylesTarget = `.casa-map-chip.active-venue-chip {`;
const mapStylesReplacement = `.casa-map-chip.active-venue-chip,
  .casa-map-chip,
  .landmark-pill {
    position: absolute !important;
    left: 18px !important;
    top: -14px !important;
    transform: translateY(-100%) !important;
    background: rgba(16, 35, 29, 0.92) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(255, 240, 202, 0.16) !important;
    color: #FFF0CA !important;
    border-radius: 2px !important;
    padding: 7px 12px 8px 12px !important;
    font-family: 'Lay Grotesk Regular', system-ui, -apple-system, sans-serif !important;
    font-size: 14px !important;
    line-height: 1.2em !important;
    white-space: nowrap !important;
    pointer-events: none !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25) !important;
    letter-spacing: 0.01em !important;
  }
  @media (max-width: 809.98px) {
    .casa-map-chip.active-venue-chip,
    .casa-map-chip,
    .landmark-pill {
      font-size: 13px !important;
      padding: 7px 12px 8px 12px !important;
    }
  }
  #subpage-vector-map img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 42%;
    transform: scale(1.08);
    display: block;
    user-select: none;
    -webkit-user-drag: none;
    mask-image: linear-gradient(to right, transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent), linear-gradient(transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent), linear-gradient(transparent, rgb(0, 0, 0) 10%, rgb(0, 0, 0) calc(90%), transparent);
    mask-composite: intersect;
    -webkit-mask-composite: source-in;
  }
  .old-inactive-chip-style {`;

const mobileHeaderFooterRules = `
  /* Mobile Header & Logo Alignment */
  header.framer-1i47qog {
    position: fixed !important;
    top: 0 !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 100% !important;
    max-width: 100vw !important;
    z-index: 1000 !important;
    padding: 16px 20px !important;
    box-sizing: border-box !important;
  }
  header [data-framer-name="Mobile Navbar"],
  .framer-keuai4-container {
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    z-index: 1001 !important;
  }
  .framer-p57yy4-container {
    opacity: 1 !important;
    transform: none !important;
  }
  [data-framer-name="Logo"],
  .framer-1ngqbpf {
    z-index: 1002 !important;
    display: flex !important;
    align-items: center !important;
  }
  .framer-gyzc1k svg {
    max-width: 160px !important;
    height: auto !important;
  }

  /* Footer Legal & Imprint Alignment */
  footer.framer-18na9ah .framer-j9pwx {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 16px !important;
    width: 100% !important;
    padding-top: 32px !important;
    border-top: 1px solid rgba(255, 240, 202, 0.12) !important;
  }
  footer.framer-18na9ah .framer-26ic7s {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 16px !important;
    width: 100% !important;
  }
  footer.framer-18na9ah .framer-1hro1pc p {
    text-align: center !important;
  }
`;

let mapPatched = 0;
let footerPatched = 0;

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (content.includes('.casa-map-chip.active-venue-chip {') && !content.includes('rgba(16, 35, 29, 0.92)')) {
    // Replace the active-venue-chip style
    const startIdx = content.indexOf('.casa-map-chip.active-venue-chip {');
    const endIdx = content.indexOf('</style>', startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
      const originalBlock = content.substring(startIdx, endIdx);
      content = content.substring(0, startIdx) + mapStylesReplacement + '\n' + content.substring(endIdx);
      changed = true;
      mapPatched++;
    }
  }

  if (content.includes('id="universal-grand-footer-styles"') && !content.includes('Mobile Header & Logo Alignment')) {
    const endStyleIdx = content.indexOf('</style>', content.indexOf('id="universal-grand-footer-styles"'));
    if (endStyleIdx !== -1) {
      content = content.substring(0, endStyleIdx) + mobileHeaderFooterRules + '\n' + content.substring(endStyleIdx);
      changed = true;
      footerPatched++;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log(`Patched map styles in ${mapPatched} files.`);
console.log(`Patched header/footer styles in ${footerPatched} files.`);
