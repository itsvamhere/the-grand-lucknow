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

const HOME = rd('index.html');

function extractBalanced(html, marker, tagName) {
  const start = html.indexOf(marker);
  if (start === -1) return null;
  let depth = 0;
  const re = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('</')) depth--;
    else if (!m[0].endsWith('/>')) depth++;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  return null;
}

function extractHomeCssForBlock(blockHtml) {
  const clsSet = new Set([...blockHtml.matchAll(/\bframer-[A-Za-z0-9_-]+\b/g)].map(m => m[0]));
  const styleMatch = HOME.match(/<style data-framer-css-ssr-minified[^>]*>([\s\S]*?)<\/style>/);
  if (!styleMatch) return '';
  const css = styleMatch[1];
  function filterCss(str) {
    const out = [];
    let i = 0;
    while (i < str.length) {
      while (i < str.length && /\s/.test(str[i])) i++;
      if (i >= str.length) break;
      const brace = str.indexOf('{', i);
      if (brace === -1) break;
      const head = str.slice(i, brace).trim();
      let d = 1, j = brace + 1;
      while (j < str.length && d > 0) {
        if (str[j] === '{') d++;
        else if (str[j] === '}') d--;
        j++;
      }
      const body = str.slice(brace + 1, j - 1);
      if (head.startsWith('@media') || head.startsWith('@supports') || head.startsWith('@layer')) {
        const inner = filterCss(body);
        if (inner) out.push(`${head}{${inner}}`);
      } else if (!head.startsWith('@')) {
        const classes = head.match(/\bframer-[A-Za-z0-9_-]+\b/g) || [];
        if (classes.some(c => clsSet.has(c))) out.push(`${head}{${body}}`);
      }
      i = j;
    }
    return out.join('\n');
  }
  return filterCss(css).replace(/\.framer-zrroz\b/g, '.framer-eIM4l');
}

const GMB_REVIEWS = [
  {
    author: 'Amit Jaiswal',
    avatar: '/images/avatar_1.webp',
    text: '“Our coordinator Abhishek Jaiswal was a true professional throughout our wedding. The spacious ballroom, well-manicured lawns, and attentive management made everything run seamlessly. The best wedding venue in Lucknow.”',
  },
  {
    author: 'Quausain Raza',
    avatar: '/images/avatar_2.webp',
    text: '“Best behaviour by The Grand team and the finest venue on Raebareli Road. We booked for our family function and were amazed by their royal hospitality. The owner and planning team welcomed our guests graciously.”',
  },
  {
    author: 'Aditya & Shweta Srivastava',
    avatar: '/images/avatar_3.webp',
    text: '“We hosted our wedding reception at The Grand Lucknow across the Grassland Gala lawn and banquet. The royal decor, attentive staff, and authentic Awadhi catering left all 800+ guests thoroughly enchanted.”',
  },
  {
    author: 'Dr. Utkarsh Verma',
    avatar: '/images/avatar_4.webp',
    text: '“Hosted our daughter’s destination wedding here. The Royal Legacy banquet hall combined with the open courtyard gave us complete privacy and seamless transitions between the Sangeet and Pheras. Exceptional hospitality.”',
  },
  {
    author: 'Priyanka & Kshitij Mehrotra',
    avatar: '/images/avatar_5.webp',
    text: '“Our 3-day wedding celebration at The Grand was nothing short of magical. From the illuminated open lawns to the luxurious bridal suite, every single detail was executed to perfection. Conveniently situated off Shaheed Path.”',
  },
];

