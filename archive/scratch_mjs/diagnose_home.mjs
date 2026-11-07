import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

async function diagnoseHome() {
  console.log('Diagnosing http://localhost:3003 ...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE UNCAUGHT ERROR:', err.message, err.stack));
  page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure()?.errorText));
  page.on('response', res => {
    if (res.status() >= 400) {
      console.log('HTTP ERROR:', res.status(), res.url());
    }
  });

  try {
    const resp = await page.goto('http://localhost:3003', { waitUntil: 'load', timeout: 15000 });
    console.log('Response status:', resp?.status());
    await page.waitForTimeout(3000);

    const bodyHtml = await page.evaluate(() => document.body.innerHTML);
    console.log('Body length:', bodyHtml.length);
    console.log('Body innerText:', JSON.stringify(await page.evaluate(() => document.body.innerText)));
  } catch (e) {
    console.error('Goto failed:', e.message);
  }

  await browser.close();
}

diagnoseHome();
