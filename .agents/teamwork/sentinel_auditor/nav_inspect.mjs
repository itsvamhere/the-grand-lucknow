import fs from 'fs';

const indexHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\index.html', 'utf8');
const lawnHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\venues\\open-earth-lawn.html', 'utf8');

function inspectNav(html, label) {
  console.log(`=== ${label} ===`);
  // Find navigation links
  const navLinkMatches = html.match(/<a[^>]*data-framer-name="Nav Link"[^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log(`Nav Link count: ${navLinkMatches.length}`);
  navLinkMatches.forEach((m, i) => {
    const text = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const href = (m.match(/href="([^"]*)"/) || [])[1];
    console.log(`  [${i}] "${text}" -> ${href}`);
  });

  // Find Sticky Button / Book Now
  const btnMatches = html.match(/data-framer-name="Sticky Button"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
  console.log(`Sticky Button matches: ${btnMatches.length}`);
  if (btnMatches.length > 0) {
    console.log(`  Sample button text: ${btnMatches[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()}`);
  }
}

inspectNav(indexHtml, 'index.html');
inspectNav(lawnHtml, 'venues/open-earth-lawn.html');
