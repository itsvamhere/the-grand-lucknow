// Idempotent: injects <style id="grand-edge-fix"> into every page that has the footer ticker or gallery grid.
// Run from repo root: node tools/apply_edge_fix.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CSS = `<style id="grand-edge-fix">
/* Footer ticker: bleed to both screen edges (escape the footer's side padding / 1600px cap) */
footer.framer-18na9ah .framer-n49p1z { width: 100vw !important; max-width: none !important; flex: none !important; }
footer.framer-18na9ah, [data-framer-name="Footer"] { order: 99 !important; }
/* Gallery: Framer runtime normally swaps to a 4-col grid on phones; replicate it so images keep the 12px page gutter */
@media (max-width: 809.98px) {
  .framer-6iEzR.framer-15w097k { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; width: 100% !important; row-gap: 0 !important; column-gap: 12px !important; }
  .framer-6iEzR.framer-15w097k > .framer-18k7fzy { grid-column: 1 / span 3 !important; }
  .framer-6iEzR.framer-15w097k > .framer-srwmag + .framer-18k7fzy { grid-column: 2 / span 3 !important; }
  footer.framer-18na9ah [data-framer-name="Large Phone"] [data-rolling-label] { font-size: min(20px, 5.2vw) !important; }
  /* Mobile footer wordmark: scale to fit 375px viewport cleanly instead of clipping */
  footer.framer-18na9ah .framer-n49p1z { height: 76px !important; }
  footer.framer-18na9ah .framer-n49p1z ul { height: 76px !important; gap: 36px !important; }
  footer.framer-18na9ah .framer-n49p1z li,
  footer.framer-18na9ah .framer-n49p1z .ticker-item { height: 76px !important; width: 340px !important; }
  footer.framer-18na9ah .framer-xj8hz2 { width: 340px !important; height: 42px !important; margin: 0 !important; }
  /* Mobile venue card metadata badges: wrap instead of clipping off right edge */
  [data-framer-name="Venue Item"] [data-framer-name="Details"],
  .framer-pdn1cz[data-framer-name="Details"] { flex-wrap: wrap !important; row-gap: 6px !important; }
  /* Mobile home hero: ensure full-bleed cover image & push title clear of fixed header */
  section.framer-1xtxml1, section.framer-1xtxml1 .framer-1rl0m2f-container, section.framer-1xtxml1 .framer-153bgu-container { min-height: 100svh !important; }
  section.framer-1xtxml1 img { object-fit: cover !important; object-position: center center !important; width: 100% !important; height: 100% !important; }
  section.framer-1xtxml1 .framer-1ao0xob, section.framer-1xtxml1 h1, section.framer-1xtxml1 .framer-jt1ryb { padding-top: 68px !important; }
}
</style>`;

const skip = new Set(['node_modules', 'archive', '.git', '.agents', 'raw_photos', 'images', 'fonts', 'scripts', 'tools']);
let n = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    if (skip.has(f)) continue;
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!f.endsWith('.html')) continue;
    let h = readFileSync(p, 'utf8');
    if (!/framer-n49p1z|framer-6iEzR/.test(h)) continue;
    h = h.replace(/<style id="grand-edge-fix">[\s\S]*?<\/style>/, '');
    h = h.replace('</head>', CSS + '\n</head>');
    writeFileSync(p, h); n++; console.log('patched', p);
  }
})('.');
console.log(n, 'files');
