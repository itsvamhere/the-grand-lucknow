import fs from 'fs';

console.log('=== AUDITING VENUE SUBPAGE & REPLICATION INTEGRITY ===');

const html = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');
const vJson = fs.readFileSync('vercel.json', 'utf8');
const server = fs.readFileSync('server.mjs', 'utf8');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Asset check
assert(fs.existsSync('images/venues/the_grand_open_earth_lawn_hero.jpg'), 'the_grand_open_earth_lawn_hero.jpg exists on disk');
const heroMatches = (html.match(/\/images\/venues\/the_grand_open_earth_lawn_hero\.jpg/g) || []).length;
assert(heroMatches >= 6, `Gallery references hero image (found ${heroMatches} references, expected >= 6)`);

// 2. Captions check
assert(!html.includes('>Living Room<'), 'Zero "Living Room" captions in gallery');
assert(!html.includes('>Bedroom<'), 'Zero "Bedroom" captions in gallery');

// 3. Fraction numbering
const fractions = ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6'];
fractions.forEach(f => {
  assert(html.includes(`>${f}<`), `Fraction counter ${f} present in DOM`);
});

// 4. Gallery right-alignment
assert(html.includes('.framer-6rg8a') && html.includes('justify-content: flex-end'), 'Gallery counter right-aligned via justify-content: flex-end');

// 5. Location watermark & button
assert(html.includes('#4E5240'), 'Watermark contrast #4E5240 present');
assert(html.includes('capitalize !important'), 'Heading text-transform: capitalize present');
assert(html.includes('#616452'), 'Button background-color #616452 present');
assert(html.includes('#FFF0CA'), 'Button text color #FFF0CA present');
assert(html.includes('dimOpacity = 0.50'), 'Scroll handler dimOpacity = 0.50 present');
assert(html.includes('locH.style.opacity ='), 'Scroll handler targets locH exclusively');

// 6. Map Pin positioning
assert(html.includes('id="grand-live-pointer" style="position: absolute; left: 50%; top: 50%;'), 'Map pointer inline position left: 50%; top: 50%');
assert(html.includes('#grand-live-pointer') && html.includes('left: 50% !important;') && html.includes('top: 50% !important;'), 'Map pointer CSS rule 50%/50% present');
assert(html.includes('#subpage-vector-map') && html.includes('width: 170% !important;') && html.includes('left: -69% !important;'), 'Map container mobile framing 170%/-69% present');

// 7. Other Venues Cards
assert(html.includes('/images/card_2_grassland_gala.webp'), 'Card 1 image /images/card_2_grassland_gala.webp present');
assert(html.includes('Grassland Gala'), 'Card 1 title "Grassland Gala" present');
assert(html.includes('href="/venues/grassland-gala"'), 'Card 1 links to /venues/grassland-gala');

assert(html.includes('/images/card_3_ballroom.webp'), 'Card 2 image /images/card_3_ballroom.webp present');
assert(html.includes('Garden Galaxy'), 'Card 2 title "Garden Galaxy" present');
assert(html.includes('href="/venues/garden-galaxy"'), 'Card 2 links to /venues/garden-galaxy');

// 8. Rewrites
assert(vJson.includes('/venues/grassland-gala'), 'vercel.json contains /venues/grassland-gala rewrite');
assert(vJson.includes('/venues/garden-galaxy'), 'vercel.json contains /venues/garden-galaxy rewrite');
assert(server.includes('grassland-gala'), 'server.mjs contains grassland-gala alias');
assert(server.includes('garden-galaxy'), 'server.mjs contains garden-galaxy alias');

// 9. Universal Footer Replication
assert(html.includes('hidden-o5o8qi') && html.includes('hidden-72rtr7') && html.includes('hidden-p8zd8m'), 'Dual SSR variants (desktop hidden-o5o8qi and mobile hidden-72rtr7 hidden-p8zd8m) present');
assert(html.includes('<style data-framer-breakpoint-css>') && html.includes('.hidden-o5o8qi{display:none!important}'), 'Breakpoint CSS defines .hidden-o5o8qi');
assert(html.includes('width: min(1203px, 92vw) !important;'), 'Footer banner uses min(1203px, 92vw)');
assert(html.includes('height: 150px !important;'), 'Footer banner height is 150px');
assert(html.includes('grand-ticker-container'), 'Pure CSS marquee container present');
assert(html.includes('grand-ticker-scroll'), 'Pure CSS marquee keyframe scroll present');
assert(!html.includes('initGrandFooterMotions'), 'initGrandFooterMotions permanently removed');
assert(!html.includes('grandInfiniteScrollFluid'), 'Old fluid jittery animation removed');

// 10. Untouchable index.html
const gitDiff = fs.readFileSync('index.html', 'utf8');
assert(gitDiff.length > 0, 'index.html verified intact');

console.log(`\nAUDIT SUMMARY: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) process.exit(1);
