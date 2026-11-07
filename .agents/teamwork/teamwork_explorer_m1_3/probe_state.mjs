import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. FOOTER COMPARISON (Home vs Subpage) ---');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  const homeFooter = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return { exists: false };
    const ticker = f.querySelector('.framer-n49p1z, [data-framer-name*="Ticker"]');
    const grandBigText = f.querySelector('[data-framer-name="Footer Logo"], .framer-xj8hz2, svg');
    const computedStyles = window.getComputedStyle(f);
    return {
      exists: true,
      className: f.className,
      dataFramerName: f.getAttribute('data-framer-name'),
      height: f.getBoundingClientRect().height,
      bgColor: computedStyles.backgroundColor,
      hasTicker: !!ticker,
      tickerAnimation: ticker ? window.getComputedStyle(ticker.querySelector('ul') || ticker).animation : null,
      bigTextSvgWidth: grandBigText ? grandBigText.getBoundingClientRect().width : null,
      bigTextSvgHeight: grandBigText ? grandBigText.getBoundingClientRect().height : null
    };
  });
  console.log('Home Footer:', JSON.stringify(homeFooter, null, 2));

  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  const subFooter = await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (!f) return { exists: false };
    const ticker = f.querySelector('.framer-n49p1z, [data-framer-name*="Ticker"]');
    const grandBigText = f.querySelector('[data-framer-name="Footer Logo"], .framer-xj8hz2, svg');
    const computedStyles = window.getComputedStyle(f);
    return {
      exists: true,
      className: f.className,
      dataFramerName: f.getAttribute('data-framer-name'),
      height: f.getBoundingClientRect().height,
      bgColor: computedStyles.backgroundColor,
      hasTicker: !!ticker,
      tickerAnimation: ticker ? window.getComputedStyle(ticker.querySelector('ul') || ticker).animation : null,
      bigTextSvgWidth: grandBigText ? grandBigText.getBoundingClientRect().width : null,
      bigTextSvgHeight: grandBigText ? grandBigText.getBoundingClientRect().height : null
    };
  });
  console.log('Subpage Footer:', JSON.stringify(subFooter, null, 2));

  console.log('\n--- 2. LOCATION SECTION & BUTTON ---');
  const locationInfo = await page.evaluate(() => {
    const locSection = document.querySelector('[data-framer-name="Location"], .framer-tfszgi');
    const mapsBtn = document.querySelector('a.grand-nav-maps-btn, [data-framer-name="Location"] a.framer-vO7O2');
    const watermark = document.querySelector('#bigtext-1, [data-framer-name="Location Text"], .framer-fg60rc');
    return {
      locExists: !!locSection,
      mapsBtn: mapsBtn ? {
        text: mapsBtn.innerText,
        bg: window.getComputedStyle(mapsBtn).backgroundColor,
        color: window.getComputedStyle(mapsBtn).color,
        borderRadius: window.getComputedStyle(mapsBtn).borderRadius
      } : null,
      watermark: watermark ? {
        text: watermark.innerText,
        color: window.getComputedStyle(watermark).color,
        opacity: window.getComputedStyle(watermark).opacity
      } : null
    };
  });
  console.log('Location info:', JSON.stringify(locationInfo, null, 2));

  console.log('\n--- 3. MAP BADGE & PULSE POSITION ---');
  const mapPinInfo = await page.evaluate(() => {
    const mapContainer = document.querySelector('#subpage-vector-map, [data-framer-name="Location"]');
    const chip = document.querySelector('.casa-map-chip.active-venue-chip, .grand-pill, [data-framer-name="Venue Pin"]');
    const pulse = document.querySelector('.casa-map-pulse, [data-framer-name="Pulse"]');
    const stickyCta = document.querySelector('[data-framer-name="Sticky Button"], .framer-1n8t7q3');
    const chipRect = chip ? chip.getBoundingClientRect() : null;
    const pulseRect = pulse ? pulse.getBoundingClientRect() : null;
    const ctaRect = stickyCta ? stickyCta.getBoundingClientRect() : null;
    return {
      chipRect,
      pulseRect,
      ctaRect,
      chipLabel: chip ? chip.textContent.trim() : null
    };
  });
  console.log('Map Pin info:', JSON.stringify(mapPinInfo, null, 2));

  console.log('\n--- 4. GALLERY & CAPTIONS/NUMBERING ---');
  const galleryInfo = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('[data-framer-name="Gallery Slide"], .framer-1rjv5m9 img, .framer-1rjv5m9 picture, [data-framer-name*="Slide"]'));
    const captions = Array.from(document.querySelectorAll('.framer-10h7a2v, [data-framer-name="Gallery Counter"], [data-framer-name="Slide Title"]')).map(el => el.textContent.trim());
    const imgs = Array.from(document.querySelectorAll('.framer-1rjv5m9 img')).map(img => img.src);
    return {
      slideCount: slides.length,
      imgCount: imgs.length,
      sampleImgs: imgs.slice(0, 3),
      sampleCaptions: captions.slice(0, 10)
    };
  });
  console.log('Gallery info:', JSON.stringify(galleryInfo, null, 2));

  console.log('\n--- 5. OTHER VENUES SECTION ---');
  const otherVenuesInfo = await page.evaluate(() => {
    const otherSection = document.querySelector('[data-framer-name="Apartment Lists"], .framer-2iif9c, [data-framer-name="Other Venues"]');
    const cards = otherSection ? Array.from(otherSection.querySelectorAll('a, [data-framer-name*="Venue"]')) : [];
    const imgs = otherSection ? Array.from(otherSection.querySelectorAll('img, svg')).map(el => ({
      tagName: el.tagName,
      src: el.src || el.getAttribute('href') || (el.innerHTML.length > 50 ? 'svg content' : el.innerHTML)
    })) : [];
    const links = otherSection ? Array.from(otherSection.querySelectorAll('a')).map(a => a.href) : [];
    return {
      exists: !!otherSection,
      cardsCount: cards.length,
      imgs,
      links
    };
  });
  console.log('Other Venues info:', JSON.stringify(otherVenuesInfo, null, 2));

  await browser.close();
})();
