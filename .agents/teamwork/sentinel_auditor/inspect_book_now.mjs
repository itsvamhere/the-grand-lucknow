import fs from 'fs';

const indexHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\index.html', 'utf8');
const lawnHtml = fs.readFileSync('C:\\Users\\Sambhav\\.gemini\\antigravity\\scratch\\replications\\casamomo\\venues\\open-earth-lawn.html', 'utf8');

function findBookNow(html, label) {
  console.log(`\n=== Book Now Button in ${label} ===`);
  const matches = html.match(/<a[^>]*data-framer-name="(?:White|Large|Large Dark)"[^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log(`Matches: ${matches.length}`);
  matches.forEach((m, idx) => {
    console.log(`Match ${idx}:\n${m.substring(0, 400)}...\n`);
  });
}

findBookNow(indexHtml, 'index.html');
findBookNow(lawnHtml, 'venues/open-earth-lawn.html');