function syncReviewsHtml(revHtml) {
  if (!revHtml) return revHtml;
  const cards = [...revHtml.matchAll(/<div class="framer-[^"]+-container" data-framer-name="Review Card"[^>]*>/g)];
  if (!cards.length) return revHtml;
  let out = '';
  let last = 0;
  cards.forEach((m, i) => {
    const start = m.index;
    const end = i + 1 < cards.length ? cards[i + 1].index : revHtml.length;
    out += revHtml.slice(last, start);
    let card = revHtml.slice(start, end);
    const rev = GMB_REVIEWS[i % GMB_REVIEWS.length];
    card = card.replace(
      /(<div class="framer-kplnyi-container"[^>]*>[\s\S]*?<p[^>]*>)[\s\S]*?(<\/p>)/,
      `$1<span style="display:inline;font-family:inherit;font-size:inherit;line-height:inherit;color:inherit;">${esc(rev.text)}</span>$2`
    );
    card = card.replace(
      /(<div class="framer-p9tssz"[^>]*>[\s\S]*?<p[^>]*>)[\s\S]*?(<\/p>)/,
      `$1${esc(rev.author)}$2`
    );
    card = card.replace(
      /(<div class="framer-15rwswu"[\s\S]*?<img[^>]*src=")[^"]*("[^>]*alt=")[^"]*(")/,
      `$1${rev.avatar}$2${esc(rev.author)}$3`
    );
    out += card;
    last = end;
  });
  return out + revHtml.slice(last);
}

const HOME_REVIEWS = syncReviewsHtml(extractBalanced(HOME, '<div class="framer-c0inle" data-framer-name="Reviews">', 'div'));
const HOME_LOCATIONS = extractBalanced(HOME, '<section class="framer-10bxu26" data-framer-name="Locations" id="locations-1">', 'section');
const HOME_MAP_STYLES = (HOME.match(/<style id="grand-map-styles">[\s\S]*?<\/style>/) || [''])[0];
const HOME_PULSE_STYLES = (HOME.match(/<style id="grand-pulse">[\s\S]*?<\/style>/) || [''])[0];
const HOME_MAPLIBRE_HEAD = `<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css" />\n${HOME_MAP_STYLES}`;
const _mlStart = HOME.indexOf('<script src="https://unpkg.com/maplibre-gl');
const _mlEnd = _mlStart !== -1 ? HOME.indexOf('</script>', HOME.indexOf('initMap()', _mlStart)) + 9 : -1;
const HOME_MAPLIBRE_BODY = (_mlStart !== -1 && _mlEnd > _mlStart) ? HOME.slice(_mlStart, _mlEnd) : '';

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

  let homeSectionCss = '';
  if ((cfg.out === 'venues.html' || cfg.out === 'about.html') && HOME_REVIEWS) {
    const revMarker = src.match(/<div class="framer-[^"]+" data-framer-name="Reviews">/);
    if (revMarker) {
      const oldRev = extractBalanced(src, revMarker[0], 'div');
      if (oldRev) {
        src = src.replace(oldRev, HOME_REVIEWS);
        homeSectionCss += extractHomeCssForBlock(HOME_REVIEWS);
      }
    }
  }
  if (cfg.out === 'venues.html' && HOME_LOCATIONS) {
    const locMarker = src.match(/<section class="framer-[^"]+" data-framer-name="Locations"[^>]*>/);
    if (locMarker) {
      const oldLoc = extractBalanced(src, locMarker[0], 'section');
      if (oldLoc) {
        src = src.replace(oldLoc, HOME_LOCATIONS);
        homeSectionCss += '\n' + extractHomeCssForBlock(HOME_LOCATIONS);
      }
    }
  }

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
      `$1<svg viewBox="0 0 13 12" overflow="visible" id="svg1083848285_386"><path d="M 2.482 12 L 3.562 7.566 L 0 4.584 L 4.66 4.184 L 6.5 0 L 8.34 4.206 L 13 4.584 L 9.437 7.566 L 10.518 12 L 6.5 9.647 Z" fill="#121110"/></svg>`
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

  // Route-specific CSS fixes (ensure Locations & Reviews sections sit on ivory #FFF0CA background, have dark headings, and Footer stays last in mobile flex layouts)
  const extraCss = `<style id="grand-core-route-fixes">
  [data-framer-name="Reviews"],
  [data-framer-name="Locations"],
  #locations, #locations-1 {
    background-color: #FFF0CA !important;
  }
  .framer-10bxu26 {
    display: flex !important;
    flex-flow: column !important;
    align-items: flex-start !important;
    gap: 32px !important;
    width: 100% !important;
    padding: 160px 48px 64px !important;
    box-sizing: border-box !important;
  }
  .framer-10bxu26 .framer-esm2r {
    display: flex !important;
    flex-flow: row !important;
    align-items: flex-end !important;
    justify-content: space-between !important;
    gap: 24px !important;
    width: 100% !important;
  }
  .framer-10bxu26 .framer-1ma6wfx {
    display: flex !important;
    flex-flow: column !important;
    flex: 1 0 0 !important;
    gap: 24px !important;
  }
  .framer-10bxu26 .framer-1esgfsu {
    aspect-ratio: 1 !important;
    height: auto !important;
    flex: 1 0 0 !important;
    width: 1px !important;
    min-height: 500px !important;
    position: relative !important;
  }
  @media (max-width: 809.98px) {
    .framer-10bxu26 { padding: 48px 12px 40px !important; gap: 24px !important; }
    .framer-10bxu26 .framer-esm2r { flex-flow: column !important; align-items: stretch !important; }
    .framer-10bxu26 .framer-1esgfsu { flex: none !important; width: 100% !important; order: 0 !important; min-height: 360px !important; }
  }
  #locations h2, #locations h2 span,
  #locations-1 h2, #locations-1 h2 span,
  [data-framer-name="Locations"] h2, [data-framer-name="Locations"] h2 span,
  [data-framer-name="Reviews"] h2, [data-framer-name="Reviews"] h2 span {
    color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, #121110) !important;
  }
  footer.framer-18na9ah, [data-framer-name="Footer"] {
    order: 99 !important;
  }
  [data-framer-name="Reviews"] div, [data-framer-name="Reviews"] ul, [data-framer-name="Reviews"] section { opacity: 1 !important; }
  [data-framer-name="Reviews"] .framer-rntb33::-webkit-scrollbar,
  [data-framer-name="Reviews"] .framer-srbp5x::-webkit-scrollbar { display: none; }
  .framer-c0inle { padding: 120px 0 !important; gap: 48px !important; overflow: hidden !important; }
  .framer-c0inle .framer-1rijfwf-container { width: 100% !important; height: auto !important; overflow: hidden !important; }
  .framer-c0inle .framer-1rijfwf-container ul { display: flex !important; flex-direction: row !important; gap: 48px !important; width: max-content !important; align-items: center !important; }
  .framer-c0inle .framer-cglexk { display: flex !important; flex-flow: row !important; align-items: flex-start !important; gap: 16px !important; width: max-content !important; }
  .framer-c0inle .framer-ummqnj { display: flex !important; flex-flow: row !important; align-items: center !important; padding: 12px 0 0 !important; }
  .framer-c0inle .framer-1di46j5 { display: flex !important; align-items: center !important; justify-content: center !important; width: 29px !important; height: 29px !important; background-color: rgba(189, 131, 70, 0.1) !important; border-radius: 2px !important; }
  .framer-c0inle .framer-1kifrs3,
  .framer-c0inle .framer-nBufg,
  .framer-c0inle .framer-kplnyi-container,
  .framer-c0inle [data-framer-name="Review Card"] p { height: auto !important; max-height: none !important; overflow: visible !important; line-height: 1.45em !important; }
  .framer-c0inle .framer-srbp5x, .framer-c0inle .framer-rntb33 { width: 100% !important; overflow: hidden !important; scrollbar-width: none !important; }
  .framer-c0inle .framer-srbp5x > ul, .framer-c0inle .framer-rntb33 > ul { display: flex !important; flex-direction: row !important; gap: 12px !important; width: max-content !important; will-change: transform !important; }
  .framer-c0inle .framer-amv6x5-container,
  .framer-c0inle .framer-12ujrw1-container,
  .framer-c0inle .framer-267b4q-container,
  .framer-c0inle .framer-wgrd7x-container,
  .framer-c0inle .framer-18i3o5j-container { width: 532px !important; flex: 0 0 532px !important; }
  @media (max-width: 809.98px) {
    .framer-c0inle { padding: 48px 0 !important; }
    .framer-c0inle .framer-amv6x5-container,
    .framer-c0inle .framer-12ujrw1-container,
    .framer-c0inle .framer-267b4q-container,
    .framer-c0inle .framer-wgrd7x-container,
    .framer-c0inle .framer-18i3o5j-container { width: 300px !important; flex: 0 0 300px !important; }
  }
  .framer-KzfvT .framer-84xumc { display: none !important; }
</style>`;

  const reviewsMarqueeScript = (cfg.out === 'venues.html' || cfg.out === 'about.html') ? `<script id="grand-reviews-marquee">
(function(){
  function runMarquee(ul, speed, gap, pauseOnHover) {
    if (!ul || ul.dataset.marqueeInit === '1') return;
    var orig = Array.from(ul.children);
    if (!orig.length) return;
    ul.dataset.marqueeInit = '1';
    for (var r = 0; r < 3; r++) orig.forEach(function(li) { ul.appendChild(li.cloneNode(true)); });
    var offset = 0, paused = false;
    if (pauseOnHover) {
      ul.addEventListener('mouseenter', function(){ paused = true; });
      ul.addEventListener('mouseleave', function(){ paused = false; });
    }
    function step() {
      if (!paused) {
        offset -= speed;
        var first = ul.firstElementChild;
        var w = first ? (first.getBoundingClientRect().width + gap) : 544;
        if (w > 0 && Math.abs(offset) >= w) {
          offset += w;
          ul.appendChild(first);
        }
        ul.style.transform = 'translateX(' + offset.toFixed(2) + 'px)';
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function init() {
    document.querySelectorAll('.framer-c0inle .framer-1rijfwf-container ul').forEach(function(ul){ runMarquee(ul, 0.75, 48, false); });
    document.querySelectorAll('.framer-c0inle .framer-srbp5x > ul, .framer-c0inle .framer-rntb33 > ul').forEach(function(ul){ runMarquee(ul, 0.55, 12, true); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
</script>` : '';

  // Head meta
  const U = 'https://the-grand-lucknow.vercel.app' + cfg.path;
  const mapHead = cfg.out === 'venues.html' ? `${HOME_MAPLIBRE_HEAD}\n` : `${HOME_MAP_STYLES}\n`;
  const mapBody = cfg.out === 'venues.html' ? `${HOME_MAPLIBRE_BODY}\n` : '';
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${cfg.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${cfg.desc}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${cfg.title}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${cfg.desc}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${U}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${U}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${cfg.title}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${cfg.desc}`)
    .replace('</head>', () => `${homeSectionCss ? `<style id="grand-home-sections-css">${homeSectionCss}</style>\n${mapHead}${HOME_PULSE_STYLES}\n` : ''}${extraCss}\n</head>`);

  h = h.replace('</body>', () => `<script type="application/json" id="grand-shell-breakpoints">${shellBpJson}</script>\n<script id="grand-motion-engine">\n${MOTION}</script>\n${reviewsMarqueeScript}\n${mapBody}</body>`);
  // Enforce strictly 1 <h1> per page (convert secondary responsive variant <h1> to <p role="heading" aria-level="1">)
  let h1Seen = 0;
  h = h.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, (m, attrs, inner) => (++h1Seen === 1 ? m : `<p role="heading" aria-level="1"${attrs}>${inner}</p>`));
  fs.writeFileSync(cfg.out, h);
  const left = [...h.matchAll(/casa ?momo|moritz|graz\b|nexene|sklum/gi)].map(m => m[0]);
  console.log(cfg.out, h.length, 'bytes; leftover:', left.length ? [...new Set(left)].join(',') : 'none', log.length ? '\n  ' + log.join('\n  ') : '');
}

for (const p of JSON.parse(rd('tools/core_pages.json'))) build(p);
