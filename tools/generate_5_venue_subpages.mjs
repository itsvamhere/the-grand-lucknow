import fs from 'fs';
import path from 'path';

// Read master template
let masterHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Ensure Location contrast CSS in masterHtml uses dark olive color
const targetLocCss = `<style id="grand-location-contrast-css">
#bigtext-1 h2 {
  color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
  text-transform: capitalize !important;
  transition: opacity 0.2s ease-out !important;
}
#bigtext-1 h2 span {
  color: var(--token-a0f3f7f0-2bee-4607-a7b2-647fda358cb3, rgb(14, 18, 1)) !important;
  text-transform: capitalize !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] {
  transition: opacity 0.2s ease-out !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2,
#bigtext-1 a.dark-btn {
  background-color: #616452 !important;
  color: #FFF0CA !important;
  border-color: #616452 !important;
}
#bigtext-1 [data-framer-name="Button Wrapper"] a.framer-vO7O2 *,
#bigtext-1 a.dark-btn * {
  color: #FFF0CA !important;
  fill: #FFF0CA !important;
}
</style>`;

masterHtml = masterHtml.replace(/<style id="grand-location-contrast-css">[\s\S]*?<\/style>/, targetLocCss);

const FIVE_VENUES = [
  {
    slug: 'open-earth-lawn',
    alias: 'venue-n1',
    name: 'Open Earth Lawn',
    words: ['Open', 'Earth', 'Lawn'],
    numberTag: 'Venue N°1',
    category: 'Outdoor Lawn',
    sizeNum: '25,000',
    sizeDisplay: '25,000 sq ft',
    capacityNum: '2,500',
    capacityDisplay: '1,000 - 2,500 Guests',
    image: '/images/venues/open_earth_lawn_official.webp',
    metaDesc: 'Open Earth Lawn at The Grand Lucknow – 25,000 sq ft signature two-phase outdoor lawn accommodating up to 2,500 guests in Gomti Nagar, Lucknow.',
    desc: 'Spanning 55,000 square feet of manicured, open-sky lush greens, Open Earth Lawn is the signature outdoor event canvas of The Grand Lucknow. Surrounded by towering royal palm canopies and soft ambient architectural illumination, it offers a grand stage for 1,000 to 2,500 guests with extensive dedicated parking, pristine lawns, and bespoke hospitality orchestrations for majestic weddings and gala celebrations.'
  },
  {
    slug: 'grassland-gala',
    alias: 'venue-n2',
    name: 'Grassland Gala',
    words: ['Grassland', 'Gala'],
    numberTag: 'Venue N°2',
    category: 'Outdoor Lawn',
    sizeNum: '20,000',
    sizeDisplay: '20,000 sq ft',
    capacityNum: '800',
    capacityDisplay: '500 - 800 Guests',
    image: '/images/venues/grassland_gala_official.webp',
    metaDesc: 'Grassland Gala at The Grand Lucknow – 20,000 sq ft spacious celebration lawn accommodating up to 800 guests in Gomti Nagar, Lucknow.',
    desc: 'A spacious lawn area ideal for medium to large weddings and outdoor events. Beautiful landscaping with modern amenities, manicured green lawns, and ambient garden lighting for vibrant cocktail evenings and wedding celebrations.'
  },
  {
    slug: 'garden-galaxy',
    alias: 'venue-n3',
    name: 'Garden Galaxy',
    words: ['Garden', 'Galaxy'],
    numberTag: 'Venue N°3',
    category: 'Outdoor Lawn',
    sizeNum: '15,000',
    sizeDisplay: '15,000 sq ft',
    capacityNum: '300',
    capacityDisplay: '250 - 300 Guests',
    image: '/images/venues/garden_galaxy_official.webp',
    metaDesc: 'Garden Galaxy at The Grand Lucknow – 15,000 sq ft intimate outdoor lawn accommodating up to 300 guests in Gomti Nagar, Lucknow.',
    desc: 'An intimate outdoor lawn space perfect for smaller gatherings, pre-wedding functions, and private celebrations. Garden Galaxy offers lush garden ambiance, private event hospitality, and dedicated event management for unforgettable moments.'
  },
  {
    slug: 'the-grand-courtyard',
    alias: 'the-courtyard',
    alias2: 'venue-n4',
    name: 'The Grand Courtyard',
    words: ['The', 'Grand', 'Courtyard'],
    numberTag: 'Venue N°4',
    category: 'Courtyard / Lawn',
    sizeNum: '15,000',
    sizeDisplay: '15,000 sq ft',
    capacityNum: '250',
    capacityDisplay: '200 - 250 Guests',
    image: '/images/venues/the_grand_courtyard_official.webp',
    metaDesc: 'The Grand Courtyard at The Grand Lucknow – 15,000 sq ft traditional open-sky ceremony space accommodating up to 250 guests in Gomti Nagar, Lucknow.',
    desc: 'A charming courtyard space specially designed for traditional ceremonies like Haldi, Mehndi, and intimate pre-wedding functions. Blending authentic Awadhi architectural charm with serene natural open-air surroundings.'
  },
  {
    slug: 'the-royal-legacy-banquet',
    alias: 'grand-ballroom',
    alias2: 'royal-legacy-banquet',
    alias3: 'venue-n5',
    alias4: 'loft-n1',
    name: 'The Royal Legacy Banquet',
    words: ['The', 'Royal', 'Legacy', 'Banquet'],
    numberTag: 'Loft N°1',
    category: 'Indoor Banquet',
    sizeNum: '10,000',
    sizeDisplay: '10,000 sq ft',
    capacityNum: '600',
    capacityDisplay: '500 - 600 Guests',
    image: '/images/venues/royal_legacy_banquet_official.webp',
    metaDesc: 'The Royal Legacy Banquet at The Grand Lucknow – 10,000 sq ft premium indoor banquet hall accommodating up to 600 guests in Gomti Nagar, Lucknow.',
    desc: 'Our premium indoor banquet hall featuring elegant interiors, crystal chandeliers, and state-of-the-art facilities. Climate controlled and fully serviced, it is the premier indoor sanctuary for weddings and corporate conventions.'
  }
];

