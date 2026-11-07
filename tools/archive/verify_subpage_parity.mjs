import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = 'tools/proofs';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runLocalVerification() {
  console.log('===============================================================');
  console.log('PLAYWRIGHT LOCAL VERIFICATION: http://localhost:3003/venues/open-earth-lawn');
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

  console.log('Navigating to http://localhost:3003/venues/open-earth-lawn ...');
  const response = await page.goto('http://localhost:3003/venues/open-earth-lawn', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  console.log('Page response status:', response?.status());

  // -------------------------------------------------------------
  // TEST 1: GALLERY IMAGES & NUMBERING
  // -------------------------------------------------------------
  console.log('\n--- 1. Testing Gallery Carousel ---');
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
    const counterContainer = document.querySelector('.framer-6rg8a');
    const computedJustify = counterContainer ? window.getComputedStyle(counterContainer).justifyContent : null;

    return {
      heroImgCount: imgs.length,
      naturalWidth: imgs[0] ? imgs[0].naturalWidth : 0,
      naturalHeight: imgs[0] ? imgs[0].naturalHeight : 0,
      livingRoomCount: livingRooms.length,
      bedroomCount: bedrooms.length,
      counterTexts: counters.map(c => c.textContent.trim()),
      computedJustify
    };
  });

  console.log('Gallery Hero Images found:', galleryInfo.heroImgCount, '(Natural size:', galleryInfo.naturalWidth, 'x', galleryInfo.naturalHeight, ')');
  console.log('Living Room / Bedroom count:', galleryInfo.livingRoomCount + galleryInfo.bedroomCount, '(expected 0)');
  console.log('Fractions found:', galleryInfo.counterTexts);
  console.log('Counter row justify-content:', galleryInfo.computedJustify);

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_gallery_slide.png') });

  // -------------------------------------------------------------
  // TEST 2: LOCATION OVERLAP & BUTTON STYLING
  // -------------------------------------------------------------
  console.log('\n--- 2. Testing Location Overlap & Button Styling ---');
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
    const locSec = document.getElementById('bigtext-1');
    const secStyle = locSec ? window.getComputedStyle(locSec) : null;

    return {
      headingText: heading ? heading.textContent.trim() : null,
      headingColor: hStyle ? hStyle.color : null,
      headingTextTransform: hStyle ? hStyle.textTransform : null,
      btnBg: bStyle ? bStyle.backgroundColor : null,
      btnColor: bStyle ? bStyle.color : null,
      btnOpacity: bStyle ? bStyle.opacity : null,
      secOpacity: secStyle ? secStyle.opacity : null
    };
  });

  console.log('Location Heading:', locInfo.headingText);
  console.log('Location Heading Color:', locInfo.headingColor, '(expected rgb(78, 82, 64) / #4E5240)');
  console.log('Location Text Transform:', locInfo.headingTextTransform, '(expected capitalize)');
  console.log('Maps Button Background:', locInfo.btnBg, '(expected rgb(97, 100, 82) / #616452)');
  console.log('Maps Button Color:', locInfo.btnColor, '(expected rgb(255, 240, 202) / #FFF0CA)');
  console.log('Maps Button Opacity:', locInfo.btnOpacity, '(expected 1)');

  // Test scroll dimming of heading
  await page.evaluate(() => {
    const locSec = document.getElementById('bigtext-1');
    if (locSec) {
      const top = window.scrollY + locSec.getBoundingClientRect().top - 40;
      window.scrollTo(0, top);
    }
  });
  await page.waitForTimeout(500);

  const scrolledLocInfo = await page.evaluate(() => {
    const heading = document.querySelector('#bigtext-1 h2');
    const btn = document.querySelector('#bigtext-1 a.dark-btn') || document.querySelector('#bigtext-1 [data-framer-name="Button Wrapper"] a');
    const locSec = document.getElementById('bigtext-1');
    return {
      hOpacity: heading ? window.getComputedStyle(heading).opacity : null,
      bOpacity: btn ? window.getComputedStyle(btn).opacity : null,
      secOpacity: locSec ? window.getComputedStyle(locSec).opacity : null
    };
  });

  console.log('Under Scroll - Heading Opacity:', scrolledLocInfo.hOpacity, '(dimmed)');
  console.log('Under Scroll - Button Opacity:', scrolledLocInfo.bOpacity, '(must be 1)');
  console.log('Under Scroll - Section Opacity:', scrolledLocInfo.secOpacity, '(must be 1)');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_location_section.png') });

  // -------------------------------------------------------------
  // TEST 3: MAP BADGE & PULSE POSITIONING
  // -------------------------------------------------------------
  console.log('\n--- 3. Testing Map Badge & Pulse Positioning ---');
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
    const ptrStyle = pointer ? window.getComputedStyle(pointer) : null;

    let overlap = false;
    let distance = 9999;
    if (ptrBox && btnBox) {
      overlap = !(ptrBox.right < btnBox.left || ptrBox.left > btnBox.right || ptrBox.bottom < btnBox.top || ptrBox.top > btnBox.bottom);
      const dx = Math.max(0, Math.max(ptrBox.left - btnBox.right, btnBox.left - ptrBox.right));
      const dy = Math.max(0, Math.max(ptrBox.top - btnBox.bottom, btnBox.top - ptrBox.bottom));
      distance = Math.sqrt(dx * dx + dy * dy);
    }

    return {
      ptrLeft: ptrStyle ? ptrStyle.left : null,
      ptrTop: ptrStyle ? ptrStyle.top : null,
      overlap,
      distance
    };
  });

  console.log('Map Pointer Left/Top:', mapInfo.ptrLeft, '/', mapInfo.ptrTop);
  console.log('Map Pin & Sticky Button Overlap:', mapInfo.overlap, '(expected false)');
  console.log('Clearance Distance between Pin and Sticky Button:', Math.round(mapInfo.distance), 'px (expected > 100px)');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_map_pin_clearance.png') });

  // -------------------------------------------------------------
  // TEST 4: OTHER VENUES CARDS & LINKS
  // -------------------------------------------------------------
  console.log('\n--- 4. Testing Other Venues Cards & Links ---');
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

  console.log('Card 1 Image:', venuesCardsInfo.card1ImgSrc, '(Loaded:', venuesCardsInfo.card1ImgLoaded, ')');
  console.log('Card 1 Title:', venuesCardsInfo.card1Title, '(expected Grassland Gala)');
  console.log('Card 1 Link:', venuesCardsInfo.card1Href, '(expected /venues/grassland-gala)');

  console.log('Card 2 Image:', venuesCardsInfo.card2ImgSrc, '(Loaded:', venuesCardsInfo.card2ImgLoaded, ')');
  console.log('Card 2 Title:', venuesCardsInfo.card2Title, '(expected Garden Galaxy)');
  console.log('Card 2 Link:', venuesCardsInfo.card2Href, '(expected /venues/garden-galaxy)');

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_other_venues.png') });

  // -------------------------------------------------------------
  // TEST 5: UNIVERSAL FOOTER REPLICATION (DESKTOP)
  // -------------------------------------------------------------
  console.log('\n--- 5. Testing Universal Footer Replication (Desktop) ---');
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
      hasFooter: !!footer,
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

  console.log('Desktop Variant Visible:', footerDesktopInfo.desktopVisible, '(expected true)');
  console.log('Mobile Variant Hidden on Desktop:', footerDesktopInfo.mobileHidden, '(expected true)');
  console.log('THE GRAND Banner Dimensions:', footerDesktopInfo.bannerWidth, 'x', footerDesktopInfo.bannerHeight, '(height expected 150px)');
  console.log('THE GRAND Banner Background:', footerDesktopInfo.bannerBg);
  console.log('Ticker Container & Tracks:', footerDesktopInfo.hasTicker && footerDesktopInfo.hasTrackA && footerDesktopInfo.hasTrackB);
  console.log('Footer Links solid text: Venues =', JSON.stringify(footerDesktopInfo.venuesLinkText), ', About =', JSON.stringify(footerDesktopInfo.aboutLinkText));

  // Hover over Venues link and verify no split characters
  const venuesLink = await page.$('footer.framer-18na9ah a[href="/venues"]');
  if (venuesLink) {
    await venuesLink.hover();
    await page.waitForTimeout(400);
    const hoverInfo = await venuesLink.evaluate(el => ({
      text: el.textContent.trim(),
      opacity: window.getComputedStyle(el).opacity
    }));
    console.log('Venues Hover Text (no broken letters):', JSON.stringify(hoverInfo.text), 'Opacity:', hoverInfo.opacity);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_footer_hover_venues.png') });
  }

  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_footer_desktop.png') });

  // -------------------------------------------------------------
  // TEST 6: MOBILE VIEWPORT TEST (375x812)
  // -------------------------------------------------------------
  console.log('\n--- 6. Testing Mobile Viewport (375x812) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'end' });
  });
  await mobilePage.waitForTimeout(800);

  const mobileInfo = await mobilePage.evaluate(() => {
    const footer = document.querySelector('footer.framer-18na9ah');
    const desktopVar = footer ? footer.querySelector('.ssr-variant.hidden-o5o8qi') : null;
    const mobileVar = footer ? footer.querySelector('.ssr-variant.hidden-72rtr7') : null;
    const dStyle = desktopVar ? window.getComputedStyle(desktopVar) : null;
    const mStyle = mobileVar ? window.getComputedStyle(mobileVar) : null;

    const banner = footer ? footer.querySelector('.framer-xj8hz2') : null;
    const bStyle = banner ? window.getComputedStyle(banner) : null;

    return {
      desktopHidden: dStyle ? dStyle.display === 'none' : true,
      mobileVisible: mStyle ? mStyle.display !== 'none' : false,
      bannerWidth: bStyle ? bStyle.width : null,
      bannerHeight: bStyle ? bStyle.height : null
    };
  });

  console.log('Mobile Viewport - Desktop Hidden:', mobileInfo.desktopHidden, '(expected true)');
  console.log('Mobile Viewport - Mobile Visible:', mobileInfo.mobileVisible, '(expected true)');
  console.log('Mobile Banner Dimensions:', mobileInfo.bannerWidth, 'x', mobileInfo.bannerHeight, '(height expected 70px)');

  await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'proof_footer_mobile.png') });

  // -------------------------------------------------------------
  // ROUTE VERIFICATION FOR REWRITES
  // -------------------------------------------------------------
  console.log('\n--- 7. Testing Route Rewrites on Local Server ---');
  const resGrassland = await page.goto('http://localhost:3003/venues/grassland-gala', { waitUntil: 'domcontentloaded' });
  console.log('/venues/grassland-gala HTTP status:', resGrassland?.status());

  const resGarden = await page.goto('http://localhost:3003/venues/garden-galaxy', { waitUntil: 'domcontentloaded' });
  console.log('/venues/garden-galaxy HTTP status:', resGarden?.status());

  await browser.close();

  console.log('\nConsole errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.warn('Console errors:', consoleErrors);

  console.log('Failed requests count:', failedRequests.length);
  if (failedRequests.length > 0) console.warn('Failed requests:', failedRequests);

  const allPassed =
    galleryInfo.heroImgCount >= 6 &&
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
    mobileInfo.mobileVisible &&
    resGrassland?.status() === 200 &&
    resGarden?.status() === 200;

  console.log('\n===============================================================');
  console.log(`LOCAL PLAYWRIGHT VERIFICATION RESULT: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
  console.log('===============================================================');

  if (!allPassed) process.exit(1);
}

runLocalVerification().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
