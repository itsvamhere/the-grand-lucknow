// Clean up remaining Casa Momo strings/assets, 44px gallery radius morph, fake modal, and rebuild book/venue.html inside canonical shell.
import fs from 'node:fs';
import path from 'node:path';

const rd = f => fs.readFileSync(f, 'utf8');
const wr = (f, s) => fs.writeFileSync(f, s, 'utf8');

// 1. Clean up canonical venue subpages (open-earth-lawn, grassland-gala, garden-galaxy, the-grand-courtyard, the-royal-legacy-banquet)
const CANONICAL_VENUES = [
  { file: 'venues/open-earth-lawn.html', aliases: ['venues/venue-n1.html', 'venues/boutique-n1.html', 'apartments/boutique-n1.html'] },
  { file: 'venues/grassland-gala.html', aliases: ['venues/venue-n2.html', 'venues/boutique-n2.html', 'apartments/boutique-n2.html'] },
  { file: 'venues/garden-galaxy.html', aliases: ['venues/venue-n3.html', 'venues/boutique-n3.html', 'apartments/boutique-n3.html'] },
  { file: 'venues/the-grand-courtyard.html', aliases: ['venues/venue-n4.html', 'venues/the-courtyard.html', 'venues/boutique-n4.html', 'apartments/boutique-n4.html'] },
  { file: 'venues/the-royal-legacy-banquet.html', aliases: ['venues/venue-n5.html', 'venues/grand-ballroom.html', 'venues/royal-legacy-banquet.html', 'venues/boutique-n5.html', 'venues/loft-n1.html', 'apartments/boutique-n5.html', 'apartments/loft-n1.html'] },
];

const STRUCTURED_DATA = `<script type="application/ld+json" id="grand-structured-data">{"@context":"https://schema.org","@graph":[{"@type":"EventVenue","@id":"https://www.thegrandlucknow.in/#thegrandlucknow","name":"The Grand","description":"Premier luxury wedding, banquet, and celebration estate in Lucknow.","url":"https://www.thegrandlucknow.in/","telephone":"+91 91291 27091","email":"Thegrandbanquet07@gmail.com","address":{"@type":"PostalAddress","streetAddress":"22, Raibareli Rd, Bindaua","addressLocality":"Lucknow","addressRegion":"Uttar Pradesh","postalCode":"226301","addressCountry":"IN"},"sameAs":["https://www.instagram.com/thegrand.lucknow/","https://www.facebook.com/thegrandlucknow/"]}]}</script>`;

const CANONICAL_SHELL = rd('venues/open-earth-lawn.html');
const contrastScriptMatch = CANONICAL_SHELL.match(/<script id="grand-contrast-switcher-script">[\s\S]*?<\/script>/);
const lockedCssMatch = CANONICAL_SHELL.match(/<style id="grand-locked-header-and-gallery-css">[\s\S]*?<\/style>/);
const universalFooterMatch = CANONICAL_SHELL.match(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/);
const mapCursorCssMatch = CANONICAL_SHELL.match(/<style id="grand-map-cursor-style">[\s\S]*?<\/style>/);
const navControllerMatch = CANONICAL_SHELL.match(/<script id="grand-nav-and-gallery-controller">[\s\S]*?<\/script>/);

