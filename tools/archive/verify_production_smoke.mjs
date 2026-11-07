import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = 'tools/proofs_prod';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runProductionSmoke() {
  const prodUrl = 'https://the-grand-lucknow.vercel.app/venues/open-earth-lawn';
  console.log('===============================================================');
  console.log(`VERCEL PRODUCTION SMOKE TEST: ${prodUrl}`);
  console.log('===============================================================');

  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });

  const page = await context.newPage();

  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  console.log(`Navigating to ${prodUrl} ...`);
  const response = await page.goto(prodUrl, {
    waitUntil: 'networkidle',
    timeout: 45000
  });

  const status = response?.status();
  console.log('Production HTTP Status:', status);

  // 1. Check Gallery Hero Images on Production
  console.log('\n--- 1. Production: Checking Gallery Images & Counter ---');
  await page.evaluate(() => {
    const el = document.querySelector('[data-framer-name="Photo Slider"]') || document.querySelector('.framer-6rg8a');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(1000);

  const galleryInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="the_grand_open_earth_lawn_hero.jpg"]'));
    const livingRooms = Array.from(document.querySelectorAll('*')).filter(e => e.children.length === 0 && e.textContent.includes('Living Room'));
    const bedrooms = Array.from(document.querySelectorAll('*')).filter(e => e.children.length === 0 && e.textContent.includes('Bedroom'));
    const counters = Array.from(document.querySelectorAll('*')).filter(e => e.children.length === 0 && /^[1-6]\/6$/.test(e.textContent.trim()));

    return {
      heroImgCount: imgs.length,
      imgLoaded: imgs[0] ? imgs[0].naturalWidth > 0 : false,
      naturalWidth: imgs[0] ? imgs[0].naturalWidth : 0,
      naturalHeight: imgs[0] ? imgs[0].naturalHeight : 0,
      livingRoomCount: livingRooms.length,
      bedroomCount: bedrooms.length,
      counterTexts: counters.map(c => c.textContent.trim())
    };
  });

  console.log('Production Hero Images found:', galleryInfo.heroImgCount, '(Loaded:', galleryInfo.imgLoaded, galleryInfo.naturalWidth, 'x', galleryInfo.naturalHeight, ')');
  console.log('Production Living Room / Bedroom count:', galleryInfo.livingRoomCount + galleryInfo.bedroomCount, '(expected 0)');
  console.log('Production Fractions found:', galleryInfo.counterTexts);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_gallery_slide.png') });

  // 2. Check Location Section & Button Styling
  console.log('\n--- 2. Production: Checking Location Section & Maps Button ---');
  await page.evaluate(() => {
    const locSec = document.getElementById('bigtext-1');
    if (locSec) locSec.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);

  const locInfo = await page.evaluate(() => {
    const heading = document.querySelector('#bigtext-1 h2');
    const hStyle = heading ? window.getComputedStyle(heading) : null;
    const btn = document.querySelector('#bigtext-1 a.dark-btn') || document.querySelector('#bigtext-1 [data-framer-name="Button Wrapper"] a');
    const bStyle = btn ? window.getComputedStyle(btn) : null;

    return {
      headingText: heading ? heading.textContent.trim() : null,
      headingColor: hStyle ? hStyle.color : null,
      headingTextTransform: hStyle ? hStyle.textTransform : null,
      btnBg: bStyle ? bStyle.backgroundColor : null,
      btnColor: bStyle ? bStyle.color : null,
      btnOpacity: bStyle ? bStyle.opacity : null
    };
  });

  console.log('Production Location Heading:', locInfo.headingText);
  console.log('Production Heading Color:', locInfo.headingColor, '(expected rgb(78, 82, 64) / #4E5240)');
  console.log('Production Text Transform:', locInfo.headingTextTransform, '(expected capitalize)');
  console.log('Production Maps Button Background:', locInfo.btnBg, '(expected rgb(97, 100, 82) / #616452)');
  console.log('Production Maps Button Color:', locInfo.btnColor, '(expected rgb(255, 240, 202) / #FFF0CA)');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_location_section.png') });

  // 3. Check Map Badge & Pulse Positioning
  console.log('\n--- 3. Production: Checking Map Badge & Pulse Clearance ---');
  await page.evaluate(() => {
    const mapSec = document.querySelector('.framer-tfszgi[data-framer-name="Location"]') || document.getElementById('subpage-vector-map');
    if (mapSec) mapSec.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);

  const mapInfo = await page.evaluate(() => {
    const pointer = document.getElementById('grand-live-pointer');
    const stickyBtn = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
    const ptrBox = pointer ? pointer.getBoundingClientRect() : null;
    const btnBox = stickyBtn ? stickyBtn.getBoundingClientRect() : null;

    let overlap = false;
    let distance = 9999;
    if (ptrBox && btnBox) {
      overlap = !(ptrBox.right < btnBox.left || ptrBox.left > btnBox.right || ptrBox.bottom < btnBox.top || ptrBox.top > btnBox.bottom);
      const dx = Math.max(0, Math.max(ptrBox.left - btnBox.right, btnBox.left - ptrBox.right));
      const dy = Math.max(0, Math.max(ptrBox.top - btnBox.bottom, btnBox.top - ptrBox.bottom));
      distance = Math.sqrt(dx * dx + dy * dy);
    }

    return {
      overlap,
      distance
    };
  });

  console.log('Production Map Pin & Sticky Button Overlap:', mapInfo.overlap, '(expected false)');
  console.log('Production Pin & Sticky Button Clearance:', Math.round(mapInfo.distance), 'px (expected > 100px)');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_map_pin_clearance.png') });

  // 4. Check Other Venues Cards
  console.log('\n--- 4. Production: Checking Other Venues Cards ---');
  await page.evaluate(() => {
    const sec = document.getElementById('bigtext-2');
    if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);

  const venuesCardsInfo = await page.evaluate(() => {
    const card1Img = document.querySelector('img[src*="card_2_grassland_gala.webp"]');
    const card2Img = document.querySelector('img[src*="card_3_ballroom.webp"]');
    const card1Link = document.querySelector('a[href="/venues/grassland-gala"]');
    const card2Link = document.querySelector('a[href="/venues/garden-galaxy"]');

    const card1Title = card1Link ? card1Link.querySelector('h2') : null;
    const card2Title = card2Link ? card2Link.querySelector('h2') : null;

    return {
      card1ImgSrc: card1Img ? card1Img.getAttribute('src') : null,
      card1ImgLoaded: card1Img ? card1Img.naturalWidth > 0 : false,
      card1Title: card1Title ? card1Title.textContent.trim() : null,
      card1Href: card1Link ? card1Link.getAttribute('href') : null,

      card2ImgSrc: card2Img ? card2Img.getAttribute('src') : null,
      card2ImgLoaded: card2Img ? card2Img.naturalWidth > 0 : false,
      card2Title: card2Title ? card2Title.textContent.trim() : null,
      card2Href: card2Link ? card2Link.getAttribute('href') : null
    };
  });

  console.log('Production Card 1 Image:', venuesCardsInfo.card1ImgSrc, '(Loaded:', venuesCardsInfo.card1ImgLoaded, ')');
  console.log('Production Card 1 Title:', venuesCardsInfo.card1Title, '(expected Grassland Gala)');
  console.log('Production Card 1 Link:', venuesCardsInfo.card1Href, '(expected /venues/grassland-gala)');

  console.log('Production Card 2 Image:', venuesCardsInfo.card2ImgSrc, '(Loaded:', venuesCardsInfo.card2ImgLoaded, ')');
  console.log('Production Card 2 Title:', venuesCardsInfo.card2Title, '(expected Garden Galaxy)');
  console.log('Production Card 2 Link:', venuesCardsInfo.card2Href, '(expected /venues/garden-galaxy)');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_other_venues.png') });

  // 5. Check Universal Footer Replication
  console.log('\n--- 5. Production: Checking Universal Footer ---');
  await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
  });
  await page.waitForTimeout(1000);

  const footerDesktopInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    const desktopVar = footer ? footer.querySelector('.ssr-variant.hidden-o5o8qi') : null;
    const mobileVar = footer ? footer.querySelector('.ssr-variant.hidden-72rtr7') : null;
    const dStyle = desktopVar ? window.getComputedStyle(desktopVar) : null;
    const mStyle = mobileVar ? window.getComputedStyle(mobileVar) : null;

    const banner = footer ? footer.querySelector('.framer-xj8hz2') : null;
    const bStyle = banner ? window.getComputedStyle(banner) : null;

    const ticker = footer ? footer.querySelector('.grand-ticker-container') : null;
    const trackA = footer ? footer.querySelector('.grand-ticker-track.track-a') : null;
    const trackB = footer ? footer.querySelector('.grand-ticker-track.track-b') : null;

    const linkVenues = footer ? footer.querySelector('a[href="/venues"]') : null;
    const linkAbout = footer ? footer.querySelector('a[href="/about"]') : null;

    return {
      desktopVisible: dStyle ? dStyle.display !== 'none' : false,
      mobileHidden: mStyle ? mStyle.display === 'none' : true,
      bannerWidth: bStyle ? bStyle.width : null,
      bannerHeight: bStyle ? bStyle.height : null,
      bannerBg: bStyle ? bStyle.backgroundImage.slice(0, 60) : null,
      hasTicker: !!ticker,
      hasTrackA: !!trackA,
      hasTrackB: !!trackB,
      venuesLinkText: linkVenues ? linkVenues.textContent.trim() : null,
      aboutLinkText: linkAbout ? linkAbout.textContent.trim() : null
    };
  });

  console.log('Production Desktop Variant Visible:', footerDesktopInfo.desktopVisible, '(expected true)');
  console.log('Production Mobile Variant Hidden on Desktop:', footerDesktopInfo.mobileHidden, '(expected true)');
  console.log('Production THE GRAND Banner Dimensions:', footerDesktopInfo.bannerWidth, 'x', footerDesktopInfo.bannerHeight, '(height expected 150px)');
  console.log('Production THE GRAND Banner Background:', footerDesktopInfo.bannerBg);
  console.log('Production Ticker Container & Tracks:', footerDesktopInfo.hasTicker && footerDesktopInfo.hasTrackA && footerDesktopInfo.hasTrackB);
  console.log('Production Footer Links: Venues =', JSON.stringify(footerDesktopInfo.venuesLinkText), ', About =', JSON.stringify(footerDesktopInfo.aboutLinkText));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'prod_footer_desktop.png') });

  // 6. Test Production Route Rewrites
  console.log('\n--- 6. Production: Checking Route Rewrites ---');
  const resGrassland = await page.goto('https://the-grand-lucknow.vercel.app/venues/grassland-gala', { waitUntil: 'domcontentloaded' });
  console.log('Production /venues/grassland-gala HTTP status:', resGrassland?.status());

  const resGarden = await page.goto('https://the-grand-lucknow.vercel.app/venues/garden-galaxy', { waitUntil: 'domcontentloaded' });
  console.log('Production /venues/garden-galaxy HTTP status:', resGarden?.status());

  await browser.close();

  console.log('\nProduction Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.warn('Console errors:', consoleErrors);

  console.log('Production Failed requests count:', failedRequests.length);
  if (failedRequests.length > 0) console.warn('Failed requests:', failedRequests);

  const prodPassed =
    status === 200 &&
    galleryInfo.heroImgCount >= 6 &&
    galleryInfo.imgLoaded &&
    galleryInfo.livingRoomCount === 0 &&
    galleryInfo.bedroomCount === 0 &&
    locInfo.headingColor.includes('78, 82, 64') &&
    locInfo.btnBg.includes('97, 100, 82') &&
    !mapInfo.overlap &&
    venuesCardsInfo.card1ImgLoaded &&
    venuesCardsInfo.card2ImgLoaded &&
    venuesCardsInfo.card1Title === 'Grassland Gala' &&
    venuesCardsInfo.card2Title === 'Garden Galaxy' &&
    footerDesktopInfo.desktopVisible &&
    footerDesktopInfo.bannerHeight === '150px' &&
    footerDesktopInfo.hasTicker &&
    resGrassland?.status() === 200 &&
    resGarden?.status() === 200 &&
    failedRequests.length === 0;

  console.log('\n===============================================================');
  console.log(`VERCEL PRODUCTION SMOKE TEST RESULT: ${prodPassed ? 'ALL TESTS PASSED 100%' : 'SOME TESTS FAILED'}`);
  console.log('===============================================================');

  if (!prodPassed) process.exit(1);
}

runProductionSmoke().catch(err => {
  console.error('Production smoke test error:', err);
  process.exit(1);
});
