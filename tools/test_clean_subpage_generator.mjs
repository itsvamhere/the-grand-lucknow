import fs from 'fs';

const masterHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

const VENUES = [
  {
    slug: 'open-earth-lawn',
    alias: 'venue-n1',
    name: 'Open Earth Lawn',
    words: ['Open', 'Earth', 'Lawn'],
    numberTag: 'Venue N°1',
    category: 'Outdoor Lawn',
    sizeNum: '25,000',
    sizeDisplay: '55,000 sq ft',
    capacityNum: '2,500',
    capacityDisplay: '2,500 guests',
    image: '/images/card_1_open_earth.webp',
    metaDesc: 'Open Earth Lawn at The Grand Lucknow – 55,000 sq ft signature open-air event lawn accommodating up to 2,500 guests in Gomti Nagar, Lucknow.',
    desc: 'Spanning 55,000 square feet of manicured, open-sky lush greens, Open Earth Lawn is the signature outdoor event canvas of The Grand Lucknow. Surrounded by towering royal palm canopies and soft ambient architectural illumination, it offers a grand stage for up to 2,500 guests with extensive dedicated parking, pristine lawns, and bespoke hospitality orchestrations for majestic weddings and gala celebrations.'
  },
  {
    slug: 'grassland-gala',
    alias: 'venue-n2',
    name: 'Grassland Gala',
    words: ['Grassland', 'Gala'],
    numberTag: 'Venue N°2',
    category: 'Celebration Lawn',
    sizeNum: '14,000',
    sizeDisplay: '14,000 sq ft',
    capacityNum: '900',
    capacityDisplay: '900 guests',
    image: '/images/card_2_grassland_gala.webp',
    metaDesc: 'Grassland Gala at The Grand Lucknow – 14,000 sq ft luxury open-air celebration lawn accommodating up to 900 guests in Gomti Nagar, Lucknow.',
    desc: 'Spanning 14,000 square feet of impeccably manicured verdant grounds, Grassland Gala provides an exquisite open-air setting for elegant receptions, vibrant sangeets, and cocktail celebrations at The Grand Lucknow. Framed by palm-lined pathways and soft architectural lighting, it accommodates up to 900 guests with dedicated hospitality and seamless event orchestrations.'
  },
  {
    slug: 'grand-ballroom',
    alias: 'venue-n3',
    name: 'Grand Ballroom',
    words: ['Grand', 'Ballroom'],
    numberTag: 'Venue N°3',
    category: 'Indoor Luxury Banquet',
    sizeNum: '9,500',
    sizeDisplay: '9,500 sq ft',
    capacityNum: '600',
    capacityDisplay: '600 guests',
    image: '/images/card_3_ballroom.webp',
    metaDesc: 'Grand Ballroom at The Grand Lucknow – 9,500 sq ft opulent banquet hall accommodating up to 600 guests in Gomti Nagar, Lucknow.',
    desc: 'Encompassing 9,500 square feet of refined indoor architectural luxury, Grand Ballroom showcases soaring high ceilings, bespoke crystal chandeliers, and acoustic elegance. Tailored for up to 600 guests, it provides an air-conditioned sanctuary for grand wedding ceremonies, formal banquets, and prestigious corporate conventions.'
  },
  {
    slug: 'the-courtyard',
    alias: 'venue-n4',
    name: 'The Courtyard',
    words: ['The', 'Courtyard'],
    numberTag: 'Venue N°4',
    category: 'Open-Sky Courtyard',
    sizeNum: '6,000',
    sizeDisplay: '6,000 sq ft',
    capacityNum: '350',
    capacityDisplay: '350 guests',
    image: '/images/card_4_courtyard.webp',
    metaDesc: 'The Courtyard at The Grand Lucknow – 6,000 sq ft open-sky heritage courtyard accommodating up to 350 guests in Gomti Nagar, Lucknow.',
    desc: 'Spanning 6,000 square feet of open-sky stone architecture, The Courtyard captures authentic Awadhi heritage blended with modern elegance. Accommodating up to 350 guests, it is the quintessential setting for intimate mehendi gatherings, twilight dinners, and traditional wedding rituals.'
  },
  {
    slug: 'garden-pavilion',
    alias: 'venue-n5',
    name: 'Garden Pavilion',
    words: ['Garden', 'Pavilion'],
    numberTag: 'Loft N°1',
    category: 'Garden Breezeway',
    sizeNum: '4,500',
    sizeDisplay: '4,500 sq ft',
    capacityNum: '200',
    capacityDisplay: '200 guests',
    image: '/images/card_5_garden_pavilion.webp',
    metaDesc: 'Garden Pavilion at The Grand Lucknow – 4,500 sq ft tranquil garden pavilion accommodating up to 200 guests in Gomti Nagar, Lucknow.',
    desc: 'Offering 4,500 square feet of serene, landscaped privacy, Garden Pavilion combines covered open-sided architectural breezeways with lush garden vistas. Designed for up to 200 guests, it provides an intimate sanctuary for high-tea engagements, haldi ceremonies, and private family dinners.'
  },
  {
    slug: 'north-mandap',
    alias: null,
    name: 'North Mandap',
    words: ['North', 'Mandap'],
    numberTag: 'Loft N°2',
    category: 'Ceremonial Mandap',
    sizeNum: '3,500',
    sizeDisplay: '3,500 sq ft',
    capacityNum: '250',
    capacityDisplay: '250 guests',
    image: '/images/card_6_mandap_lawn.webp',
    metaDesc: 'North Mandap at The Grand Lucknow – 3,500 sq ft dedicated sacred ceremonial pavilion accommodating up to 250 guests in Gomti Nagar, Lucknow.',
    desc: 'Covering 3,500 square feet of purpose-designed ceremonial grounds, North Mandap provides a sacred and picturesque backdrop for authentic Indian wedding rites. Accommodating up to 250 guests with unobstructed sightlines and dedicated staging, it elevates traditional wedding vows into an unforgettable experience.'
  },
  {
    slug: 'dining-expanse',
    alias: null,
    name: 'Dining Expanse',
    words: ['Dining', 'Expanse'],
    numberTag: 'Loft N°3',
    category: 'Catering Pavilion',
    sizeNum: '12,000',
    sizeDisplay: '12,000 sq ft',
    capacityNum: '800',
    capacityDisplay: '800 guests',
    image: '/images/card_7_dining_expanse.webp',
    metaDesc: 'Dining Expanse at The Grand Lucknow – 12,000 sq ft grand culinary and dining hall accommodating up to 800 guests in Gomti Nagar, Lucknow.',
    desc: 'Spanning 12,000 square feet of purpose-built catering and dining architecture, Dining Expanse delivers high-capacity culinary hospitality for up to 800 guests. Equipped with state-of-the-art live counters, buffet pavilions, and seamless service aisles, it ensures effortless culinary journeys for grand celebrations.'
  },
  {
    slug: 'vip-atrium',
    alias: null,
    name: 'VIP Atrium',
    words: ['VIP', 'Atrium'],
    numberTag: 'Garden N°1',
    category: 'Executive Lounge',
    sizeNum: '2,500',
    sizeDisplay: '2,500 sq ft',
    capacityNum: '150',
    capacityDisplay: '150 guests',
    image: '/images/card_8_courtyard_day.webp',
    metaDesc: 'VIP Atrium at The Grand Lucknow – 2,500 sq ft exclusive climate-controlled lounge accommodating up to 150 guests in Gomti Nagar, Lucknow.',
    desc: 'Enclosing 2,500 square feet of climate-controlled, luminous architectural space, VIP Atrium is dedicated to dignitary hospitality, private cocktails, and executive lounges. Catering to 150 guests with plush seating and discreet butler service, it defines elevated exclusivity at The Grand Lucknow.'
  },
  {
    slug: 'bridal-suite',
    alias: null,
    name: 'Bridal Suite',
    words: ['Bridal', 'Suite'],
    numberTag: 'Urban N°1',
    category: 'Private Dressing Suite',
    sizeNum: '1,200',
    sizeDisplay: '1,200 sq ft',
    capacityNum: '50',
    capacityDisplay: '50 guests',
    image: '/images/card_9_vip_suite.webp',
    metaDesc: 'Bridal Suite at The Grand Lucknow – 1,200 sq ft private luxury prep suite accommodating up to 50 guests in Gomti Nagar, Lucknow.',
    desc: 'Spanning 1,200 square feet of tranquil luxury, the Bridal Suite offers a private haven for bridal preparations, family photography, and pre-wedding rest. Featuring dedicated vanity stations, en-suite changing salons, and private lounge seating for up to 50 guests.'
  }
];