for (const v of CANONICAL_VENUES) {
  let h = rd(v.file);
  if (contrastScriptMatch) {
    h = h.replace(/<script id="grand-contrast-switcher-script">[\s\S]*?<\/script>/, () => contrastScriptMatch[0]);
  }
  if (lockedCssMatch) {
    h = h.replace(/<style id="grand-locked-header-and-gallery-css">[\s\S]*?<\/style>/, () => lockedCssMatch[0]);
  }
  if (universalFooterMatch) {
    h = h.replace(/<style id="universal-grand-footer-styles">[\s\S]*?<\/style>/, () => universalFooterMatch[0]);
  }
  if (mapCursorCssMatch) {
    h = h.replace(/<style id="grand-map-cursor-style">[\s\S]*?<\/style>/, () => mapCursorCssMatch[0]);
  }
  if (navControllerMatch) {
    h = h.replace(/<script id="grand-nav-and-gallery-controller">[\s\S]*?<\/script>/, () => navControllerMatch[0]);
  }
  // Remove fake booking modal script (grand-injected-script) so Book Now / Check Availability links navigate to /book/venue
  h = h.replace(/<!-- Interactive Booking Modal & Client Injection Script -->\s*<script id="grand-injected-script">[\s\S]*?<\/script>/g, '');
  h = h.replace(/<script id="grand-injected-script">[\s\S]*?<\/script>/g, '');
  // Replace structured data
  h = h.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, STRUCTURED_DATA);
  // Ensure desktop and mobile "Book Now" links point to /book/venue and footer legal links use root-relative paths
  h = h.replace(/(class="framer-WPG77 framer-B9619 framer-tv448v framer-v-tv448v framer-13c2ecc"[^>]*href=")\/contact(")/g, '$1/book/venue$2')
       .replace(/(class="framer-1fslfdg framer-fx9txd" data-framer-name="Nav Link" href=")\/contact(")/g, '$1/book/venue$2')
       .replace(/(class="framer-vO7O2[^"]*"[^>]*data-framer-name="White"[^>]*href=")\/contact(")/g, '$1/book/venue$2')
       .replace(/href="\.\/imprint"/g, 'href="/imprint"')
       .replace(/href="\.\/terms"/g, 'href="/terms"')
       .replace(/href="\.\/privacy"/g, 'href="/privacy"');
  // Clean up any Casa Momo strings in comments/IDs and 'Other Places to Stay' / 'All Apartments'
  const makeRollingText = (str) => {
    const letters = [...str].map(ch =>
      `<span aria-hidden="true" style="display:inline-block;position:relative;white-space:pre"><span style="visibility:hidden">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:none">${ch}</span><span style="position:absolute;left:0;top:0;white-space:pre;transform:translateY(100%)">${ch}</span></span>`
    ).join('');
    return `<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0">${str}</span>${letters}`;
  };
  h = h.replace(/casamomo-menu-button-fix/gi, 'grand-menu-button-fix')
       .replace(/Casa\s*Momo/gi, 'The Grand')
       .replace(/Styria/gi, 'Uttar Pradesh')
       .replaceAll('in Gomti Nagar, Lucknow', 'on Raibareli Road, Lucknow')
       .replaceAll('Gomti Nagar', 'Raibareli Rd')
       .replaceAll('Spanning 55,000 square feet', 'Spanning 25,000 square feet')
       .replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com')
       .replace(/href="\.\.\/apartments"/g, 'href="/venues"')
       .replace(/>Places<\/span><\/span>(\s*<!-- -->\s*<span[^>]*><span[^>]*>)to(<\/span><\/span>\s*<!-- -->\s*<span[^>]*><span[^>]*>)Stay<\/span><\/span>/g, '>Grand</span></span>$1Event$2Venues</span></span>')
       .replace(/<span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect\(0 0 0 0\);white-space:nowrap;border:0">All Apartments<\/span>(?:<span aria-hidden="true"[\s\S]*?<\/span><\/span>){14}/g, () => makeRollingText('All Venues'));

  let h1Count = 0;
  h = h.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, (m, attrs, inner) => (++h1Count === 1 ? m : `<p role="heading" aria-level="1"${attrs}>${inner}</p>`));

  wr(v.file, h);
  for (const alias of v.aliases) {
    wr(alias, h);
  }
  console.log('cleaned venue & aliases:', v.file);
}

