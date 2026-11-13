// Builds /about, /contact and /venues: Casa Momo's real route <main> (layout, CSS, appear data) inside OUR proven subpage shell
// (header, footer, fonts, nav/contrast scripts), with our copy + our images. No Framer runtime (it would rehydrate Casa copy).
// Run from repo root: node tools/build_core_pages.mjs   (then node tools/apply_palette.mjs)
import fs from 'node:fs';

const rd = f => fs.readFileSync(f, 'utf8');
const SHELL = rd('venues/open-earth-lawn.html');
const MOTION = rd('tools/motion_engine.js');

const words = t => t.trim().split(/\s+/);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dec = s => s.replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
const UNIT = /<span style="(display:inline-flex;overflow:hidden;[^"]*)"><span style="(display:inline-block;[^"]*)">([^<]*)<\/span><\/span>/g;
const RUN = /(?:<span style="display:inline-flex;overflow:hidden;[^"]*"><span style="display:inline-block;[^"]*">[^<]*<\/span><\/span>(?: <!-- -->)? ?)+/g;
const IMG = /https:\/\/framerusercontent\.com\/images\/([A-Za-z0-9]+)\.(webp|png|jpg|jpeg)[^"\s,)]*/g;
const ALT = {
  the_grand_courtyard_official: 'The Grand Courtyard, an architecturally framed courtyard at The Grand Lucknow',
  garden_galaxy_official: 'Garden Galaxy, an open-air garden venue at The Grand Lucknow',
  open_earth_lawn_official: 'Open Earth Lawn with manicured greens and palms at The Grand Lucknow',
  grassland_gala_official: 'Grassland Gala, an expansive celebration lawn at The Grand Lucknow',
  royal_legacy_banquet_official: 'The Royal Legacy Banquet, an indoor banquet hall at The Grand Lucknow',
  avatar_1: 'Amit Jaiswal',
  avatar_2: 'Quausain Raza',
  avatar_3: 'Aditya & Shweta Srivastava',
  avatar_4: 'Dr. Utkarsh Verma',
  avatar_5: 'Priyanka & Kshitij Mehrotra',
};

function rollingLabel(text) {
  const chars = [...text].map(ch =>
    `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${esc(ch)}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${esc(ch)}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${esc(ch)}</span></span>`
  ).join('');
  return `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${esc(text)}</span>${chars}`;
}

function swapRuns(h, map, log) {
  return h.replace(RUN, run => {
    const us = [...run.matchAll(UNIT)];
    const orig = us.map(u => dec(u[3])).join(' ');
    const to = map[orig];
    if (to === undefined) { log.push('UNMAPPED RUN: ' + orig.slice(0, 70)); return run; }
    const [, a, b] = us[0];
    return words(to).map(w => `<span style="${a}"><span style="${b}">${esc(w)}</span></span>`).join(' <!-- --> ') + ' ';
  });
}

function customizeVenuesMain(main) {
  const gS = main.indexOf('data-framer-name="Apartments Grid"');
  if (gS === -1) return main;
  const secS = main.lastIndexOf('<section', gS);
  const secE = main.indexOf('</section>', gS) + 10;
  let grid = main.slice(secS, secE);

  const items = [...grid.matchAll(/<div class="framer-1ajjl3s" data-framer-name="Apartment Item">/g)];
  const listEnd = grid.lastIndexOf('</div><!--/$--></div></section>');
  const cards = items.map((m, i) => grid.slice(m.index, items[i + 1] ? items[i + 1].index : listEnd));

  const specs = [
    { slug: '/venues/open-earth-lawn', area: '25,000', cap: '2,500' },
    { slug: '/venues/grassland-gala', area: '20,000', cap: '800' },
    { slug: '/venues/garden-galaxy', area: '15,000', cap: '300' },
    { slug: '/venues/the-grand-courtyard', area: '15,000', cap: '250' },
    { slug: '/venues/the-royal-legacy-banquet', area: '10,000', cap: '600' },
  ];

  // Extract the Parking badge from Card 1 so Card 5 also gets it
  const parkMatch = cards[0].match(/<div class="framer-b78ot4" data-framer-name="Parking"[\s\S]*?<\/div><\/div><\/div>/);
  const parkingBadge = parkMatch ? parkMatch[0] : '';

  const kept = cards.slice(0, 5).map((c, i) => {
    const s = specs[i];
    let out = c
      .replace(/href="\.\/apartments\/[^"]*"/, `href="${s.slug}"`)
      .replace(/data-cursor="Apartment Details"/g, 'data-cursor="Details"')
      // Replace area number (first <p> inside Size)
      .replace(/(data-framer-name="Size"[\s\S]*?<p[^>]*>)\d+(<\/p>)/, `$1${s.area}$2`)
      // Replace m² with sq ft
      .replace(/(data-framer-name="Squaremeter"[\s\S]*?<p[^>]*>)m(<\/p>)/, '$1sq ft$2')
      .replace(/(<div class="framer-84xumc"[\s\S]*?<p[^>]*>)2(<\/p>)/, '$1$2')
      // Replace capacity number (inside People)
      .replace(/(data-framer-name="People"[\s\S]*?<p[^>]*>)\d+(<\/p>)/, `$1${s.cap}$2`);
    if (!out.includes('data-framer-name="Parking"') && parkingBadge) {
      out = out.replace(/(<\/div><\/div><\/a>)/, `${parkingBadge}$1`);
    }
    return out;
  }).join('');

  grid = grid.slice(0, items[0].index) + kept + grid.slice(listEnd);
  return main.slice(0, secS) + grid + main.slice(secE);
}

function build(cfg) {
  const log = [];
  const raw = rd(cfg.src);
  const mS = raw.indexOf('<main');
  const fS = raw.indexOf('<footer', mS);
  let src = raw.slice(mS, fS);
  if (cfg.isVenues) {
    src = customizeVenuesMain(src);
  }
  src = swapRuns(src, cfg.runs, log);
  src = src.replace(IMG, (m, id) => cfg.images[id] ?? (log.push('UNMAPPED IMG ' + id), m));
  // Strip srcset and loading="lazy" on local images so browsers load all venue/about images immediately without query params
  src = src.replace(/<img\b[^>]*>/g, tag => {
    const k = Object.keys(ALT).find(k => tag.includes(k));
    let t = tag;
    if (t.includes('src="/images/')) {
      t = t.replace(/\s+srcset="[^"]*"/, '').replace(/\s+sizes="[^"]*"/, '').replace(/\s+loading="lazy"/, '');
    }
    return k ? t.replace(/ alt="[^"]*"/, ` alt="${ALT[k]}"`).replace(/ alt(?=\s|>)/, ` alt="${ALT[k]}"`) : t;
  });
  for (const [a, b] of cfg.plain) src = src.split(a).join(b);

  // Replace slot-machine rolling label "Book Your Stay" -> "Plan Your Event"
  src = src.replace(
    /(<span data-rolling-label[^>]*>)<span style="position:absolute;width:1px;height:1px;[^"]*">Book Your Stay<\/span>(?:<span aria-hidden="true"[\s\S]*?<\/span><\/span>)+(<\/span>)/g,
    (_, open, close) => `${open}${rollingLabel('Plan Your Event')}${close}`
  );

  const routeMainInner = src
    .replace(/Casa Momo/g, 'The Grand')
    .replace(/href="\.\/apartments[^"]*"/g, 'href="/venues"')
    .replace(/href="\.\/book[^"]*"/g, 'href="/book/venue"')
    .replace(/href="mailto:[^"]*"/g, 'href="mailto:thegrandbanquet07@gmail.com"')
    .replace(/href="tel:[^"]*"/g, 'href="tel:+919129127091"');

  const routeCss = (raw.match(/<style data-framer-[^>]*>[\s\S]*?<\/style>/g) || []).join('\n');
  const appear = raw.match(/<script type="framer\/appear" id="__framer__appearAnimationsContent">[\s\S]*?<\/script>/)[0];
  const bps = raw.match(/<script type="framer\/appear" id="__framer__breakpoints">[\s\S]*?<\/script>/)[0];

  let h = SHELL;
  // Keep our shell's universal footer (<style id="universal-grand-footer-styles"> + <footer class="framer-18na9ah">...</footer>) inside <main>!
  const sS = h.indexOf('<main');
  const uFooterIdx = h.indexOf('<style id="universal-grand-footer-styles">');
  h = h.slice(0, sS) + routeMainInner + '\n' + h.slice(uFooterIdx);

  // Route CSS goes FIRST so the shell's header/footer/nav rules win the cascade
  h = h.replace(/<head>/, () => '<head>\n' + routeCss + '\n');
  // Merge root classes: keep shell's framer-eIM4l (for header/footer CSS) and add route's root class + framer-5IVAx if present
  const routeRootMatch = raw.match(/<div data-framer-root class="([^"]+)"/);
  const routeClasses = routeRootMatch ? routeRootMatch[1].split(/\s+/).filter(c => c.startsWith('framer-')) : [];
  const shellBpJson = SHELL.match(/<script type="framer\/appear" id="__framer__breakpoints">([\s\S]*?)<\/script>/)[1];
  h = h.replace(/(<div data-framer-root class=")([^"]*)(")/, (m, a, cls, z) => {
    const merged = [...new Set([...cls.replace(/ framer-1azqig2/, '').split(/\s+/), ...routeClasses])].join(' ');
    return `${a}${merged}${z}`;
  });
  h = h.replace(/<script type="framer\/appear" id="__framer__appearAnimationsContent">[\s\S]*?<\/script>/, () => appear)
    .replace(/<script type="framer\/appear" id="__framer__breakpoints">[\s\S]*?<\/script>/, () => bps);

  // Ensure star SVG symbol #svg1083848285_386 is present in #svg-templates for Reviews cards
  if (cfg.isVenues && !h.includes('id="svg1083848285_386"')) {
    h = h.replace(
      /(<div id="svg-templates"[^>]*>)/,
      `$1<svg viewBox="0 0 13 12" overflow="visible" id="svg1083848285_386"><path d="M 2.482 12 L 3.562 7.566 L 0 4.584 L 4.66 4.184 L 6.5 0 L 8.34 4.206 L 13 4.584 L 9.437 7.566 L 10.518 12 L 6.5 9.647 Z" fill="#D9A520"/></svg>`
    );
  }

  // Strip venue-only data/scripts and conflicting subpage CSS rule that forces [data-framer-name="Paragraph"] h2 dark
  h = h.replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/g, '')
    .replace(/<script id="(?:casa-details-reveal-engine-js|grand-subpage-engine-js|grand-injected-script)"[\s\S]*?<\/script>/g, '')
    .replace(/<style id="grand-location-contrast-css">[\s\S]*?<\/style>/g, '')
    .replace(/<style id="grand-palette">[\s\S]*?<\/style>/, '')
    .replace(/<script id="grand-motion-engine">[\s\S]*?<\/script>/, '');

  // Clean up any "Casa Momo" mentions inside shell comments/CSS so zero Casa Momo strings exist in built HTML
  h = h.replace(/Casa\s*Momo/gi, 'The Grand');
  // Ensure desktop and mobile "Book Now" links point to /book/venue
  h = h.replace(/(class="framer-WPG77 framer-B9619 framer-tv448v framer-v-tv448v framer-13c2ecc"[^>]*href=")\/contact(")/g, '$1/book/venue$2')
       .replace(/(class="framer-1fslfdg framer-fx9txd" data-framer-name="Nav Link" href=")\/contact(")/g, '$1/book/venue$2')
       .replace(/(class="framer-vO7O2[^"]*"[^>]*data-framer-name="White"[^>]*href=")\/contact(")/g, '$1/book/venue$2');

  // Route-specific CSS fixes (ensure Locations & Reviews sections sit on ivory #F6EEDC background, have dark headings, and Footer stays last in mobile flex layouts)
  const extraCss = `<style id="grand-core-route-fixes">
  [data-framer-name="Reviews"],
  [data-framer-name="Locations"],
  #locations {
    background-color: var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2, #F6EEDC) !important;
  }
  #locations h2, #locations h2 span,
  [data-framer-name="Locations"] h2, [data-framer-name="Locations"] h2 span,
  [data-framer-name="Reviews"] h2, [data-framer-name="Reviews"] h2 span {
    color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, #121110) !important;
  }
  footer.framer-18na9ah, [data-framer-name="Footer"] {
    order: 99 !important;
  }
  [data-framer-name="Reviews"] .framer-rntb33::-webkit-scrollbar { display: none; }
  .framer-KzfvT .framer-84xumc { display: none !important; }
</style>`;

  // Head meta
  const U = 'https://the-grand-lucknow.vercel.app' + cfg.path;
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${cfg.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${cfg.desc}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${cfg.title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${cfg.desc}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${U}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${U}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${cfg.title}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${cfg.desc}`)
    .replace('</head>', () => `${extraCss}\n</head>`);

  h = h.replace('</body>', () => `<script type="application/json" id="grand-shell-breakpoints">${shellBpJson}</script>\n<script id="grand-motion-engine">\n${MOTION}</script>\n</body>`);
  // Enforce strictly 1 <h1> per page (convert secondary responsive variant <h1> to <p role="heading" aria-level="1">)
  let h1Seen = 0;
  h = h.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, (m, attrs, inner) => (++h1Seen === 1 ? m : `<p role="heading" aria-level="1"${attrs}>${inner}</p>`));
  fs.writeFileSync(cfg.out, h);
  const left = [...h.matchAll(/casa ?momo|moritz|graz\b|nexene|sklum/gi)].map(m => m[0]);
  console.log(cfg.out, h.length, 'bytes; leftover:', left.length ? [...new Set(left)].join(',') : 'none', log.length ? '\n  ' + log.join('\n  ') : '');
}

for (const p of JSON.parse(rd('tools/core_pages.json'))) build(p);
