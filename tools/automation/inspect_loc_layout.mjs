import { chromium } from 'file:///C:/Users/Sambhav/.gemini/antigravity/scratch/sotd-engine/node_modules/playwright-core/index.mjs';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3003/venues/open-earth-lawn', { waitUntil: 'networkidle' });

  const layout = await page.evaluate(() => {
    const logo = document.querySelector('header a, header [data-framer-name="Logo"], header .framer-1ngqbpf');
    const locH = document.querySelector('#bigtext-1 h2');
    const locSec = document.getElementById('bigtext-1');

    const logoR = logo ? logo.getBoundingClientRect() : null;
    const locR = locH ? locH.getBoundingClientRect() : null;
    const secR = locSec ? locSec.getBoundingClientRect() : null;

    return {
      logo: {
        text: logo ? logo.innerText : null,
        top: logoR ? logoR.top : null,
        left: logoR ? logoR.left : null,
        height: logoR ? logoR.height : null
      },
      locHeading: {
        top: locR ? locR.top : null,
        left: locR ? locR.left : null,
        height: locR ? locR.height : null
      },
      locSection: {
        top: secR ? secR.top : null,
        paddingTop: locSec ? window.getComputedStyle(locSec).paddingTop : null
      }
    };
  });

  console.log(JSON.stringify(layout, null, 2));
  await browser.close();
})();