// 2. Clean up imprint.html, privacy.html, terms.html
{
  const idxHtml = rd('index.html');
  const homeMenuFixMatch = idxHtml.match(/<style id="grand-home-menu-fix">[\s\S]*?<\/style>/);
  const homeSyncMatch = idxHtml.match(/<script id="grand-venue-names-sync">[\s\S]*?<\/script>/);
  for (const f of ['imprint.html', 'privacy.html', 'terms.html']) {
    if (!fs.existsSync(f)) continue;
    let h = rd(f);
    h = h.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, STRUCTURED_DATA)
         .replace(/<style id="grand-home-menu-fix">[\s\S]*?<\/style>/g, '')
         .replace(/<script id="grand-venue-names-sync">[\s\S]*?<\/script>/g, '')
         .replace(/casamomo-menu-button-fix/gi, 'grand-menu-button-fix')
         .replace(/Casa\s*Momo/gi, 'The Grand')
         .replace(/Styria/gi, 'Uttar Pradesh')
         .replaceAll('aria-label="Feel at Home. Beautifully."', 'aria-label="Celebrate Life. Royally."')
         .replace(
           /(>Feel<\/span><\/span><span[^>]*><span[^>]*>)at(<\/span><\/span><span[^>]*><span[^>]*>)Home\.(<\/span><\/span><span[^>]*><span[^>]*>)Beautifully\.(<\/span><\/span>)/g,
           (_, a, b, c, d) => `>Celebrate</span></span><span aria-hidden="true" style="display:inline-flex;overflow:hidden;padding-bottom:0.12em;margin-bottom:-0.12em"><span style="display:inline-block;white-space:pre;transform-origin:0% 100%;will-change:transform;transform:translateY(115%) rotate(8deg)">Life.${b}Royally.${d}`
         )
         .replace(/href="\.\/venues"/g, 'href="/venues"')
         .replace(/href="\.\/about"/g, 'href="/about"')
         .replace(/href="\.\/contact"/g, 'href="/contact"')
         .replace(/href="\.\/book"/g, 'href="/book/venue"')
         .replace(/href="\.\/imprint"/g, 'href="/imprint"')
         .replace(/href="\.\/terms"/g, 'href="/terms"')
         .replace(/href="\.\/privacy"/g, 'href="/privacy"')
         .replace(/href="\.\/"/g, 'href="/"')
         .replace(/(class="framer-vO7O2[^"]*"[^>]*data-framer-name="White"[^>]*href=")\/contact(")/g, '$1/book/venue$2');
    if (homeMenuFixMatch && homeSyncMatch) {
      h = h.replace('</body>', () => `${homeMenuFixMatch[0]}\n${homeSyncMatch[0]}\n</body>`);
    }
    wr(f, h);
    console.log('cleaned legal page:', f);
  }
}