function buildSubpage(venueIndex) {
  const v = FIVE_VENUES[venueIndex];
  const next1 = FIVE_VENUES[(venueIndex + 1) % FIVE_VENUES.length];
  const next2 = FIVE_VENUES[(venueIndex + 2) % FIVE_VENUES.length];

  const vListsStart = masterHtml.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
  const vListsEnd = masterHtml.indexOf('<footer class="framer-18na9ah"', vListsStart);

  let before = masterHtml.slice(0, vListsStart);
  let vlist = masterHtml.slice(vListsStart, vListsEnd);
  let after = masterHtml.slice(vListsEnd);

  // --- 1. Process 'before' (Header, Hero, Gallery, Details, Features, Location) ---
  before = before.replace(/<title>.*?<\/title>/i, `<title>${v.name} • The Grand Lucknow</title>`);
  before = before.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${v.name} • The Grand Lucknow"`);
  before = before.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${v.metaDesc}"`);
  before = before.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${v.metaDesc}"`);
  before = before.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="https://the-grand-lucknow.vercel.app/venues/${v.slug}"`);
  before = before.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="https://the-grand-lucknow.vercel.app/venues/${v.slug}"`);

  // H1 Words
  const h1Spans = v.words.map(w => 
    `<span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span class="grand-hero-word" style="display:inline-block;transform-origin:50% 100%;will-change:transform,opacity;">${w}</span></span>`
  ).join(' <!-- --> ');

  before = before.replace(
    /(<div class="framer-13ijl2f-container"[\s\S]*?<div class="ssr-variant hidden-u6hac7"><!--\$--><h1[^>]*>)[\s\S]*?(<span style="position:absolute;width:1px;height:1px;margin:-1px[\s\S]*?<\/h1>)/,
    `$1${h1Spans} $2`
  );

  before = before.replace(
    /(<div class="ssr-variant hidden-1azqig2 hidden-1l94oxb"><!--\$--><h1[^>]*>)[\s\S]*?(<span style="position:absolute;width:1px;height:1px;margin:-1px[\s\S]*?<\/h1>)/,
    `$1${h1Spans} $2`
  );

  before = before.replace(
    /clip-path:inset\(50%\);white-space:nowrap">[^<]*<\/span>/g,
    `clip-path:inset(50%);white-space:nowrap"> – ${v.name} Luxury Event Venue in Lucknow</span>`
  );

  // Gallery: Replace existing gallery images with venue's own official image in all 6 slots
  before = before.replace(
    /\/images\/(?:card_1_open_earth\.webp|venues\/open_earth_lawn_official\.webp)/g,
    v.image
  );
  before = before.replace(
    /alt="Open Earth Lawn • The Grand"/g,
    `alt="${v.name} • The Grand"`
  );

  // Description
  before = before.replace(
    /(<div class="framer-fjrijt" data-framer-name="Description" data-framer-component-type="RichTextContainer" style="transform:none"><p dir="auto" class="framer-text framer-styles-preset-pertie">)[\s\S]*?(<\/p><\/div>)/,
    `$1${v.desc}$2`
  );

  // Feature Specs Table (Size & Capacity) - Replaces 25,000 with v.sizeNum and 2,500 with v.capacityNum in both desktop and mobile variants
  before = before.replace(
    /(rotate\(8deg\)">)(?:25,000|55,000)(<\/span><\/span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY\(100px\) rotate\(8deg\)">Sqft<\/span>)/g,
    `$1${v.sizeNum}$2`
  );

  before = before.replace(
    /(rotate\(8deg\)">)(?:2,500|1,500)(<\/span><\/span> <\/p><\/div>)/g,
    `$1${v.capacityNum}$2`
  );

  // --- 2. Process 'vlist' (Strictly Card 1 and Card 2 in isolated halves) ---
  let [c1Div, c2Div] = vlist.split('<div class="framer-1acjp8y" data-framer-name="Venue List">');

  // Card 1 on c1Div: updates to next1
  c1Div = c1Div.replace(/href="[^"]*venues\/[^"]*"/g, `href="/venues/${next1.slug}"`);
  c1Div = c1Div.replace(/\/images\/[^"]*\.(?:webp|png|jpg|jpeg)/g, next1.image);
  c1Div = c1Div.replace(/alt="[^"]*"/g, `alt="${next1.name}"`);
  c1Div = c1Div.replace(/(rotate\(8deg\)">)[^<]*(<\/span><\/span> <\/h2>)/g, `$1${next1.name}$2`);
  c1Div = c1Div.replace(
    /(<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var\(--extracted-r6o4lv, var\(--variable-reference-SynSWk5OK-T5PVEAy5F\)\)">)[\d,]+(<\/p>)/,
    `$1${next1.sizeNum}$2`
  );
  c1Div = c1Div.replace(
    /(<div class="framer-11kq6w7"[\s\S]*?<p class="framer-text framer-styles-preset-12u2lkp"[^>]*>)[\d,]+(<\/p>)/,
    `$1${next1.capacityNum}$2`
  );

  // Card 2 on c2Div: updates to next2
  c2Div = c2Div.replace(/href="[^"]*venues\/[^"]*"/g, `href="/venues/${next2.slug}"`);
  c2Div = c2Div.replace(/\/images\/[^"]*\.(?:webp|png|jpg|jpeg)/g, next2.image);
  c2Div = c2Div.replace(/alt="[^"]*"/g, `alt="${next2.name}"`);
  c2Div = c2Div.replace(/(rotate\(8deg\)">)[^<]*(<\/span><\/span> <\/h2>)/g, `$1${next2.name}$2`);
  c2Div = c2Div.replace(
    /(<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var\(--extracted-r6o4lv, var\(--variable-reference-SynSWk5OK-T5PVEAy5F\)\)">)[\d,]+(<\/p>)/,
    `$1${next2.sizeNum}$2`
  );
  c2Div = c2Div.replace(
    /(<div class="framer-11kq6w7"[\s\S]*?<p class="framer-text framer-styles-preset-12u2lkp"[^>]*>)[\d,]+(<\/p>)/,
    `$1${next2.capacityNum}$2`
  );

  vlist = c1Div + '<div class="framer-1acjp8y" data-framer-name="Venue List">' + c2Div;

  // --- 3. Process 'after' (Footer, Scripts, Overlap Observer, Booking Modal) ---
  const oldLocRegex = /\/\/ Accurate Casa Momo Location[\s\S]*?onLocScroll\(\);\s*\}/;
  const newLocScript = `// Accurate Casa Momo Location & Open in Maps overlap fade: ONLY dims when sticky navbar logo overlaps it
    var locSec = document.getElementById('bigtext-1');
    var navWrapper = document.querySelector('header[data-framer-name="Navbar Wrapper"], header');
    if (locSec) {
      function onLocScroll() {
        var locH = locSec.querySelector('h2') || locSec;
        var btnWrap = locSec.querySelector('[data-framer-name="Button Wrapper"]');
        var r = locSec.getBoundingClientRect();
        var navHeight = navWrapper ? navWrapper.offsetHeight : 110;
        
        // Physical overlap zone with sticky floating navbar logo
        var isOverlapping = (r.top <= navHeight - 15) && (r.bottom >= 20);
        
        if (isOverlapping) {
          locH.style.opacity = '0.45';
          if (btnWrap) btnWrap.style.opacity = '0.45';
        } else {
          locH.style.opacity = '1';
          if (btnWrap) btnWrap.style.opacity = '1';
        }
      }
      window.addEventListener('scroll', onLocScroll, { passive: true });
      window.addEventListener('resize', onLocScroll, { passive: true });
      onLocScroll();
    }`;
  after = after.replace(oldLocRegex, newLocScript);

  // Booking Modal
  after = after.replace(
    /<h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">[^<]*<\/h3>/g,
    `<h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">${v.name}</h3>`
  );

  after = after.replace(
    /<strong>Venue Scale:<\/strong>.*?Capacity/g,
    `<strong>Venue Scale:</strong> ${v.sizeDisplay} &nbsp;•&nbsp; ${v.capacityDisplay}`
  );

  after = after.replace(
    /Your date lock request for <strong>.*?<\/strong> has been logged\./g,
    `Your date lock request for <strong>${v.name}</strong> has been logged.`
  );

  // Parameterize client-side script wireAll
  after = after.replace(
    /if \(txt\.includes\('sq ft sq ft'\)\)[\s\S]*?if \(txt === '3' \|\| txt === '2' \|\| txt === '4'[^)]*\) el\.innerText = '[^']*';/g,
    `if (txt.includes('sq ft sq ft')) el.innerText = '${v.sizeDisplay}';
        if (txt === '20,000 sq ft' || txt === '45' || txt === '60 sq ft' || txt === '75 sq ft' || txt === '55,000 sq ft') el.innerText = '${v.sizeDisplay}';
        if (txt === '3' || txt === '2' || txt === '4') el.innerText = '${v.capacityNum}';`
  );

  // Protect Recommended Cards from wireAll allNodes
  after = after.replace(
    /if \(el\.closest\('footer'\)\) return;/g,
    `if (el.closest('footer') || el.closest('[data-framer-name="Venue Lists"]')) return;`
  );

  // Replace description in wireAll
  after = after.replace(
    /p\.innerText = "(?:Spanning 55,000|Our most expansive|A spacious lawn|An intimate outdoor|A charming courtyard|Our premium indoor)[^"]*";/g,
    `p.innerText = "${v.desc.replace(/"/g, '\\"')}";`
  );

  // Replace venue chip in wireAll
  after = after.replace(
    /chip\.innerText = "[^"]*";/g,
    `chip.innerText = "${v.name}";`
  );

  return before + vlist + after;
}

// Generate the 5 venue subpages
console.log('Generating the 5 verified venue subpages with verified specs and undimmed location header...');

FIVE_VENUES.forEach((venue, idx) => {
  const content = buildSubpage(idx);
  const mainFile = path.join('venues', `${venue.slug}.html`);
  fs.writeFileSync(mainFile, content, 'utf8');
  console.log(`[${idx + 1}/5] Created ${mainFile} (${content.length} bytes) - Size: ${venue.sizeNum} Sqft, Capacity: ${venue.capacityNum}`);

  const aliases = [venue.alias, venue.alias2, venue.alias3, venue.alias4].filter(Boolean);
  aliases.forEach(alias => {
    const aliasFile = path.join('venues', `${alias}.html`);
    fs.writeFileSync(aliasFile, content, 'utf8');
    console.log(`       -> Linked alias ${aliasFile}`);
  });
});

console.log('\nAll 5 verified subpages generated successfully!');
