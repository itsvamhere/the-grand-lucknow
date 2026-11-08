import fs from 'fs';
import path from 'path';

const fiveVenues = [
  {
    slug: 'open-earth-lawn',
    name: 'Open Earth Lawn',
    img: '/images/venues/open_earth_lawn_official.webp',
    expCard1: '/venues/grassland-gala',
    expCard2: '/venues/garden-galaxy'
  },
  {
    slug: 'grassland-gala',
    name: 'Grassland Gala',
    img: '/images/venues/grassland_gala_official.webp',
    expCard1: '/venues/garden-galaxy',
    expCard2: '/venues/the-grand-courtyard'
  },
  {
    slug: 'garden-galaxy',
    name: 'Garden Galaxy',
    img: '/images/venues/garden_galaxy_official.webp',
    expCard1: '/venues/the-grand-courtyard',
    expCard2: '/venues/the-royal-legacy-banquet'
  },
  {
    slug: 'the-grand-courtyard',
    name: 'The Grand Courtyard',
    img: '/images/venues/the_grand_courtyard_official.webp',
    expCard1: '/venues/the-royal-legacy-banquet',
    expCard2: '/venues/open-earth-lawn'
  },
  {
    slug: 'the-royal-legacy-banquet',
    name: 'The Royal Legacy Banquet',
    img: '/images/venues/royal_legacy_banquet_official.webp',
    expCard1: '/venues/open-earth-lawn',
    expCard2: '/venues/grassland-gala'
  }
];

let allPassed = true;

fiveVenues.forEach((vf, idx) => {
  const filePath = path.join('venues', `${vf.slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: File ${filePath} does not exist`);
    allPassed = false;
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // 1. Check Title
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  const hasTitle = title && title.includes(vf.name);

  // 2. Check 6 gallery images
  const imgs = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)].map(m => m[1]);
  const galleryImgs = imgs.slice(0, 6);
  const galleryMatches = galleryImgs.every(src => src === vf.img);

  // 3. Check Description
  const desc = html.match(/data-framer-name="Description"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/)?.[1];
  const hasDesc = desc && desc.length > 50 && (desc.includes(vf.name) || desc.includes('lawn') || desc.includes('banquet') || desc.includes('courtyard'));

  // 4. Check Recommended Cards
  const vListRegion = html.slice(html.indexOf('data-framer-name="Venue Lists"'), html.indexOf('<footer'));
  const c1Link = vListRegion.includes(`href="${vf.expCard1}"`);
  const c2Link = vListRegion.includes(`href="${vf.expCard2}"`);
  const selfLink = vListRegion.includes(`href="/venues/${vf.slug}"`);

  // 5. Check Footer & Navbar
  const hasFooter = html.includes('footer class="framer-18na9ah"') && html.includes('#964317');
  const hasNavbar = html.includes('data-framer-name="Navbar Wrapper"');
  const hasOverlapFade = html.includes('Accurate Casa Momo Location & Open in Maps overlap fade');

  const passed = hasTitle && galleryMatches && hasDesc && c1Link && c2Link && !selfLink && hasFooter && hasNavbar && hasOverlapFade;

  if (passed) {
    console.log(`[PASS] ${vf.slug}: 6 gallery imgs=${vf.img}, Card1=${vf.expCard1}, Card2=${vf.expCard2}, desc=${desc?.slice(0, 45)}...`);
  } else {
    console.error(`[FAIL] ${vf.slug}:`);
    console.error(`  hasTitle: ${hasTitle} (${title})`);
    console.error(`  galleryMatches: ${galleryMatches} (found: ${galleryImgs})`);
    console.error(`  hasDesc: ${hasDesc} (${desc?.slice(0, 60)})`);
    console.error(`  c1Link: ${c1Link} (expected: ${vf.expCard1})`);
    console.error(`  c2Link: ${c2Link} (expected: ${vf.expCard2})`);
    console.error(`  selfLink (should be false): ${selfLink}`);
    console.error(`  hasFooter: ${hasFooter}`);
    console.error(`  hasNavbar: ${hasNavbar}`);
    console.error(`  hasOverlapFade: ${hasOverlapFade}`);
    allPassed = false;
  }
});

// Also check index.html and venues.html
const indexHtml = fs.readFileSync('index.html', 'utf8');
const idxCards = [...indexHtml.matchAll(/data-framer-name="Venue Item"[\s\S]*?<\/a>/g)];
console.log(`\nIndex venue cards count: ${idxCards.length} (expected 5)`);
if (idxCards.length !== 5) allPassed = false;

const venuesHtml = fs.readFileSync('venues.html', 'utf8');
const vCards = [...venuesHtml.matchAll(/data-framer-name="Venue Item"[\s\S]*?<\/a>/g)];
console.log(`venues.html venue cards count: ${vCards.length} (expected 5)`);
if (vCards.length !== 5) allPassed = false;

if (allPassed) {
  console.log('\n*** ALL 5 VERIFIED VENUES PASSED 100% OF VERIFICATION GATES! ***\n');
} else {
  console.error('\n*** VERIFICATION FAILED ***\n');
  process.exit(1);
}