// 3. Clean up index.html
{
  let idx = rd('index.html');
  idx = idx.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, STRUCTURED_DATA)
           .replace(/casamomo-menu-button-fix/gi, 'grand-menu-button-fix')
           .replace(/Casa\s*Momo/gi, 'The Grand')
           .replaceAll('N°01 • bed with a navy headboard, tufted cushions and a green table lamp in front of a weathered wall', 'Open Earth Lawn • Grand outdoor celebration lawn at The Grand Lucknow')
           .replaceAll('N°02 • living room with a rust-orange velvet sofa, a green lounge chair and a sailing ship painting', 'Grassland Gala • Illuminated outdoor wedding lawn at The Grand Lucknow')
           .replaceAll('N°03 • dining table with wooden chairs and a mountain painting, seen through a doorway', 'Garden Galaxy • Lush outdoor reception lawn at The Grand Lucknow')
           .replaceAll('N°04 • living room with a grey sofa, round side tables, a yellow rug and a large plant', 'The Grand Courtyard • Architectural outdoor courtyard at The Grand Lucknow')
           .replaceAll('N°05 • bed with linen and green velvet cushions under a skylight and an olive-green wall', 'The Royal Legacy Banquet • Pillarless luxury banquet hall at The Grand Lucknow')
           .replaceAll('N°06 • attic dining corner with a blue table, wire chairs and dried eucalyptus', 'The Grand Lucknow • Royal Awadhi dining and catering setup')
           .replaceAll('N°07 • wooden bed with an olive-green throw, a mushroom lamp and an old timber beam', 'The Grand Lucknow • Luxury bridal suite and hospitality lounge')
           .replaceAll('N°08 • round wooden dining table with woven chairs, a flower bouquet and a sofa', 'The Grand Lucknow • Intimate mandap and floral stage decor')
           .replaceAll('N°09 • living area with a brown sofa, a white arc lamp and a small dining table', 'The Grand Lucknow • Grand arrival portico and valet court')
           .replace(/href="\.\/venues"/g, 'href="/venues"')
           .replace(/href="\.\/about"/g, 'href="/about"')
           .replace(/href="\.\/contact"/g, 'href="/contact"')
           .replace(/href="\.\/book"/g, 'href="/book/venue"')
           .replace(/href="\.\/imprint"/g, 'href="/imprint"')
           .replace(/href="\.\/terms"/g, 'href="/terms"')
           .replace(/href="\.\/privacy"/g, 'href="/privacy"')
           .replace(/href="\.\/"/g, 'href="/"')
           .replace(/(class="framer-vO7O2[^"]*"[^>]*data-framer-name="White"[^>]*href=")\/contact(")/g, '$1/book/venue$2');

  // Replace "Feel at Home. Beautifully." -> "Celebrate Life. Royally." in TunnelText SSR markup
  idx = idx.replaceAll('aria-label="Feel at Home. Beautifully."', 'aria-label="Celebrate Life. Royally."');
  idx = idx.replace(
    /(>Feel<\/span><\/span><span[^>]*><span[^>]*>)at(<\/span><\/span><span[^>]*><span[^>]*>)Home\.(<\/span><\/span><span[^>]*><span[^>]*>)Beautifully\.(<\/span><\/span>)/g,
    (_, a, b, c, d) => `>Celebrate</span></span><span aria-hidden="true" style="display:inline-flex;overflow:hidden;padding-bottom:0.12em;margin-bottom:-0.12em"><span style="display:inline-block;white-space:pre;transform-origin:0% 100%;will-change:transform;transform:translateY(115%) rotate(8deg)">Life.${b}Royally.${d}`
  );

  // Replace "quiet minimalism and warm coziness a space emerges where you can arrive, breathe and let go."
  // -> "timeless elegance and the serenity of nature a space emerges where you can gather, celebrate and let go."
  const oldWords = ['quiet', 'minimalism', 'and', 'warm', 'coziness', 'a', 'space', 'emerges', 'where', 'you', 'can', 'arrive,', 'breathe', 'and', 'let', 'go.'];
  const newWords = ['timeless', 'elegance', 'and', 'natural', 'serenity', 'a', 'space', 'emerges', 'where', 'you', 'can', 'gather,', 'celebrate', 'and', 'let', 'go.'];
  const quietRe = new RegExp(oldWords.map(w => `(<span[^>]*>)${w.replace('.', '\\.')}(<\\/span>)`).join('(<span style="font-size:0"> <\\/span>)'), 'g');
  idx = idx.replace(quietRe, (...args) => {
    let out = '';
    for (let i = 0; i < newWords.length; i++) {
      const open = args[1 + i * 3];
      const close = args[2 + i * 3];
      const sep = i < newWords.length - 1 ? args[3 + i * 3] : '';
      out += open + newWords[i] + close + sep;
    }
    return out;
  });

  // Update SSR Venue Item cards in index.html (#mefgjz) so pre-hydration specs match 100%
  const homeSpecs = [
    { href: '/venues/open-earth-lawn', area: '25,000', cap: '2,500' },
    { href: '/venues/grassland-gala', area: '20,000', cap: '800' },
    { href: '/venues/garden-galaxy', area: '15,000', cap: '300' },
    { href: '/venues/the-grand-courtyard', area: '15,000', cap: '250' },
    { href: '/venues/the-royal-legacy-banquet', area: '10,000', cap: '600' },
  ];
  const mS = idx.indexOf('id="mefgjz"');
  if (mS !== -1) {
    const mE = idx.indexOf('</section>', mS);
    let sec = idx.slice(mS, mE);
    const items = [...sec.matchAll(/<div class="framer-fdgjuz" data-framer-name="Venue Item">/g)];
    if (items.length === 5) {
      const chunks = items.map((m, i) => sec.slice(m.index, items[i + 1] ? items[i + 1].index : sec.length));
      const updated = chunks.map((c, i) => {
        const s = homeSpecs[i];
        return c
          .replace(/href="\.?\/venues\/[^"]+"/g, `href="${s.href}"`)
          .replace(/(data-framer-name="Size"[\s\S]*?<p[^>]*>)[\d,]+(<\/p>)/g, `$1${s.area}$2`)
          .replace(/(data-framer-name="Squaremeter"[\s\S]*?<p[^>]*>)m(<\/p>)/g, '$1sq ft$2')
          .replace(/(<div class="framer-84xumc"[\s\S]*?<p[^>]*>)2(<\/p>)/g, '$1$2')
          .replace(/(data-framer-name="People"[\s\S]*?<p[^>]*>)[\d,]+(<\/p>)/g, `$1${s.cap}$2`);
      }).join('');
      sec = sec.slice(0, items[0].index) + updated;
      idx = idx.slice(0, mS) + sec + idx.slice(mE);
    }
  }

  wr('index.html', idx);
  console.log('cleaned index.html');
}

