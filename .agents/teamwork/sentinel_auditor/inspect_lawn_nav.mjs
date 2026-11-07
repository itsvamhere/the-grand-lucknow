import fs from 'fs';

const lawnHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\venues\\open-earth-lawn.html', 'utf8');

const navHeaderMatches = lawnHtml.match(/<header[\s\S]*?<\/header>/gi) || [];
console.log(`Header count in lawn: ${navHeaderMatches.length}`);

navHeaderMatches.forEach((headerHtml, hIdx) => {
  console.log(`\n--- Header #${hIdx} ---`);
  const links = headerHtml.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
  links.forEach((l, lIdx) => {
    const href = (l.match(/href="([^"]*)"/) || [])[1];
    const framerName = (l.match(/data-framer-name="([^"]*)"/) || [])[1];
    const text = l.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`  Link #${lIdx}: [${framerName}] "${text}" -> ${href}`);
  });
});
