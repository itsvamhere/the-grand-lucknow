import fs from 'fs';
import path from 'path';

const venueFiles = [
  { slug: 'open-earth-lawn', name: 'Open Earth Lawn', img: '/images/card_1_open_earth.webp', expCard1: '/venues/grassland-gala', expCard2: '/venues/grand-ballroom' },
  { slug: 'grassland-gala', name: 'Grassland Gala', img: '/images/card_2_grassland_gala.webp', expCard1: '/venues/grand-ballroom', expCard2: '/venues/the-courtyard' },
  { slug: 'grand-ballroom', name: 'Grand Ballroom', img: '/images/card_3_ballroom.webp', expCard1: '/venues/the-courtyard', expCard2: '/venues/garden-pavilion' },
  { slug: 'the-courtyard', name: 'The Courtyard', img: '/images/card_4_courtyard.webp', expCard1: '/venues/garden-pavilion', expCard2: '/venues/north-mandap' },
  { slug: 'garden-pavilion', name: 'Garden Pavilion', img: '/images/card_5_garden_pavilion.webp', expCard1: '/venues/north-mandap', expCard2: '/venues/dining-expanse' },
  { slug: 'north-mandap', name: 'North Mandap', img: '/images/card_6_mandap_lawn.webp', expCard1: '/venues/dining-expanse', expCard2: '/venues/vip-atrium' },
  { slug: 'dining-expanse', name: 'Dining Expanse', img: '/images/card_7_dining_expanse.webp', expCard1: '/venues/vip-atrium', expCard2: '/venues/bridal-suite' },
  { slug: 'vip-atrium', name: 'VIP Atrium', img: '/images/card_8_courtyard_day.webp', expCard1: '/venues/bridal-suite', expCard2: '/venues/open-earth-lawn' },
  { slug: 'bridal-suite', name: 'Bridal Suite', img: '/images/card_9_vip_suite.webp', expCard1: '/venues/open-earth-lawn', expCard2: '/venues/grassland-gala' }
];

let allPassed = true;

venueFiles.forEach((vf, idx) => {
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
  const hasDesc = desc && desc.length > 50 && desc.includes(vf.name);

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
    console.log(`[PASS] ${vf.slug}: 6 gallery imgs=${vf.img}, Card1=${vf.expCard1}, Card2=${vf.expCard2}, desc=${desc.slice(0, 45)}...`);
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

if (allPassed) {
  console.log('\n*** ALL 9 VENUE SUBPAGES PASSED 100% OF VERIFICATION GATES! ***\n');
} else {
  console.error('\n*** SOME GATES FAILED! ***\n');
  process.exit(1);
}
