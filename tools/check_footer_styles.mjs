import { chromium } from 'playwright-core';

async function checkFooterStyles() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const styles = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const navWrapper = document.querySelector('[data-framer-name="Navbar Wrapper"]');
    
    return {
      footerPadding: footer ? window.getComputedStyle(footer).padding : null,
      footerMargin: footer ? window.getComputedStyle(footer).margin : null,
      footerBg: footer ? window.getComputedStyle(footer).backgroundColor : null,
      navPosition: header ? window.getComputedStyle(header).position : null,
      navWrapperPosition: navWrapper ? window.getComputedStyle(navWrapper).position : null,
      navZIndex: header ? window.getComputedStyle(header).zIndex : null
    };
  });

  console.log('Home Page Computed Styles:', JSON.stringify(styles, null, 2));
  await browser.close();
}

checkFooterStyles().catch(console.error);
