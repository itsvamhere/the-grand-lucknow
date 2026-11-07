import fs from 'fs';

const subHtml = fs.readFileSync('venues/open-earth-lawn.html', 'utf8');

// Search for `>6<` or `> 6 <` or similar in subHtml
const sixMatches = [...subHtml.matchAll(/>\s*6\s*</g)];
console.log('Count of ">6<":', sixMatches.length);
sixMatches.forEach((m, i) => {
  const idx = m.index;
  console.log(`[>6< match ${i}] at ${idx}:\n`, subHtml.slice(Math.max(0, idx - 150), idx + 150));
});