// 4. Clean up scripts/*.mjs
{
  let dex = rd('scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs');
  dex = dex
    .replaceAll('Feel at Home. Beautifully.', 'Celebrate Life. Royally.')
    .replaceAll('quiet minimalism and warm coziness a space emerges where you can arrive, breathe and let go.', 'timeless elegance and natural serenity a space emerges where you can gather, celebrate and let go.')
    .replaceAll("links:[{href:`/contact`,openInNewTab:!1},{href:`/contact`,openInNewTab:!1},{href:`/contact`,openInNewTab:!1}]", "links:[{href:`/book/venue`,openInNewTab:!1},{href:`/book/venue`,openInNewTab:!1},{href:`/book/venue`,openInNewTab:!1}]")
    .replaceAll("area: '55,000', cap: '1,500', slug: 'venue-n1'", "area: '25,000', cap: '2,500', slug: 'open-earth-lawn'")
    .replaceAll("area: '20,000', cap: '800', slug: 'venue-n2'", "area: '20,000', cap: '800', slug: 'grassland-gala'")
    .replaceAll(
      "{ num: 'N°03', name: 'The Royal Legacy Banquet', area: '10,000', cap: '600', slug: 'venue-n3', img: '/images/card_3_ballroom.webp' },\n    { num: 'N°04', name: 'Garden Galaxy', area: '15,000', cap: '300', slug: 'venue-n4', img: '/images/card_4_courtyard.webp' },\n    { num: 'N°05', name: 'The Grand Courtyard', area: '15,000', cap: '250', slug: 'venue-n5', img: '/images/card_5_garden_pavilion.webp' }",
      "{ num: 'N°03', name: 'Garden Galaxy', area: '15,000', cap: '300', slug: 'garden-galaxy', img: '/images/card_4_courtyard.webp' },\n    { num: 'N°04', name: 'The Grand Courtyard', area: '15,000', cap: '250', slug: 'the-grand-courtyard', img: '/images/card_5_garden_pavilion.webp' },\n    { num: 'N°05', name: 'The Royal Legacy Banquet', area: '10,000', cap: '600', slug: 'the-royal-legacy-banquet', img: '/images/card_3_ballroom.webp' }"
    )
    .replaceAll("children:`Venue N°3`", "children:`The Royal Legacy Banquet`")
    .replaceAll("children:`Venue N°1`", "children:`Open Earth Lawn`")
    .replaceAll("alt:'Venue N°1 Grand Lawn'", "alt:'Open Earth Lawn'")
    .replaceAll("alt:'Venue N°2 Celebration Estate'", "alt:'Grassland Gala'")
    .replaceAll("alt:'Pillarless Venue N°3'", "alt:'The Royal Legacy Banquet'")
    .replaceAll("alt:'Venue N°4 Reception Space'", "alt:'Garden Galaxy'")
    .replaceAll("alt:'Venue N°5 Banquet'", "alt:'The Grand Courtyard'")
    .replaceAll('Sunlit Venue N°3 with crystal chandeliers, polished floor and regal stage wooden desk with a white lamp', 'The Grand Lucknow architectural celebration space');
  wr('scripts/IStDm3kWiTr97ARD2k-bDleoefESp2BUmwxtQk7abRM.DexdObe2.mjs', dex);

  for (const f of ['scripts/T5PVEAy5F.D5-RUb5a.mjs', 'scripts/T5PVEAy5F.DMrM974L.mjs']) {
    if (!fs.existsSync(f)) continue;
    let s = rd(f);
    s = s.replace(/("data-framer-name":`Squaremeter`[\s\S]{0,400}?children:)`m`/g, '$1`sq ft`')
         .replace(/(className:`framer-84xumc`[\s\S]{0,400}?children:)`2`/g, '$1``')
         .replace(/children:`2`(\}\)\}\),className:`framer-84xumc`)/g, 'children:``$1');
    wr(f, s);
  }

  for (const f of fs.readdirSync('scripts')) {
    if (!f.endsWith('.mjs')) continue;
    const p = path.join('scripts', f);
    let s = rd(p);
    const orig = s;
    s = s.replaceAll('https://casa-momo-booking.casamomo.workers.dev', '/api/booking')
         .replaceAll('office@casamomo.at', 'Thegrandbanquet07@gmail.com')
         .replaceAll('office@thegrandlucknow.in', 'Thegrandbanquet07@gmail.com')
         .replaceAll('Casa Momo', 'The Grand')
         .replaceAll('casamomo.at', 'thegrandlucknow.in')
         .replaceAll('#casamomo', '#thegrandlucknow')
         .replaceAll('Moritz Steinlechner', 'The Grand')
         .replaceAll('Moritz', 'The Grand')
         .replaceAll('Styria', 'Uttar Pradesh')
         .replaceAll('addressCountry:`AT`', 'addressCountry:`IN`')
         .replaceAll('in Graz', 'in Lucknow')
         .replaceAll('Graz', 'Lucknow')
         .replaceAll('quiet minimalism and warm coziness', 'timeless elegance and natural serenity');
    if (s !== orig) wr(p, s);
  }
  console.log('cleaned scripts/*.mjs');
}

