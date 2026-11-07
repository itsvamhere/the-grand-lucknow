import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';
import sharp from 'sharp';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3003/venues/open-earth-lawn...');
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  // Scroll to location section
  const locationSection = page.locator('.framer-tfszgi[data-framer-name="Location"]');
  await locationSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  // Take screenshot of the map section
  const mapPath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_beating_map_desktop.png';
  await locationSection.screenshot({ path: mapPath });
  console.log('Saved proof_live_beating_map_desktop.png');

  // Verify the live pointer element exists and check styles
  const pointerInfo = await page.evaluate(() => {
    const p = document.getElementById('grand-live-pointer');
    if (!p) return null;
    const pulse = p.querySelector('.casa-map-pulse');
    const chip = p.querySelector('.casa-map-chip');
    return {
      pointerRect: p.getBoundingClientRect(),
      pulseAnimation: pulse ? window.getComputedStyle(pulse).animation : null,
      chipText: chip ? chip.textContent.trim() : null,
      chipBg: chip ? window.getComputedStyle(chip).backgroundColor : null,
      chipColor: chip ? window.getComputedStyle(chip).color : null
    };
  });
  console.log('Live Pointer Info:', JSON.stringify(pointerInfo, null, 2));

  // Take a burst of 4 frames of the pointer over 2 seconds to prove pulse animation
  console.log('Capturing pulse animation frames...');
  for (let i = 0; i < 4; i++) {
    const framePath = `C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_pulse_frame_${i}.png`;
    const pointerElement = page.locator('#grand-live-pointer');
    // screenshot around pointer
    await page.screenshot({
      path: framePath,
      clip: {
        x: pointerInfo.pointerRect.x - 120,
        y: pointerInfo.pointerRect.y - 100,
        width: 240,
        height: 180
      }
    });
    console.log(`Saved frame ${i} to ${framePath}`);
    await page.waitForTimeout(650);
  }

  // Also verify on mobile viewport (390x844)
  console.log('Testing mobile viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const mobileLocation = mobilePage.locator('.framer-tfszgi[data-framer-name="Location"]');
  await mobileLocation.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(800);

  const mobilePath = 'C:/Users/Sambhav/.gemini/antigravity/brain/24686084-37ef-41cd-b8d3-ed0023ab71ec/proof_live_beating_map_mobile.png';
  await mobileLocation.screenshot({ path: mobilePath });
  console.log('Saved proof_live_beating_map_mobile.png');

  await browser.close();
  console.log('Verification completed successfully!');
}

verify().catch(console.error);
