// The Grand palette (derived from thegrandlucknow.in: charcoal + antique gold, Playfair/Poppins luxury-wedding register).
// Maps the inherited Casa Momo colour tokens to ours across every page. Idempotent: targets never match sources.
// Run from repo root: node tools/apply_palette.mjs
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const P = {
  ink: '#121110',        // ground: warm charcoal (brand #141414, warmed so ivory/gold sit on it)
  inkRaised: '#1C1A17',  // chips, cards, raised surfaces
  ivory: '#FFF0CA',      // text on ink, light sections, buttons (matches master map tone)
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
  // ivory family: Casa cream #FFF0CA, #F3ECDD, #F6EEDC -> #FFF0CA
  [hexRe('#f6eedc'), P.ivory], [rgbRe(246, 238, 220), m => `${m[1]}(${R(P.ivory)}`],
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
      const navBlurCss = [
        'html body header,html body header [data-framer-name="Navbar Menu"],html body header .framer-1nw9de0-container,html body header .framer-gaeku5-container,html body header .framer-1nw9de0-container nav,html body header .framer-gaeku5-container nav,html body header nav,html body header .framer-c5802p-container,html body header [data-framer-name="Mobile Menu"],html body.grand-nav-revealed header .framer-1nw9de0-container,html body.grand-nav-revealed header .framer-1nw9de0-container nav,html body.grand-nav-revealed header .framer-gaeku5-container nav,html body.grand-nav-revealed header [data-framer-name="Navbar Menu"],html body.grand-user-scrolled header .framer-1nw9de0-container,html body.grand-user-scrolled header .framer-1nw9de0-container nav,html body.grand-user-scrolled header .framer-gaeku5-container nav,html body.grand-user-scrolled header [data-framer-name="Navbar Menu"]{transform:none!important;will-change:auto!important}',
        'header div.framer-1kcv8in,header div.framer-gaygr9,header nav>div[data-framer-name="Nav Link"],header .framer-1s5ig4a,header div[data-framer-name="Menu Button"]{background-color:rgba(255,240,202,0.07)!important;backdrop-filter:blur(8px)!important;-webkit-backdrop-filter:blur(8px)!important;border-radius:2px!important;transition:background-color 0.25s ease-in-out!important}',
        'html.logo-dark-text header div.framer-1kcv8in,html[data-logo-theme="dark"] header div.framer-1kcv8in,body.is-light-theme header div.framer-1kcv8in,html.logo-dark-text header div.framer-gaygr9,html[data-logo-theme="dark"] header div.framer-gaygr9,body.is-light-theme header div.framer-gaygr9,html.logo-dark-text header nav>div[data-framer-name="Nav Link"],html[data-logo-theme="dark"] header nav>div[data-framer-name="Nav Link"],body.is-light-theme header nav>div[data-framer-name="Nav Link"],html.logo-dark-text header .framer-1s5ig4a,html[data-logo-theme="dark"] header .framer-1s5ig4a,body.is-light-theme header .framer-1s5ig4a,html.logo-dark-text header div[data-framer-name="Menu Button"],html[data-logo-theme="dark"] header div[data-framer-name="Menu Button"],body.is-light-theme header div[data-framer-name="Menu Button"]{background-color:rgba(28,26,23,0.08)!important;backdrop-filter:blur(8px)!important;-webkit-backdrop-filter:blur(8px)!important}',
        'html.logo-dark-text header nav [data-rolling-label],html[data-logo-theme="dark"] header nav [data-rolling-label],body.is-light-theme header nav [data-rolling-label],html.logo-dark-text header nav a p,html[data-logo-theme="dark"] header nav a p,body.is-light-theme header nav a p,html.logo-dark-text header .framer-1s5ig4a [data-rolling-label],html[data-logo-theme="dark"] header .framer-1s5ig4a [data-rolling-label],body.is-light-theme header .framer-1s5ig4a [data-rolling-label]{color:#1C1A17!important;transition:color 0.25s ease-in-out!important}',
        'html.logo-dark-text header .framer-1t6aeyj-container a,html[data-logo-theme="dark"] header .framer-1t6aeyj-container a,body.is-light-theme header .framer-1t6aeyj-container a{background-color:#1C1A17!important;color:#FFF0CA!important}',
        'html.logo-dark-text header .framer-1t6aeyj-container a *,html[data-logo-theme="dark"] header .framer-1t6aeyj-container a *,body.is-light-theme header .framer-1t6aeyj-container a *{color:#FFF0CA!important;fill:#FFF0CA!important}',
        '.mc-ch-wrap{display:inline-block!important;overflow:hidden!important;vertical-align:top!important;height:1.2em!important;line-height:1.2em!important}',
        '.mc-ch{display:inline-block!important;white-space:pre!important;transform:translateY(105%)!important;opacity:1!important;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1) calc(var(--i,0)*0.015s)!important}',
        '.grand-map-cursor.is-active .mc-ch,[data-morph-cursor].is-text-active .mc-ch{transform:translateY(0%)!important;opacity:1!important}',
        '.grand-map-cursor svg,[data-morph-cursor] svg{transform:translate(-6px,6px)!important;opacity:0!important;transition:transform 0.35s cubic-bezier(0.52,0,0,1) 0.04s,opacity 0.2s ease 0.04s!important}',
        '.grand-map-cursor.is-active svg,[data-morph-cursor].is-text-active svg{transform:translate(0,0)!important;opacity:1!important}',
        '[data-rolling-label]{overflow:hidden!important;display:inline-block!important;vertical-align:top!important}',
        '[data-rolling-label] span[aria-hidden="true"]>span{transition:transform 0.35s cubic-bezier(0.16,1,0.3,1)!important}',
        ...Array.from({length:24},(_,i)=>`[data-rolling-label]>span[aria-hidden="true"]:nth-of-type(${i+1})>span{transition-delay:${(i*0.015).toFixed(3)}s!important}`),
        'a:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(2),a.hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(2),button:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(2),[role="button"]:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(2),.framer-vO7O2:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(2){transform:translateY(-100%)!important}',
        'a:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(3),a.hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(3),button:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(3),[role="button"]:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(3),.framer-vO7O2:hover [data-rolling-label] span[aria-hidden="true"]>span:nth-child(3){transform:translateY(0%)!important}',
        '.framer-vO7O2 .framer-1ko9uiy .framer-14b9qd0,.framer-vO7O2 .framer-1ko9uiy .framer-m12jrg{transition:top 0.35s cubic-bezier(0.52,0,0,1),left 0.35s cubic-bezier(0.52,0,0,1)!important}',
        '.framer-vO7O2 .framer-1ko9uiy .framer-14b9qd0{top:12px!important;left:-10px!important}',
        '.framer-vO7O2 .framer-1ko9uiy .framer-m12jrg{top:1px!important;left:1px!important}',
        '.framer-vO7O2:hover .framer-1ko9uiy .framer-14b9qd0,.framer-vO7O2.hover .framer-1ko9uiy .framer-14b9qd0{top:1px!important;left:1px!important}',
        '.framer-vO7O2:hover .framer-1ko9uiy .framer-m12jrg,.framer-vO7O2.hover .framer-1ko9uiy .framer-m12jrg{top:-10px!important;left:12px!important}'
      ].join('');
      h = h.replace('</head>', `<style id="grand-palette">:root{--grand-ink:${P.ink};--grand-ivory:${P.ivory};--grand-gold:${P.gold};--token-86299043-b8f8-4618-9585-4835ac76e9b7:${P.terracotta}!important}html,body{background-color:${P.ivory}!important}::selection{background:${P.gold};color:${P.ink}}:focus-visible{outline:2px solid ${P.gold}!important;box-shadow:0 0 0 4px ${P.ink}!important}@media (hover: hover) and (pointer: fine) and (min-width: 810px){html.grand-custom-cursor,html.grand-custom-cursor body,html.grand-custom-cursor *{cursor:none!important}}.framer-1nb205x .framer-1wtvhr3{background-color:${P.terracotta}!important}a.framer-ysBPc img,a.framer-187wlle img{transition:transform 0.65s cubic-bezier(0.22,1,0.36,1)}a.framer-ysBPc:hover img,a.framer-187wlle:hover img{transform:scale(1.045)}footer.framer-18na9ah{background-color:${P.terracottaDeep}!important;color:${P.ivory}!important}footer.framer-18na9ah .framer-zHQwT{background-color:${P.terracotta}!important;border-top:none!important}footer.framer-18na9ah p,footer.framer-18na9ah span,footer.framer-18na9ah a{color:${P.ivory}!important}${navBlurCss}</style>\n</head>`);
    }
    writeFileSync(p, h); files++; subs += n;
  }
})('.');
console.log('palette applied:', files, 'files,', subs, 'substitutions');
