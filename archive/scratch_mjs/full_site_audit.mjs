import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function audit() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop audit
  const pageDesk = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesk.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await pageDesk.waitForTimeout(1000);

  const deskAudit = await pageDesk.evaluate(() => {
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    const hasHorizontalOverflow = bodyWidth > windowWidth;

    // Check forbidden words in visible DOM text
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const forbidden = [/casa\s*momo/i, /\bgraz\b/i, /\baustria\b/i, /\bapartment\b/i, /\bboutique n°/i];
    const violations = [];
    let n;
    while (n = walker.nextNode()) {
      const val = (n.nodeValue || '').trim();
      if (!val) continue;
      for (const rx of forbidden) {
        if (rx.test(val)) {
          violations.push({ match: rx.toString(), text: val, tag: n.parentElement?.tagName });
        }
      }
    }

    return {
      windowWidth,
      bodyWidth,
      hasHorizontalOverflow,
      violations
    };
  });

  // Capture desktop sections
  await pageDesk.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_desktop_hero.png' });
  await pageDesk.evaluate(() => window.scrollTo(0, 1500));
  await pageDesk.waitForTimeout(500);
  await pageDesk.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_desktop_cards.png' });
  await pageDesk.evaluate(() => window.scrollTo(0, 4000));
  await pageDesk.waitForTimeout(500);
  await pageDesk.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_desktop_about.png' });
  await pageDesk.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageDesk.waitForTimeout(500);
  await pageDesk.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_desktop_footer.png' });
  await pageDesk.close();

  // 2. Mobile audit
  const pageMob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await pageMob.goto('http://localhost:3003', { waitUntil: 'networkidle' });
  await pageMob.waitForTimeout(1000);

  const mobAudit = await pageMob.evaluate(() => {
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    const hasHorizontalOverflow = bodyWidth > windowWidth;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const forbidden = [/casa\s*momo/i, /\bgraz\b/i, /\baustria\b/i, /\bapartment\b/i, /\bboutique n°/i];
    const violations = [];
    let n;
    while (n = walker.nextNode()) {
      const val = (n.nodeValue || '').trim();
      if (!val) continue;
      for (const rx of forbidden) {
        if (rx.test(val)) {
          violations.push({ match: rx.toString(), text: val, tag: n.parentElement?.tagName });
        }
      }
    }

    return {
      windowWidth,
      bodyWidth,
      hasHorizontalOverflow,
      violations
    };
  });

  // Capture mobile sections
  await pageMob.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_mobile_hero.png' });
  await pageMob.evaluate(() => window.scrollTo(0, 1200));
  await pageMob.waitForTimeout(500);
  await pageMob.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_mobile_cards.png' });
  await pageMob.evaluate(() => window.scrollTo(0, 3500));
  await pageMob.waitForTimeout(500);
  await pageMob.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_mobile_about.png' });
  await pageMob.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pageMob.waitForTimeout(500);
  await pageMob.screenshot({ path: 'C:/Users/Sambhav/.gemini/antigravity/brain/a03a5fbd-9e24-40b4-ba3b-20d5bfbcca4a/audit_mobile_footer.png' });
  await pageMob.close();

  await browser.close();

  console.log('Desktop Audit:', JSON.stringify(deskAudit, null, 2));
  console.log('Mobile Audit:', JSON.stringify(mobAudit, null, 2));
}

audit().catch(console.error);
