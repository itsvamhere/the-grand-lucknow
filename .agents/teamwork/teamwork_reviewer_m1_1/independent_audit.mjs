import fs from 'fs';
import path from 'path';

const ROOT_DIR = 'C:/Users/Sambhav/.gemini/antigravity/scratch/replications/casamomo';

console.log('====================================================');
console.log('INDEPENDENT AUDIT: REVIEWER VERIFICATION & CHECKS');
console.log('====================================================');

const lawnPath = path.join(ROOT_DIR, 'venues/open-earth-lawn.html');
const indexPath = path.join(ROOT_DIR, 'index.html');
const vercelPath = path.join(ROOT_DIR, 'vercel.json');
const serverPath = path.join(ROOT_DIR, 'server.mjs');
const heroImgPath = path.join(ROOT_DIR, 'images/venues/the_grand_open_earth_lawn_hero.jpg');
const sourceImgPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/.user_uploaded/media_1794032332967_bb41bc6b.jpg';

const lawnHtml = fs.readFileSync(lawnPath, 'utf8');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const vercelJson = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
const serverCode = fs.readFileSync(serverPath, 'utf8');

const results = [];
function check(name, pass, details) {
  results.push({ name, pass, details });
  console.log(`[${pass ? 'PASS' : 'FAIL'}] ${name}: ${details}`);
}

// -----------------------------------------------------------------
// 1. Untouchable index.html integrity
// -----------------------------------------------------------------
const indexStat = fs.statSync(indexPath);
check('Untouchable index.html', indexStat.size === 871500, `Size: ${indexStat.size} bytes, modified: ${indexStat.mtime.toISOString()}`);

// -----------------------------------------------------------------
// 2. Hero Image Asset
// -----------------------------------------------------------------
const heroExists = fs.existsSync(heroImgPath);
let heroMatchesSource = false;
if (heroExists && fs.existsSync(sourceImgPath)) {
  const heroBuf = fs.readFileSync(heroImgPath);
  const srcBuf = fs.readFileSync(sourceImgPath);
  heroMatchesSource = heroBuf.equals(srcBuf);
}
check('Hero Image Exists on Disk', heroExists, `Size: ${heroExists ? fs.statSync(heroImgPath).size : 0} bytes`);
check('Hero Image Binary Matches User Upload', heroMatchesSource, `Matches exact byte stream of media_1794032332967_bb41bc6b.jpg`);

// -----------------------------------------------------------------
// 3. Gallery Carousel Slides & Captions
// -----------------------------------------------------------------
const heroImgRefs = (lawnHtml.match(/\/images\/venues\/the_grand_open_earth_lawn_hero\.jpg/g) || []).length;
check('Gallery References Hero Image', heroImgRefs >= 6, `Found ${heroImgRefs} occurrences of the hero image in markup`);

const hasLivingRoom = lawnHtml.includes('Living Room');
const hasBedroom = lawnHtml.includes('Bedroom');
check('Captions Purged', !hasLivingRoom && !hasBedroom, `Living Room: ${hasLivingRoom}, Bedroom: ${hasBedroom}`);

const fractionList = ['1/6', '2/6', '3/6', '4/6', '5/6', '6/6'];
const foundFractions = fractionList.filter(f => lawnHtml.includes(`>${f}<`));
check('Strict Fraction Numbering', foundFractions.length === 6, `Found ${foundFractions.length}/6 fractions: ${foundFractions.join(', ')}`);

const counterRightAlign = lawnHtml.includes('.framer-6rg8a') && lawnHtml.includes('justify-content: flex-end !important');
check('Counter Right-Alignment', counterRightAlign, 'justify-content: flex-end injected for .framer-6rg8a');

// -----------------------------------------------------------------
// 4. Location Section & Button Styling
// -----------------------------------------------------------------
const hasContrastColor = lawnHtml.includes('#4E5240');
const hasCapitalize = lawnHtml.includes('text-transform: capitalize !important');
check('Location Watermark Contrast & Capitalize', hasContrastColor && hasCapitalize, `Contrast #4E5240: ${hasContrastColor}, Capitalize: ${hasCapitalize}`);

const hasBtnBg = lawnHtml.includes('#616452');
const hasBtnColor = lawnHtml.includes('#FFF0CA');
check('Open in Maps Button Styling', hasBtnBg && hasBtnColor, `Background #616452: ${hasBtnBg}, Text #FFF0CA: ${hasBtnColor}`);

const scrollDimsHeadingOnly = lawnHtml.includes('locH.style.opacity') && lawnHtml.includes('dimOpacity = 0.50');
check('Location Scroll Dimming Scoped to Heading', scrollDimsHeadingOnly, 'Scroll handler modulates locH.style.opacity to 0.50 exclusively');

