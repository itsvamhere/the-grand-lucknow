// The Grand palette (derived from thegrandlucknow.in: charcoal + antique gold, Playfair/Poppins luxury-wedding register).
// Maps the inherited Casa Momo colour tokens to ours across every page. Idempotent: targets never match sources.
// Run from repo root: node tools/apply_palette.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const P = {
  ink: '#121110',        // ground: warm charcoal (brand #141414, warmed so ivory/gold sit on it)
  inkRaised: '#1C1A17',  // chips, cards, raised surfaces
  ivory: '#F6EEDC',      // text on ink, light sections, buttons
  terracotta: '#BC6F45', // footer face
  terracottaDeep: '#964317', // footer outer band
  gold: '#D9A520',       // brand accent: focus, selection, highlights
};
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const R = h => rgb(h).join(',');
// [source pattern, replacement]; patterns are case-insensitive and tolerate spaces inside rgb()/rgba().
const sp = '\\s*';
const rgbRe = (r, g, b) => new RegExp(`\\b(rgba?)\\(${sp}${r}${sp},${sp}${g}${sp},${sp}${b}${sp}`, 'gi');
const hexRe = h => new RegExp(h + '\\b', 'gi');
const MAP = [
  // ink family: Casa olive #0E1201, green #10231D / #1A241E / #161A13
  [hexRe('#0e1201'), P.ink], [rgbRe(14, 18, 1), m => `${m[1]}(${R(P.ink)}`],
  [hexRe('#10231d'), P.ink], [rgbRe(16, 35, 29), m => `${m[1]}(${R(P.ink)}`],
  [hexRe('#1a241e'), P.inkRaised], [rgbRe(26, 36, 30), m => `${m[1]}(${R(P.inkRaised)}`],
  [hexRe('#1a1f0b'), P.inkRaised], [rgbRe(26, 31, 11), m => `${m[1]}(${R(P.inkRaised)}`],
  [hexRe('#131a14'), P.inkRaised],
  [hexRe('#161a13'), P.inkRaised],
  // ivory family: Casa cream #FFF0CA, #F3ECDD
  [hexRe('#fff0ca'), P.ivory], [rgbRe(255, 240, 202), m => `${m[1]}(${R(P.ivory)}`],
  [hexRe('#f3ecdd'), P.ivory], [rgbRe(243, 236, 221), m => `${m[1]}(${R(P.ivory)}`],
  // legacy bronze -> orangish terracotta footer (#964317 / #BC6F45)
  [hexRe('#6b4a0c'), P.terracottaDeep], [rgbRe(107, 74, 12), m => `${m[1]}(${R(P.terracottaDeep)}`],
  [hexRe('#c2653a'), P.terracotta],
  [hexRe('#8a6212'), P.terracotta], [rgbRe(138, 98, 18), m => `${m[1]}(${R(P.terracotta)}`],
  [hexRe('#957026'), P.terracotta], [rgbRe(149, 112, 38), m => `${m[1]}(${R(P.terracotta)}`],
  [hexRe('#755414'), P.terracotta], [rgbRe(117, 84, 20), m => `${m[1]}(${R(P.terracotta)}`],
  [rgbRe(189, 131, 70), m => `${m[1]}(${R(P.terracotta)}`],
];
const skip = new Set(['node_modules', 'archive', '.git', '.agents', 'raw_photos', 'images', 'fonts', 'tools']);
let files = 0, subs = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    if (skip.has(f)) continue;
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(html|mjs|css)$/.test(f)) continue;
    let h = readFileSync(p, 'utf8'), n = 0;
    for (const [re, to] of MAP) h = h.replace(re, (...a) => (n++, typeof to === 'function' ? to(a) : to));
    if (f.endsWith('.html')) {
      h = h.replace(/<style id="grand-palette">[\s\S]*?<\/style>/, '');
      h = h.replace('</head>', `<style id="grand-palette">:root{--grand-ink:${P.ink};--grand-ivory:${P.ivory};--grand-gold:${P.gold};--token-86299043-b8f8-4618-9585-4835ac76e9b7:${P.terracotta}!important}::selection{background:${P.gold};color:${P.ink}}:focus-visible{outline:2px solid ${P.gold}!important;box-shadow:0 0 0 4px ${P.ink}!important}footer.framer-18na9ah{background-color:${P.terracottaDeep}!important;color:${P.ivory}!important}footer.framer-18na9ah .framer-zHQwT{background-color:${P.terracotta}!important;border-top:none!important}footer.framer-18na9ah p,footer.framer-18na9ah span,footer.framer-18na9ah a{color:${P.ivory}!important}footer.framer-18na9ah a:hover{opacity:0.8!important}</style>\n</head>`);
    }
    writeFileSync(p, h); files++; subs += n;
  }
})('.');
console.log('palette applied:', files, 'files,', subs, 'substitutions');