// 5. Rebuild book/venue.html (and book/apartment.html) inside our canonical SHELL (venues/open-earth-lawn.html)
{
  const SHELL = rd('venues/open-earth-lawn.html');
  const MOTION = rd('tools/motion_engine.js');
  const rawBook = rd('book/venue.html');

  const routeCss = (rawBook.match(/<style data-framer-[^>]*>[\s\S]*?<\/style>/g) || []).join('\n');
  const calStyleMatch = rawBook.match(/<style id="grand-calendar-stacking-fix">[\s\S]*?<\/style>/);
  const calStyle = calStyleMatch ? calStyleMatch[0] : '';
  const mS = rawBook.indexOf('<main');
  const fS = rawBook.indexOf('<footer', mS);
  let bookMain = rawBook.slice(mS, fS)
    .replace('Spanning 55,000 square feet', 'Spanning 25,000 square feet')
    .replace('id="grand-calendar-popup" style="display: block;', 'id="grand-calendar-popup" style="display: none;');

  const ctrlS = rawBook.indexOf('<script id="grand-booking-controller">');
  const ctrlE = rawBook.indexOf('</script>', ctrlS) + 9;
  let bookCtrl = rawBook.slice(ctrlS, ctrlE)
    .replace('Spanning 55,000 square feet', 'Spanning 25,000 square feet')
    .replace('style="display:flex; flex-flow:row; gap:48px; width:100%; align-items:flex-start;"', '')
    .replace('style="flex:1 0 0; width:1px; position:relative;"', 'style="position:relative;"')
    .replace('style="flex:1 0 0; width:1px; display:flex; flex-direction:column; gap:16px;"', 'style="display:flex; flex-direction:column; gap:16px;"')
    .replace('style="flex:1 0 0; width:1px; display:flex; flex-direction:column; gap:16px; align-items:flex-start;"', 'style="display:flex; flex-direction:column; gap:16px; align-items:flex-start;"');

  const bpsMatch = rawBook.match(/<script type="framer\/appear" id="__framer__breakpoints">[\s\S]*?<\/script>/);
  const bps = bpsMatch ? bpsMatch[0] : '';
  const shellBpJson = SHELL.match(/<script type="framer\/appear" id="__framer__breakpoints">([\s\S]*?)<\/script>/)[1];

  let h = SHELL;
  const sS = h.indexOf('<main');
  const uFooterIdx = h.indexOf('<style id="universal-grand-footer-styles">');
  h = h.slice(0, sS) + bookMain + '\n' + h.slice(uFooterIdx);

  h = h.replace(/<head>/, () => '<head>\n' + routeCss + '\n' + calStyle + '\n');
  h = h.replace(/(<div data-framer-root class=")([^"]*)(")/, (m, a, cls, z) => {
    const merged = [...new Set([...cls.replace(/ framer-1azqig2/, '').split(/\s+/), 'framer-AQMHC', 'framer-CiqrO', 'framer-0AepD', 'framer-d06mwj'])].join(' ');
    return `${a}${merged}${z}`;
  });
  if (bps) {
    h = h.replace(/<script type="framer\/appear" id="__framer__breakpoints">[\s\S]*?<\/script>/, () => bps);
  }
  h = h.replace(/<script id="(?:casa-details-reveal-engine-js|grand-subpage-engine-js|grand-injected-script|grand-motion-engine|grand-booking-controller|grand-shell-breakpoints)"[\s\S]*?<\/script>/g, '')
       .replace(/<style id="(?:grand-location-contrast-css|grand-book-responsive-fix)">[\s\S]*?<\/style>/g, '');

  const bookExtraCss = `<style id="grand-book-responsive-fix">
  .framer-AQMHC .framer-gsn7ju { display: flex; flex-flow: row; gap: 48px; width: 100%; align-items: flex-start; }
  .framer-AQMHC .framer-1snxl4n-container, .framer-AQMHC .framer-7g9wgs, .framer-AQMHC .framer-19x7sgr-container { flex: 1 0 0; width: 1px; }
  footer.framer-18na9ah, [data-framer-name="Footer"] { order: 99 !important; }
  @media (max-width: 809.98px) {
    .framer-AQMHC .framer-gsn7ju { flex-direction: column !important; gap: 24px !important; }
    .framer-AQMHC .framer-1snxl4n-container, .framer-AQMHC .framer-7g9wgs, .framer-AQMHC .framer-19x7sgr-container { flex: none !important; width: 100% !important; }
    .casa-bk-grid { grid-template-columns: 1fr 1fr !important; }
    #grand-btn-guests, #grand-btn-search { grid-column: 1 / -1 !important; }
    #grand-calendar-popup, #casa-bk-Rdkpilp-dates { width: calc(100vw - 24px) !important; max-width: calc(100vw - 24px) !important; }
    #casa-bk-Rdkpilp-dates > div > div:last-child { flex-direction: column !important; gap: 1.5em !important; }
  }
</style>`;

  const title = 'Check Availability & Inquire • The Grand Lucknow';
  const desc = 'Choose your event dates, view venue capacities across our 5 celebration spaces, and inquire directly with The Grand Lucknow.';
  const url = 'https://the-grand-lucknow.vercel.app/book/venue';
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
       .replace(/(<meta name="description" content=")[^"]*/, `$1${desc}`)
       .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
       .replace(/(<meta property="og:description" content=")[^"]*/, `$1${desc}`)
       .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
       .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
       .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${title}`)
       .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${desc}`)
       .replace('</head>', () => `${bookExtraCss}\n</head>`)
       .replace('</body>', () => `<script type="application/json" id="grand-shell-breakpoints">${shellBpJson}</script>\n<script id="grand-motion-engine">\n${MOTION}</script>\n${bookCtrl}\n</body>`);

  let bookH1Count = 0;
  h = h.replace(/<h1(\b[^>]*)>([\s\S]*?)<\/h1>/gi, (m, attrs, inner) => (++bookH1Count === 1 ? m : `<p role="heading" aria-level="1"${attrs}>${inner}</p>`));
  wr('book/venue.html', h);
  wr('book/apartment.html', h);
  console.log('rebuilt book/venue.html & book/apartment.html:', h.length, 'bytes');
}