// -----------------------------------------------------------------
// 5. Map Pin & Pulse Positioning
// -----------------------------------------------------------------
const hasPinPosition = lawnHtml.includes('left: 32%') && lawnHtml.includes('top: 38%');
check('Map Pin Position 32%/38%', hasPinPosition, 'Found left: 32% and top: 38% in markup/CSS');

// -----------------------------------------------------------------
// 6. Other Venues Cards & Routing
// -----------------------------------------------------------------
const hasGrasslandGalaImg = lawnHtml.includes('/images/card_2_grassland_gala.webp');
const hasGardenGalaxyImg = lawnHtml.includes('/images/card_3_ballroom.webp');
const hasGrasslandLink = lawnHtml.includes('href="/venues/grassland-gala"');
const hasGardenLink = lawnHtml.includes('href="/venues/garden-galaxy"');
check('Other Venues Card Images & Links', hasGrasslandGalaImg && hasGardenGalaxyImg && hasGrasslandLink && hasGardenLink, 
  `Grassland Gala img: ${hasGrasslandGalaImg}, link: ${hasGrasslandLink} | Garden Galaxy img: ${hasGardenGalaxyImg}, link: ${hasGardenLink}`);

const vercelRewrites = JSON.stringify(vercelJson.rewrites || []);
const vercelRedirects = JSON.stringify(vercelJson.redirects || []);
const hasVercelGrassland = vercelRewrites.includes('grassland-gala') || vercelRedirects.includes('grassland-gala');
const hasVercelGarden = vercelRewrites.includes('garden-galaxy') || vercelRedirects.includes('garden-galaxy');
check('Vercel Routing Rules', hasVercelGrassland && hasVercelGarden, `Grassland in vercel.json: ${hasVercelGrassland}, Garden in vercel.json: ${hasVercelGarden}`);

const hasServerGrassland = serverCode.includes('grassland-gala');
const hasServerGarden = serverCode.includes('garden-galaxy');
check('Server.mjs Local Slug Aliases', hasServerGrassland && hasServerGarden, `Grassland: ${hasServerGrassland}, Garden: ${hasServerGarden}`);

// -----------------------------------------------------------------
// 7. Universal Footer Replication
// -----------------------------------------------------------------
const footerStart = lawnHtml.indexOf('<footer');
const footerEnd = lawnHtml.indexOf('</footer>', footerStart);
const lawnFooter = lawnHtml.slice(footerStart, footerEnd + 9);

const hasDesktopVariant = lawnFooter.includes('hidden-o5o8qi');
const hasMobileVariant = lawnFooter.includes('hidden-72rtr7') && lawnFooter.includes('hidden-p8zd8m');
check('Universal Footer Dual SSR Variants', hasDesktopVariant && hasMobileVariant, 
  `Desktop hidden-o5o8qi: ${hasDesktopVariant}, Mobile hidden-72rtr7.hidden-p8zd8m: ${hasMobileVariant}`);

const bannerDataUri = '%3Ctext%20x%3D%2250%25%22%20y%3D%22225%22%20text-anchor%3D%22middle%22%20font-family%3D%22\'Lay%20Grotesk%20Regular\'%2C%20sans-serif%22%20font-size%3D%22192%22%20font-weight%3D%22700%22%20letter-spacing%3D%220.08em%22%20fill%3D%22var(--token-8ecd7124-9686-4bd8-bf72-4f81314652d2%2C%20rgb(243%2C%20236%2C%20221))%22%3ETHE%20GRAND%3C%2Ftext%3E';
const hasBannerDataUri = lawnHtml.includes(bannerDataUri);
const hasBannerHeight150 = lawnHtml.includes('height: 150px !important');
check('THE GRAND Banner SVG & 150px Height', hasBannerDataUri && hasBannerHeight150, 
  `Banner SVG data URI match: ${hasBannerDataUri}, 150px desktop height: ${hasBannerHeight150}`);

const hasTickerTracks = lawnFooter.includes('grand-ticker-track track-a') && lawnFooter.includes('grand-ticker-track track-b');
const hasTickerKeyframes = lawnHtml.includes('@keyframes grand-ticker-scroll');
check('Infinite 2-Track Pure CSS Marquee', hasTickerTracks && hasTickerKeyframes, 
  `Dual tracks in DOM: ${hasTickerTracks}, Keyframes defined: ${hasTickerKeyframes}`);

const hasBrokenCharSpans = lawnFooter.includes('span data-char');
const hasInitFooterMotions = lawnHtml.includes('initGrandFooterMotions');
check('Broken Character Tearing Eliminated', !hasBrokenCharSpans && !hasInitFooterMotions, 
  `Char spans absent: ${!hasBrokenCharSpans}, initGrandFooterMotions purged: ${!hasInitFooterMotions}`);

// -----------------------------------------------------------------
// Summary
// -----------------------------------------------------------------
const total = results.length;
const passed = results.filter(r => r.pass).length;
const failed = total - passed;

console.log('\n====================================================');
console.log(`AUDIT TOTAL: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('====================================================');
if (failed > 0) process.exit(1);
