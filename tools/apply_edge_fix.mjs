// Idempotent: injects <style id="grand-edge-fix"> into every page that has the footer ticker or gallery grid.
// Run from repo root: node tools/apply_edge_fix.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const CSS = `<style id="grand-edge-fix">
/* Footer ticker: bleed to both screen edges (escape the footer's side padding / 1600px cap) */
footer.framer-18na9ah .framer-n49p1z { width: 100vw !important; max-width: none !important; flex: none !important; }
footer.framer-18na9ah, [data-framer-name="Footer"] { order: 10 !important; }
/* Gallery: Framer runtime normally swaps to a 4-col grid on phones; replicate it so images keep the 12px page gutter */
@media (max-width: 809.98px) {
  .framer-6iEzR.framer-15w097k { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; width: 100% !important; row-gap: 0 !important; column-gap: 12px !important; }
  .framer-6iEzR.framer-15w097k > .framer-18k7fzy { grid-column: 1 / span 3 !important; }
  .framer-6iEzR.framer-15w097k > .framer-srwmag + .framer-18k7fzy { grid-column: 2 / span 3 !important; }
  footer.framer-18na9ah [data-framer-name="Large Phone"] [data-rolling-label] { font-size: min(20px, 5.2vw) !important; }
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
