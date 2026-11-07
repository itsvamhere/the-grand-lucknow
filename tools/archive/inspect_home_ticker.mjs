import fs from 'fs';

const homeHtml = fs.readFileSync('index.html', 'utf8');

// Search for footer marquee / ticker in index.html
const homeFooter = homeHtml.match(/<footer[\s\S]*?<\/footer>/i)[0];
console.log('=== HOME FOOTER TICKER / MARQUEE SNIPPET ===');
const tickerIdx = homeFooter.indexOf('ticker');
if (tickerIdx !== -1) {
  console.log(homeFooter.slice(tickerIdx - 200, tickerIdx + 600));
} else {
  console.log('No "ticker" in homeFooter string directly, let us search for "GRAND" in footer');
  const grandIdx = homeFooter.indexOf('THE GRAND');
  console.log(homeFooter.slice(grandIdx - 200, grandIdx + 400));
}

// Let's also search scripts for footer marquee animation
const scripts = [...homeHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
  if (s[1].includes('footer') || s[1].includes('marquee') || s[1].includes('ticker') || s[1].includes('framer-18na9ah')) {
    console.log(`Script ${idx} has footer logic! Length: ${s[1].length}`);
    console.log(s[1].slice(0, 400));
  }
});
