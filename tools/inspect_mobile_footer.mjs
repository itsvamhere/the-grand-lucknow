import { chromium } from 'playwright-core';

async function inspectMobileFooterCss() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const data = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return 'No footer';
    const desktopVariant = footer.querySelector('[data-framer-name="Desktop"]');
    const mobileVariant = footer.querySelector('[data-framer-name="Mobile"]');
    return {
      desktopDisplay: desktopVariant ? window.getComputedStyle(desktopVariant).display : null,
      desktopVisibility: desktopVariant ? window.getComputedStyle(desktopVariant).visibility : null,
      mobileDisplay: mobileVariant ? window.getComputedStyle(mobileVariant).display : null,
      mobileVisibility: mobileVariant ? window.getComputedStyle(mobileVariant).visibility : null,
      footerChildren: Array.from(footer.children).map(c => ({
        tag: c.tagName,
        className: c.className,
        display: window.getComputedStyle(c).display
      }))
    };
  });

  console.log('Mobile footer variants:', JSON.stringify(data, null, 2));
  await browser.close();
}

inspectMobileFooterCss().catch(console.error);
