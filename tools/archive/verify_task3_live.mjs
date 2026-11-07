import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import path from 'path';

const artifactsDir = "C:/Users/Sambhav/.gemini/antigravity/brain/81fd3d23-7362-4464-8394-78506142dbd3";

async function main() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navigating to http://localhost:3003/ ...');
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Scroll to section locations-1
  const locEl = await page.$('#locations-1');
  if (!locEl) {
    throw new Error('Section #locations-1 not found!');
  }
  await locEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(3000);

  // Inspect DOM and computed values
  const verification = await page.evaluate(() => {
    const sec = document.getElementById('locations-1');
    const h2 = sec ? sec.querySelector('h2') : null;
    const p = sec ? sec.querySelector('p') : null;
    const link = sec ? sec.querySelector('a[href*="maps"]') : null;
    const map = document.getElementById('grand-vector-map');
    const mapLoaded = window.__grandMapLoaded || (window.__theGrandMap && window.__theGrandMap.loaded());
    const grandPin = document.querySelector('.grand-pin-container');
    const landmarkPills = Array.from(document.querySelectorAll('.landmark-pill')).map(el => el.textContent.trim());
    
    // Check for Gomti Nagar
    const hasGomtiNagar = (sec ? sec.textContent : '').includes('Gomti Nagar') ||
                          document.documentElement.innerHTML.includes('Gomti Nagar');

    return {
      headingText: h2 ? h2.textContent.trim() : null,
      addressText: p ? p.textContent.trim() : null,
      linkHref: link ? link.getAttribute('href') : null,
      linkText: link ? link.textContent.trim() : null,
      hasMapContainer: !!map,
      mapLoaded: !!mapLoaded,
      hasGrandPin: !!grandPin,
      grandPinText: grandPin ? grandPin.textContent.trim() : null,
      landmarkPills,
      hasGomtiNagar
    };
  });

  console.log('Verification data:', JSON.stringify(verification, null, 2));

  // Take screenshot of desktop locations-1 section
  const box = await locEl.boundingBox();
  if (box) {
    await page.screenshot({
      path: path.join(artifactsDir, "task3_verified_desktop_section.png"),
      clip: {
        x: 0,
        y: Math.max(0, box.y - 40),
        width: 1440,
        height: Math.min(1800, box.height + 80)
      }
    });
    console.log('Saved task3_verified_desktop_section.png');
  }

  // Zoomed screenshot of the vector map
  const mapContainer = await page.$('#grand-vector-map-container');
  if (mapContainer) {
    await mapContainer.screenshot({
      path: path.join(artifactsDir, "task3_custom_vector_map.png")
    });
    console.log('Saved task3_custom_vector_map.png');
  }

  // Mobile viewport verification
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);

  const mobileLoc = await mobilePage.$('#locations-1');
  if (mobileLoc) {
    await mobileLoc.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(3000);
    const mbox = await mobileLoc.boundingBox();
    if (mbox) {
      await mobilePage.screenshot({
        path: path.join(artifactsDir, "task3_verified_mobile_section.png"),
        clip: {
          x: 0,
          y: Math.max(0, mbox.y - 20),
          width: 390,
          height: Math.min(2200, mbox.height + 40)
        }
      });
      console.log('Saved task3_verified_mobile_section.png');
    }
  }

  await browser.close();
  console.log('Task 3 Live Verification complete!');
}

main().catch(console.error);
