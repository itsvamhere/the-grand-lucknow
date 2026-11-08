import { chromium } from 'playwright-core';

async function inspectColumns() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const colInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return 'No footer';
    // Find containers for Menu, Socials, Contact
    const menuTitles = Array.from(footer.querySelectorAll('[data-framer-name="Menu Title"]'));
    return menuTitles.map(t => {
      const parent = t.parentElement;
      return {
        text: t.innerText,
        parentClass: parent?.className,
        parentWidth: parent?.clientWidth,
        parentRect: parent?.getBoundingClientRect(),
        grandParentClass: parent?.parentElement?.className,
        grandParentDisplay: parent?.parentElement ? window.getComputedStyle(parent.parentElement).display : null,
        grandParentFlexWrap: parent?.parentElement ? window.getComputedStyle(parent.parentElement).flexWrap : null
      };
    });
  });

  console.log('Mobile column layout info:', JSON.stringify(colInfo, null, 2));
  await browser.close();
}

inspectColumns().catch(console.error);