function generateSubpage(venueIndex) {
  const v = VENUES[venueIndex];
  const next1 = VENUES[(venueIndex + 1) % VENUES.length];
  const next2 = VENUES[(venueIndex + 2) % VENUES.length];

  const vListsStart = masterHtml.indexOf('<div class="framer-2iif9c" data-framer-name="Venue Lists">');
  const vListsEnd = masterHtml.indexOf('<footer class="framer-18na9ah"', vListsStart);

  let before = masterHtml.slice(0, vListsStart);
  let vlist = masterHtml.slice(vListsStart, vListsEnd);
  let after = masterHtml.slice(vListsEnd);

  // --- 1. Process 'before' (Header, Hero, Gallery, Details, Features, Location) ---
  // Title and Metadata
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

  // Gallery: Replace card_1_open_earth with venue's own image in all 6 slots
  before = before.replace(
    /\/images\/card_1_open_earth\.webp/g,
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

  // Feature Specs Table (Size & Capacity)
  before = before.replace(
    /(rotate\(8deg\)">)55,000(<\/span><\/span> <!-- --> <span style="display:inline-flex;overflow:hidden;padding-top:0;margin-top:0;padding-left:0.06em;padding-right:0.06em;margin-left:-0.06em;margin-right:-0.06em;padding-bottom:4px;margin-bottom:-4px"><span style="display:inline-block;transform-origin:50% 100%;will-change:transform;opacity:1;transform:translateY\(100px\) rotate\(8deg\)">Sqft<\/span>)/g,
    `$1${v.sizeNum}$2`
  );

  before = before.replace(
    /(rotate\(8deg\)">)1,500(<\/span><\/span> <\/p><\/div>)/g,
    `$1${v.capacityNum}$2`
  );

  // --- 2. Process 'vlist' (Strictly Card 1 and Card 2) ---
  // Card 1: Replaces Grassland Gala card with next1
  vlist = vlist.replace(/href="\/venues\/grassland-gala"/g, `href="/venues/${next1.slug}"`);
  vlist = vlist.replace(/\/images\/card_2_grassland_gala\.webp/g, next1.image);
  vlist = vlist.replace(/alt="Grassland Gala"/g, `alt="${next1.name}"`);
  vlist = vlist.replace(/(rotate\(8deg\)">)Grassland Gala(<\/span><\/span> <\/h2>)/g, `$1${next1.name}$2`);
  vlist = vlist.replace(
    /(<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var\(--extracted-r6o4lv, var\(--variable-reference-SynSWk5OK-T5PVEAy5F\)\)">)20,000(<\/p>)/,
    `$1${next1.sizeNum}$2`
  );
  vlist = vlist.replace(
    /(<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var\(--extracted-r6o4lv, var\(--variable-reference-SynSWk5OK-T5PVEAy5F\)\)">)800(<\/p>)/,
    `$1${next1.capacityNum}$2`
  );

  // Card 2: Replaces Garden Galaxy card with next2
  vlist = vlist.replace(/href="\/venues\/garden-galaxy"/g, `href="/venues/${next2.slug}"`);
  vlist = vlist.replace(/\/images\/card_3_ballroom\.webp/g, next2.image);
  vlist = vlist.replace(/alt="Garden Galaxy"/g, `alt="${next2.name}"`);
  vlist = vlist.replace(/(rotate\(8deg\)">)Garden Galaxy(<\/span><\/span> <\/h2>)/g, `$1${next2.name}$2`);
  vlist = vlist.replace(
    /(<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var\(--extracted-r6o4lv, var\(--variable-reference-SynSWk5OK-T5PVEAy5F\)\)">)15,000(<\/p>)/,
    `$1${next2.sizeNum}$2`
  );
  vlist = vlist.replace(
    /(<p class="framer-text framer-styles-preset-12u2lkp" data-styles-preset="Z5WNPnPrM" dir="auto" style="--framer-text-alignment:start;--framer-text-color:var\(--extracted-r6o4lv, var\(--variable-reference-SynSWk5OK-T5PVEAy5F\)\)">)600(<\/p>)/,
    `$1${next2.capacityNum}$2`
  );

  // --- 3. Process 'after' (Footer, Scripts, Overlap Observer, Booking Modal) ---
  // Location and Open in Maps overlap fade: Dim both h2 and button during sticky logo overlap
  const oldLocRegex = /\/\/ Accurate Casa Momo Location overlap fade[\s\S]*?onLocScroll\(\);\s*\}/;
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
    /<h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">Open Earth Lawn<\/h3>/g,
    `<h3 style="font-family:'DM Serif Display', Georgia, serif; font-size:28px; margin:0; color:#fff0ca;">${v.name}</h3>`
  );

  after = after.replace(
    /<strong>Venue Scale:<\/strong> 55,000 sq ft &nbsp;•&nbsp; 1,500 Capacity/g,
    `<strong>Venue Scale:</strong> ${v.sizeDisplay} &nbsp;•&nbsp; ${v.capacityDisplay} Capacity`
  );

  after = after.replace(
    /Your date lock request for <strong>Open Earth Lawn<\/strong> has been logged\./g,
    `Your date lock request for <strong>${v.name}</strong> has been logged.`
  );

  // Parameterize client-side script wireAll
  after = after.replace(
    /if \(txt\.includes\('sq ft sq ft'\)\) el\.innerText = '55,000 sq ft';[\s\S]*?if \(txt === '3' \|\| txt === '2' \|\| txt === '4'\) el\.innerText = '1,500';/g,
    `if (txt.includes('sq ft sq ft')) el.innerText = '${v.sizeDisplay}';
        if (txt === '20,000 sq ft' || txt === '45' || txt === '60 sq ft' || txt === '75 sq ft' || txt === '55,000 sq ft') el.innerText = '${v.sizeDisplay}';
        if (txt === '3' || txt === '2' || txt === '4' || txt === '1,500') el.innerText = '${v.capacityNum}';`
  );

  after = after.replace(
    /p\.innerText = "Our most expansive outdoor lawn space combining two magnificent phases[^"]*";/g,
    `p.innerText = "${v.desc.replace(/"/g, '\\"')}";`
  );

  after = after.replace(
    /chip\.innerText = "Open Earth Lawn";/g,
    `chip.innerText = "${v.name}";`
  );

  return before + vlist + after;
}

// Test Grassland Gala
const galaHtml = generateSubpage(1);
fs.writeFileSync('venues/grassland-gala.html', galaHtml, 'utf8');
fs.writeFileSync('venues/venue-n2.html', galaHtml, 'utf8');

// Verify Grassland Gala
const imgs = [...galaHtml.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
console.log('Grassland Gala Images (first 9):', imgs.slice(0, 9));
console.log('Grassland Gala Redirect Card 1:', galaHtml.match(/href="\/venues\/grand-ballroom"/)?.[0]);
console.log('Grassland Gala Redirect Card 2:', galaHtml.match(/href="\/venues\/the-courtyard"/)?.[0]);
